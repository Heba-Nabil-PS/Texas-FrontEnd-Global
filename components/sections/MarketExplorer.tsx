"use client";

/**
 * MarketExplorer — the interactive market map for /find-your-market.
 *
 * Data mirrors the two live brand sites: texaschicken.com (Middle East,
 * Asia-Pacific, Europe) and churchstexaschicken.com (Americas). Filter by brand,
 * pick a region to zoom in, click a country to zoom closer and open its site.
 *
 * The map group is moved with a plain CSS transform (cheap, GPU-friendly); the
 * pins and labels live in an HTML layer that is kept glued to it with the same
 * transform plus a per-marker counter-scale, so text never stretches.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { marketPage, type BrandId, type Market, type MarketRegionId } from "@/lib/content";
import { ease } from "@/lib/motion";

const GEO_URL = "/geo/world-countries.geo.json";
const W = 1000;
const H = 500;
/** cropped world box (drops the empty poles) */
const VB = { x: 0, y: 22, w: 1000, h: 400 };
const EASE_CSS = "cubic-bezier(0.65, 0, 0.35, 1)";
const DUR = 900;

const projX = (lon: number) => ((lon + 180) / 360) * W;
const projY = (lat: number) => ((90 - lat) / 180) * H;

/* ----------------------------- geo → svg paths ---------------------------- */

type GeoFeature = {
  id: string;
  properties: { name: string };
  geometry:
    | { type: "Polygon"; coordinates: number[][][] }
    | { type: "MultiPolygon"; coordinates: number[][][][] };
};

type Shape = { key: string; id: string; d: string };

function ringPath(ring: number[][]) {
  let s = "";
  for (let i = 0; i < ring.length; i++) {
    s += (i ? "L" : "M") + projX(ring[i][0]).toFixed(1) + "," + projY(ring[i][1]).toFixed(1);
  }
  return s + "Z";
}

function geomPath(geom: GeoFeature["geometry"]) {
  if (geom.type === "Polygon") return geom.coordinates.map(ringPath).join("");
  return geom.coordinates.map((poly) => poly.map(ringPath).join("")).join("");
}

/* ------------------------------- zoom fitting ----------------------------- */

type Box = { x: number; y: number; w: number; h: number };
type View = { s: number; tx: number; ty: number };

/** Fit a set of markets inside the visible user-space box. */
function fitView(markets: Market[], box: Box, maxScale: number): View {
  if (!markets.length || box.w <= 0) return { s: 1, tx: 0, ty: 0 };
  const xs = markets.map((m) => projX(m.lon));
  const ys = markets.map((m) => projY(m.lat));
  let x0 = Math.min(...xs);
  let x1 = Math.max(...xs);
  let y0 = Math.min(...ys);
  let y1 = Math.max(...ys);
  const padX = Math.min(Math.max(34, (x1 - x0) * 0.28), 110);
  const padY = Math.min(Math.max(30, (y1 - y0) * 0.32), 80);
  x0 -= padX;
  x1 += padX;
  y0 -= padY;
  y1 += padY;
  const s = Math.min(box.w / (x1 - x0), box.h / (y1 - y0), maxScale);
  const cx = (x0 + x1) / 2;
  const cy = (y0 + y1) / 2;
  return { s, tx: box.x + box.w / 2 - s * cx, ty: box.y + box.h / 2 - s * cy };
}

/* --------------------------------- palette -------------------------------- */

const FILL = {
  base: "#ded8ca",
  baseStroke: "#faf6ef",
  quiet: "#f2e2c4", // a market that's filtered out
  texas: "#F4B118", // Texas Chicken gold
  churchs: "#B12028", // Church's Texas Chicken red
  focus: "#e15f02",
};

const brandFill = (m: Market) => (m.brand === "texas" ? FILL.texas : FILL.churchs);

/* -------------------------------------------------------------------------- */

export default function MarketExplorer({
  brand,
  onBrandChange,
  region,
  onRegionChange,
  focus,
  onFocus,
  onSeeAll,
}: {
  brand: BrandId | "all";
  onBrandChange: (b: BrandId | "all") => void;
  region: MarketRegionId | "all";
  onRegionChange: (r: MarketRegionId | "all") => void;
  focus: string | null;
  onFocus: (code: string | null) => void;
  onSeeAll?: () => void;
}) {
  const [shapes, setShapes] = useState<Shape[] | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: 0, h: 0 });

  const markets = marketPage.markets;
  const regions = marketPage.regions;
  const brands = marketPage.brands;
  const copy = marketPage.explorer;

  /* ---- look-ups ---- */
  const byIso3 = useMemo(() => {
    const m = new Map<string, Market>();
    for (const k of markets) if (k.iso3) m.set(k.iso3, k);
    return m;
  }, [markets]);

  const focused = useMemo(() => markets.find((m) => m.code === focus) ?? null, [markets, focus]);
  const activeRegion = regions.find((r) => r.id === region) ?? null;
  const activeBrand = brands.find((b) => b.id === brand) ?? null;

  const onBrand = (m: Market) => brand === "all" || m.brand === brand;
  const inRegion = (m: Market) => region === "all" || m.region === region;
  const isOn = (m: Market) => onBrand(m) && inRegion(m);

  const shown = useMemo(
    () => markets.filter((m) => isOn(m)),
    [markets, region, brand] // eslint-disable-line react-hooks/exhaustive-deps
  );

  /** regions that still have markets for the chosen brand */
  const liveRegions = useMemo(
    () => regions.filter((r) => markets.some((m) => m.region === r.id && onBrand(m))),
    [regions, markets, brand] // eslint-disable-line react-hooks/exhaustive-deps
  );

  /* ---- container measuring (keeps html markers glued to the svg) ---- */
  useEffect(() => {
    setReady(true);
    const el = boxRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const r = entry.contentRect;
      setSize({ w: r.width, h: r.height });
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  /* ---- map fitting maths (svg uses preserveAspectRatio="slice") ---- */
  const k = size.w ? Math.max(size.w / VB.w, size.h / VB.h) : 0;
  const ox = size.w ? (size.w - VB.w * k) / 2 : 0;
  const oy = size.w ? (size.h - VB.h * k) / 2 : 0;
  // the info card floats over the right of the map on large screens
  const reserve = size.w >= 1024 ? 416 : 0;
  const visible: Box = k
    ? { x: VB.x - ox / k, y: VB.y - oy / k, w: (size.w - reserve) / k, h: size.h / k }
    : VB;

  // a picked country zooms closer than a whole region
  const fitTargets = focused ? [focused] : shown;
  const view = useMemo(
    () => fitView(fitTargets, visible, focused ? 6.5 : 4.2),
    [fitTargets, focused, visible.x, visible.y, visible.w, visible.h] // eslint-disable-line react-hooks/exhaustive-deps
  );

  const TX = ox * (1 - view.s) + k * (view.tx + (view.s - 1) * VB.x);
  const TY = oy * (1 - view.s) + k * (view.ty + (view.s - 1) * VB.y);

  /* ---- geojson ---- */
  useEffect(() => {
    let alive = true;
    fetch(GEO_URL)
      .then((r) => r.json())
      .then((geo: { features: GeoFeature[] }) => {
        if (!alive) return;
        setShapes(geo.features.map((f, i) => ({ key: `${f.id}-${i}`, id: f.id, d: geomPath(f.geometry) })));
      })
      .catch(() => setShapes([]));
    return () => {
      alive = false;
    };
  }, []);

  /** labels only make sense once we're zoomed in */
  const zoomed = region !== "all" || !!focused;

  /**
   * Label collision pass. Clustered markets (the Gulf, the Caribbean) would
   * stack their labels at some zoom levels, so lay them out greedily by
   * priority — focused first, then hovered, then the rest — and drop any label
   * whose box overlaps one already placed or falls outside the map.
   */
  const labelled = useMemo(() => {
    const keep = new Set<string>();
    if (!k || !zoomed) return keep;
    const placed: { x0: number; y0: number; x1: number; y1: number }[] = [];
    const score = (m: Market) => (m.code === focus ? 0 : m.code === hover ? 1 : 2);
    const order = markets.filter((m) => isOn(m) || m.code === focus || m.code === hover).sort((a, b) => score(a) - score(b));
    for (const m of order) {
      const text = m.short ?? m.name;
      const w = text.length * 6.6 + 22;
      const h = 22;
      const cx = view.s * (ox + (projX(m.lon) - VB.x) * k) + TX + (m.dx ?? 0);
      const cy = view.s * (oy + (projY(m.lat) - VB.y) * k) + TY + (m.dy ?? 0) - 20;
      const box = { x0: cx - w / 2, y0: cy - h / 2, x1: cx + w / 2, y1: cy + h / 2 };
      if (box.x0 < 4 || box.y0 < 4 || box.x1 > size.w - 4 || box.y1 > size.h - 4) continue;
      if (placed.some((p) => box.x0 < p.x1 && box.x1 > p.x0 && box.y0 < p.y1 && box.y1 > p.y0)) continue;
      placed.push(box);
      keep.add(m.code);
    }
    return keep;
  }, [markets, region, brand, focus, hover, zoomed, k, ox, oy, view.s, TX, TY, size.w, size.h]); // eslint-disable-line react-hooks/exhaustive-deps

  const fillFor = (m: Market | undefined) => {
    if (!m) return FILL.base;
    if (focus === m.code || hover === m.code) return FILL.focus;
    if (isOn(m)) return brandFill(m);
    return FILL.quiet;
  };

  const pick = (m: Market) => {
    if (!onBrand(m)) onBrandChange("all");
    onRegionChange(m.region);
    onFocus(m.code);
  };

  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(90% 70% at 50% 0%, #fffdf7 0%, #faf6ef 45%, #f3ede1 100%)" }}
      />

      <div className="container-tx relative z-10">
        <SectionHeading
          align="center"
          eyebrow={copy.eyebrow}
          heading={copy.heading}
          body={copy.body}
          className="mx-auto"
        />

        {/* ------------------------------ brand filter ------------------------- */}
        <div className="mt-9 flex justify-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-ink/10 bg-paper p-1.5 shadow-sm">
            {[{ id: "all" as const, label: copy.allBrands }, ...brands.map((b) => ({ id: b.id, label: b.name }))].map(
              (b) => {
                const active = b.id === brand;
                return (
                  <button
                    key={b.id}
                    type="button"
                    data-cursor="link"
                    onClick={() => {
                      onBrandChange(b.id);
                      onFocus(null);
                      if (b.id !== "all") {
                        const stillLive = markets.some((m) => m.brand === b.id && m.region === region);
                        if (region !== "all" && !stillLive) onRegionChange("all");
                      }
                    }}
                    className={`relative rounded-full px-4 py-2.5 text-[11px] font-extrabold uppercase tracking-caps transition-colors duration-300 md:px-5 ${
                      active ? "text-cream" : "text-ink-600 hover:text-ink"
                    }`}
                  >
                    {active && (
                      <motion.span
                        layoutId="market-brand"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                        className="absolute inset-0 rounded-full"
                        style={{
                          background:
                            b.id === "churchs" ? FILL.churchs : b.id === "texas" ? "#2d2a26" : "#2d2a26",
                        }}
                      />
                    )}
                    <span className="relative z-10 flex items-center gap-2">
                      {b.id !== "all" && (
                        <span
                          className="size-2 rounded-full"
                          style={{ background: b.id === "texas" ? FILL.texas : active ? "#fffdf7" : FILL.churchs }}
                        />
                      )}
                      {b.label}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </div>

        {/* -------------------------------- regions ---------------------------- */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2 md:gap-3">
          {[{ id: "all" as const, label: copy.allLabel }, ...liveRegions.map((r) => ({ id: r.id, label: r.short }))].map(
            (t) => {
              const active = t.id === region;
              return (
                <button
                  key={t.id}
                  type="button"
                  data-cursor="link"
                  onClick={() => {
                    onRegionChange(t.id);
                    onFocus(null);
                  }}
                  className={`relative rounded-full px-5 py-3 text-[11px] font-extrabold uppercase tracking-caps transition-colors duration-300 md:text-xs ${
                    active
                      ? "text-cream"
                      : "border border-ink/12 bg-paper text-ink-600 hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="market-tab"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-primary shadow-[0_10px_24px_rgba(177,32,40,0.28)]"
                    />
                  )}
                  <span className="relative z-10">{t.label}</span>
                </button>
              );
            }
          )}
        </div>

        {/* ------------------------------- the map ----------------------------- */}
        <div className="relative mt-10 lg:mt-12">
          <div
            ref={boxRef}
            className="relative h-[340px] w-full overflow-hidden rounded-[28px] border border-ink/10 bg-[#f0ece3] shadow-soft3 sm:h-[420px] lg:h-[560px]"
          >
            {shapes && (
              <svg
                viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
                preserveAspectRatio="xMidYMid slice"
                className="absolute inset-0 h-full w-full"
                role="img"
                aria-label="World map of Texas Chicken and Church's Texas Chicken markets"
              >
                <g
                  style={{
                    transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.s})`,
                    transformOrigin: "0 0",
                    transition: `transform ${DUR}ms ${EASE_CSS}`,
                  }}
                >
                  {shapes.map((c) => {
                    const m = byIso3.get(c.id);
                    return (
                      <path
                        key={c.key}
                        d={c.d}
                        fill={fillFor(m)}
                        stroke={FILL.baseStroke}
                        strokeWidth={0.7}
                        vectorEffect="non-scaling-stroke"
                        className={m ? "cursor-pointer" : undefined}
                        style={{ transition: "fill 280ms ease-out" }}
                        onMouseEnter={m ? () => setHover(m.code) : undefined}
                        onMouseLeave={m ? () => setHover(null) : undefined}
                        onClick={m ? () => pick(m) : undefined}
                      />
                    );
                  })}
                </g>
              </svg>
            )}

            {/* ----------------- html overlay: markers + labels ----------------- */}
            {shapes && k > 0 && (
              <div
                className="pointer-events-none absolute inset-0"
                style={{
                  transform: `translate(${TX}px, ${TY}px) scale(${view.s})`,
                  transformOrigin: "0 0",
                  transition: `transform ${DUR}ms ${EASE_CSS}`,
                }}
              >
                {markets.map((m) => {
                  const left = ox + (projX(m.lon) - VB.x) * k;
                  const top = oy + (projY(m.lat) - VB.y) * k;
                  const on = isOn(m);
                  const lit = focus === m.code || hover === m.code;
                  const dot = !m.iso3; // no polygon on the map → the dot is the country
                  const showDot = dot || !zoomed || lit || !labelled.has(m.code);
                  const dotSize = lit ? 13 : dot ? 11 : 8;
                  return (
                    <div
                      key={m.code}
                      className="absolute left-0 top-0"
                      style={{
                        transform: `translate(${left}px, ${top}px) scale(${1 / view.s})`,
                        transformOrigin: "0 0",
                        transition: `transform ${DUR}ms ${EASE_CSS}`,
                      }}
                    >
                      <button
                        type="button"
                        aria-label={m.name}
                        onMouseEnter={() => setHover(m.code)}
                        onMouseLeave={() => setHover(null)}
                        onClick={() => pick(m)}
                        className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full p-2"
                      >
                        <span
                          className="block rounded-full transition-all duration-300"
                          style={{
                            width: showDot ? dotSize : 0,
                            height: showDot ? dotSize : 0,
                            background: lit
                              ? FILL.focus
                              : on
                                ? m.brand === "texas"
                                  ? "#B12028"
                                  : "#F4B118"
                                : "#c99a3f",
                            boxShadow: `0 0 0 2px #fffdf7, 0 2px 6px rgba(45,42,38,${on ? 0.3 : 0.16})`,
                          }}
                        />
                        {lit && (
                          <span
                            className="absolute left-1/2 top-1/2 -z-10 block -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full"
                            style={{ width: 22, height: 22, background: "rgba(225,95,2,0.35)" }}
                          />
                        )}
                      </button>

                      <span
                        className="absolute whitespace-nowrap rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-caps transition-[opacity,background,color] duration-300 md:text-[11px]"
                        style={{
                          transform: `translate(calc(-50% + ${m.dx ?? 0}px), calc(-50% + ${(m.dy ?? 0) - 20}px))`,
                          opacity: labelled.has(m.code) ? 1 : 0,
                          transitionDelay: labelled.has(m.code) ? `${DUR * 0.45}ms` : "0ms",
                          zIndex: lit ? 2 : 1,
                          background: lit ? FILL.focus : "rgba(255,253,247,0.92)",
                          color: lit ? "#fffdf7" : "#2d2a26",
                          boxShadow: "0 2px 8px rgba(45,42,38,0.16)",
                        }}
                      >
                        {m.short ?? m.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}

            {!shapes && (
              <div className="absolute inset-0 grid place-items-center text-xs uppercase tracking-caps text-ink-400">
                <span className="animate-shimmer">Loading map…</span>
              </div>
            )}

            <span className="pointer-events-none absolute left-5 top-5 hidden rounded-full bg-paper/85 px-3 py-1.5 text-[10px] font-bold uppercase tracking-caps text-ink-600 shadow-sm sm:block">
              {copy.hint}
            </span>

            {/* legend — one swatch per brand */}
            <div className="pointer-events-none absolute bottom-4 left-5 hidden flex-wrap items-center gap-x-4 gap-y-2 text-[10px] font-bold uppercase tracking-caps text-ink-600 sm:flex">
              {brands.map((b) => (
                <span key={b.id} className="flex items-center gap-2 rounded-full bg-paper/85 px-3 py-1.5 shadow-sm">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ background: b.id === "texas" ? FILL.texas : FILL.churchs }}
                  />
                  {b.name}
                </span>
              ))}
            </div>
          </div>

          {/* ------------------------------ side card ---------------------------- */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={ready ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: ease.out, delay: 0.2 }}
            className="relative z-20 mx-auto -mt-6 w-full max-w-md rounded-[24px] border border-ink/10 bg-paper p-6 shadow-pop md:p-7 lg:absolute lg:bottom-8 lg:right-8 lg:mt-0 lg:w-[24rem]"
          >
            <span
              className="absolute inset-x-6 top-0 h-1 rounded-full md:inset-x-7"
              style={{ background: focused ? brandFill(focused) : activeBrand?.id === "churchs" ? FILL.churchs : FILL.texas }}
            />

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={focused ? `c-${focused.code}` : `r-${region}-${brand}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.28, ease: ease.out }}
              >
                {focused ? (
                  <>
                    <span className="eyebrow text-[10px] text-ink-400">
                      <span className="size-2 rounded-full" style={{ background: brandFill(focused) }} />
                      {copy.selectedMarket}
                    </span>
                    <div className="mt-4 flex items-center gap-4">
                      <img
                        src={`/assets/flags/${focused.code}.svg`}
                        alt=""
                        className="shrink-0 rounded-full shadow-sm ring-1 ring-ink/10"
                        style={{ width: 52, height: 52 }}
                      />
                      <div className="min-w-0">
                        <h3 className="display truncate text-2xl leading-none text-ink">{focused.name}</h3>
                        <p className="mt-1.5 text-[11px] font-bold uppercase tracking-caps text-primary">
                          {brands.find((b) => b.id === focused.brand)?.name}
                        </p>
                      </div>
                    </div>
                    <p className="mt-4 text-sm leading-relaxed text-ink-600">
                      {regions.find((r) => r.id === focused.region)?.blurb}
                    </p>
                    <a
                      href={focused.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="link"
                      className="group mt-5 inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-[11px] font-extrabold uppercase tracking-caps text-cream transition-colors hover:bg-primary-700"
                    >
                      {copy.visit}
                      <span className="transition-transform duration-200 group-hover:translate-x-0.5" aria-hidden>
                        ↗
                      </span>
                    </a>
                  </>
                ) : (
                  <>
                    <span className="eyebrow text-[10px] text-ink-400">
                      <span className="size-2 rounded-full bg-secondary" /> {copy.selectedLabel}
                    </span>
                    <h3 className="display mt-4 text-3xl leading-none text-ink">
                      {activeRegion ? activeRegion.name : copy.allName}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-ink-600">
                      {activeRegion ? activeRegion.blurb : activeBrand ? activeBrand.blurb : copy.allBlurb}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {shown.map((m) => (
                        <button
                          key={m.code}
                          type="button"
                          title={m.name}
                          onClick={() => onFocus(m.code)}
                          onMouseEnter={() => setHover(m.code)}
                          onMouseLeave={() => setHover(null)}
                          className="transition-transform duration-200 hover:-translate-y-0.5"
                        >
                          <img
                            src={`/assets/flags/${m.code}.svg`}
                            alt={m.name}
                            className="rounded-full shadow-sm ring-1 ring-ink/10"
                            style={{ width: 26, height: 26 }}
                          />
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>

            <button
              type="button"
              onClick={onSeeAll}
              data-cursor="link"
              className="group mt-6 inline-flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-caps text-primary"
            >
              {copy.seeAll}
              <span className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden>
                ↓
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
