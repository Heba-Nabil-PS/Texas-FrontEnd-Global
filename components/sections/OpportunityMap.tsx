"use client";

/**
 * OpportunityMap — the interactive territory map on /franchising → Opportunities.
 *
 * It answers one question: "is my country still open?" Every country we do NOT
 * yet trade in is lit up as an available territory; the markets already running
 * are dimmed out, and the United States is its own case — US franchising is run
 * by Church's Texas Chicken®, so that shape links out to their franchise site.
 *
 * Notes worth keeping:
 *  - shapes come from lib/worldPaths (pre-generated, so there is no fetch and
 *    the map paints on first render) and lib/territories (names + continents)
 *  - picking a continent animates a plain <g> transform rather than the viewBox,
 *    which keeps the whole zoom on the compositor
 *  - the search box is an ARIA combobox and is the accessible way in: the SVG is
 *    aria-hidden on purpose, since 149 tabbable paths would wreck keyboard
 *    navigation. Typing dims every country that doesn't match, so the map and
 *    the dropdown always agree.
 */

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { worldPaths } from "@/lib/worldPaths";
import { continents, territories, type ContinentId, type Territory } from "@/lib/territories";
import { franchisePage, marketPage, type Market } from "@/lib/content";
import { ease } from "@/lib/motion";

/** matches the user space lib/worldPaths was generated in */
const VB = { x: 0, y: 33, w: 2000, h: 800 };
const US = "USA";
const MAX_ZOOM = 3;
const MAX_SUGGESTIONS = 8;

const FILL = {
  /** Antarctica, ice caps, disputed areas — drawn, never offered */
  scenery: "#37332e",
  /** a market that is already trading */
  served: "#615a51",
  /** available territory */
  open: "#f5b51e",
  /** available, but filtered out by the continent chips or the search */
  openMuted: "#7a6531",
  /** United States — Church's Texas Chicken territory */
  us: "#B12028",
  usHot: "#d94b4b",
  hot: "#fffdf7",
};

type Filter = ContinentId | "all";

export default function OpportunityMap() {
  const { opportunities } = franchisePage;
  const copy = opportunities.map;

  const [filter, setFilter] = useState<Filter>("all");
  const [picked, setPicked] = useState<string | null>(null);
  const [hover, setHover] = useState<string | null>(null);
  const [tip, setTip] = useState<{ x: number; y: number } | null>(null);

  /* ---- search ---- */
  const [query, setQuery] = useState("");
  const [openList, setOpenList] = useState(false);
  const [cursor, setCursor] = useState(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listId = "territory-suggestions";

  /* ---- who already has a store ---- */
  const served = useMemo(() => {
    const m = new Map<string, Market>();
    for (const k of marketPage.markets) if (k.iso3) m.set(k.iso3, k);
    return m;
  }, []);

  const byIso3 = useMemo(() => new Map(territories.map((t) => [t.iso3, t])), []);
  /** every country without a store — the whole point of this map */
  const open = useMemo(() => territories.filter((t) => !served.has(t.iso3)), [served]);

  const q = query.trim().toLowerCase();

  /** iso3s matching the query — null when the search is empty */
  const matches = useMemo(() => {
    if (!q) return null;
    return new Set(territories.filter((t) => t.name.toLowerCase().includes(q)).map((t) => t.iso3));
  }, [q]);

  /**
   * Ranked suggestions: open territories before markets we already run, then
   * prefix matches before mid-word ones, then alphabetical.
   */
  const suggestions = useMemo(() => {
    if (!q) return [] as Territory[];
    return territories
      .filter((t) => t.name.toLowerCase().includes(q))
      .map((t) => ({
        t,
        taken: served.has(t.iso3) && t.iso3 !== US ? 1 : 0,
        starts: t.name.toLowerCase().startsWith(q) ? 0 : 1,
      }))
      .sort((a, b) => a.taken - b.taken || a.starts - b.starts || a.t.name.localeCompare(b.t.name))
      .slice(0, MAX_SUGGESTIONS)
      .map((s) => s.t);
  }, [q, served]);

  useEffect(() => setCursor(0), [q]);

  /** close the dropdown when focus or a click lands outside the combobox */
  useEffect(() => {
    if (!openList) return;
    const away = (e: PointerEvent) => {
      if (!boxRef.current?.contains(e.target as Node)) setOpenList(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [openList]);

  const inFilter = (iso3: string) => filter === "all" || byIso3.get(iso3)?.continent === filter;

  /** open territories inside the current continent — drives the running count */
  const scoped = useMemo(
    () => (filter === "all" ? open : open.filter((t) => t.continent === filter)),
    [open, filter],
  );

  const countIn = (f: Filter) =>
    f === "all" ? open.length : open.filter((t) => t.continent === f).length;

  /* ---- zoom: fit the chosen continent inside the viewBox ---- */
  const view = useMemo(() => {
    const c = continents.find((x) => x.id === filter);
    if (!c) return { s: 1, tx: 0, ty: 0 };
    const [bx, by, bw, bh] = c.box;
    // The Americas span almost the full height of the map, so their natural fit
    // is under 1 — floor it, a "zoom" that shrinks the world reads as a bug.
    const s = Math.max(1, Math.min(MAX_ZOOM, Math.min(VB.w / bw, VB.h / bh) * 0.92));
    return {
      s,
      tx: VB.x + VB.w / 2 - s * (bx + bw / 2),
      ty: VB.y + VB.h / 2 - s * (by + bh / 2),
    };
  }, [filter]);

  /* ---- what a shape should look like ---- */
  const fillFor = (iso3: string) => {
    const t = byIso3.get(iso3);
    if (!t) return FILL.scenery;
    const lit = hover === iso3 || picked === iso3;
    if (iso3 === US) return lit ? FILL.usHot : FILL.us;
    if (served.has(iso3)) return FILL.served;
    if (lit) return FILL.hot;
    // dim anything the continent chips or the search have ruled out
    return inFilter(iso3) && (!matches || matches.has(iso3)) ? FILL.open : FILL.openMuted;
  };

  /** only open territories and the US respond to the pointer */
  const interactive = (iso3: string) => byIso3.has(iso3) && (!served.has(iso3) || iso3 === US);

  const pickedT = picked ? byIso3.get(picked) : null;
  const pickedMarket = picked ? served.get(picked) : null;
  const hoverName = hover ? (byIso3.get(hover)?.name ?? null) : null;

  const choose = (iso3: string) => {
    setPicked((p) => (p === iso3 ? null : iso3));
    // keep the map looking at whatever was just picked
    const c = byIso3.get(iso3)?.continent;
    if (c && filter !== "all" && filter !== c) setFilter(c);
  };

  /** picking from the dropdown zooms the map to that country's continent */
  const commit = (t: Territory) => {
    setPicked(t.iso3);
    setFilter(t.continent);
    setQuery(t.name);
    setOpenList(false);
    inputRef.current?.blur();
  };

  const onSearchKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpenList(false);
      return;
    }
    if (!suggestions.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpenList(true);
      setCursor((i) => (i + 1) % suggestions.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setOpenList(true);
      setCursor((i) => (i - 1 + suggestions.length) % suggestions.length);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      commit(suggestions[Math.min(cursor, suggestions.length - 1)]);
    }
  };

  const chips: { id: Filter; short: string }[] = [
    { id: "all", short: copy.allLabel },
    ...continents.map((c) => ({ id: c.id as Filter, short: c.short })),
  ];

  const showList = openList && !!q;

  return (
    <div className="mt-12">
      <h4 className="display text-xl uppercase text-ink">
        {scoped.length} {scoped.length === 1 ? copy.oneOpen : copy.manyOpen}
      </h4>

      {/* ---- continent filters + search, one row ---- */}
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-3">
        <div className="flex flex-wrap items-center gap-2">
          {chips.map((c) => {
            const on = filter === c.id;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setFilter(c.id)}
                data-cursor="link"
                aria-pressed={on}
                className={`rounded-full px-4 py-2 text-xs font-extrabold uppercase tracking-caps transition-colors duration-200 ${
                  on
                    ? "bg-ink text-cream"
                    : "border border-ink/15 bg-paper text-ink-600 hover:border-ink/35 hover:text-ink"
                }`}
              >
                {c.short}
                <span className={`ms-2 font-bold ${on ? "text-tex-yellow" : "text-ink-400"}`}>
                  {countIn(c.id)}
                </span>
              </button>
            );
          })}
        </div>

        <div ref={boxRef} className="relative z-30 w-full lg:ms-auto lg:w-72">
          <label className="sr-only" htmlFor="territory-search">
            {copy.searchPlaceholder}
          </label>
          <input
            id="territory-search"
            ref={inputRef}
            type="text"
            role="combobox"
            aria-expanded={showList}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              showList && suggestions.length ? `${listId}-${cursor}` : undefined
            }
            autoComplete="off"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpenList(true);
            }}
            onFocus={() => setOpenList(true)}
            onKeyDown={onSearchKey}
            placeholder={copy.searchPlaceholder}
            /* py matches the filter chips either side of it, so the row lines up */
            className="w-full rounded-full border border-ink/15 bg-paper px-5 py-2 pe-11 text-xs font-bold uppercase tracking-caps text-ink placeholder:font-semibold placeholder:normal-case placeholder:tracking-normal placeholder:text-ink-400 focus:border-tex-red focus:outline-none"
          />

          {query ? (
            <button
              type="button"
              aria-label={copy.clear}
              data-cursor="link"
              onClick={() => {
                setQuery("");
                setOpenList(false);
                inputRef.current?.focus();
              }}
              className="absolute end-4 top-1/2 -translate-y-1/2 text-lg leading-none text-ink-400 transition-colors hover:text-tex-red"
            >
              ×
            </button>
          ) : (
            <span
              aria-hidden
              className="absolute end-4 top-1/2 -translate-y-1/2 text-sm text-ink-400"
            >
              ⌕
            </span>
          )}

          {/* ---- smart dropdown ---- */}
          <AnimatePresence>
            {showList && (
              <motion.ul
                id={listId}
                role="listbox"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.16, ease: ease.out }}
                className="absolute inset-x-0 top-full z-30 mt-2 max-h-72 overflow-y-auto rounded-2xl border border-ink/10 bg-paper p-1.5 shadow-soft3"
              >
                {suggestions.length ? (
                  suggestions.map((t, i) => {
                    const taken = served.has(t.iso3) && t.iso3 !== US;
                    const on = i === cursor;
                    return (
                      <li key={t.iso3} id={`${listId}-${i}`} role="option" aria-selected={on}>
                        <button
                          type="button"
                          data-cursor="link"
                          onPointerEnter={() => {
                            setCursor(i);
                            setHover(t.iso3);
                          }}
                          onPointerLeave={() => setHover(null)}
                          onClick={() => commit(t)}
                          className={`flex w-full items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-left transition-colors ${
                            on ? "bg-cream-200" : "bg-transparent"
                          }`}
                        >
                          <span className="text-sm font-bold uppercase tracking-caps text-ink">
                            <Highlight name={t.name} q={q} />
                          </span>
                          <span
                            className={`shrink-0 text-[0.6rem] font-extrabold uppercase tracking-caps ${
                              t.iso3 === US
                                ? "text-tex-red"
                                : taken
                                  ? "text-ink-400"
                                  : "text-tex-yellow600"
                            }`}
                          >
                            {t.iso3 === US ? copy.usTag : taken ? copy.servedLabel : copy.openLabel}
                          </span>
                        </button>
                      </li>
                    );
                  })
                ) : (
                  <li className="px-3.5 py-3 text-sm leading-relaxed text-ink-600">{copy.empty}</li>
                )}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ---- the map ---- */}
      <div
        className="relative mt-6 overflow-hidden rounded-[1.75rem] border border-ink/10 bg-ink"
        onPointerLeave={() => {
          setHover(null);
          setTip(null);
        }}
        onPointerMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          setTip({ x: e.clientX - r.left, y: e.clientY - r.top });
          // One delegated read of whatever is under the pointer. Per-path
          // enter/leave handlers would blink through a null hover on the frame
          // between two adjacent countries — and add 179 listeners.
          setHover((e.target as SVGElement | HTMLElement).getAttribute?.("data-iso3") ?? null);
        }}
        onClick={(e) => {
          const iso3 = (e.target as SVGElement | HTMLElement).getAttribute?.("data-iso3");
          if (iso3) choose(iso3);
        }}
      >
        <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-tex-red/25 blur-[110px]" />
        <div className="pointer-events-none absolute -right-16 bottom-0 h-72 w-72 rounded-full bg-tex-yellow/15 blur-[110px]" />

        <svg
          viewBox={`${VB.x} ${VB.y} ${VB.w} ${VB.h}`}
          preserveAspectRatio="xMidYMid meet"
          aria-hidden
          focusable="false"
          className="relative block aspect-[2.5/1] min-h-[230px] w-full md:min-h-[380px]"
        >
          <g
            style={{
              transform: `translate(${view.tx}px, ${view.ty}px) scale(${view.s})`,
              transition: "transform 900ms cubic-bezier(0.65, 0, 0.35, 1)",
            }}
          >
            {Object.entries(worldPaths).map(([iso3, d]) => {
              const live = interactive(iso3);
              return (
                <path
                  key={iso3}
                  d={d}
                  /* only live shapes carry the id the delegated handler reads */
                  data-iso3={live ? iso3 : undefined}
                  fill={fillFor(iso3)}
                  stroke="#2d2a26"
                  strokeWidth={1.1 / view.s}
                  style={{
                    cursor: live ? "pointer" : "default",
                    pointerEvents: live ? "auto" : "none",
                    transition: "fill 220ms ease-out",
                  }}
                />
              );
            })}
          </g>
        </svg>

        {/* hover tooltip — follows the pointer, never intercepts it */}
        {hoverName && tip && (
          <span
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-full bg-cream px-3 py-1.5 text-[0.68rem] font-extrabold uppercase tracking-caps text-ink shadow-soft3"
            style={{ left: tip.x, top: tip.y - 10 }}
          >
            {hoverName}
          </span>
        )}

        {/* legend */}
        <div className="relative flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-cream/10 px-6 py-4">
          <Key color={FILL.open} label={copy.openLabel} />
          <Key color={FILL.us} label={copy.usLabel} />
          <Key color={FILL.served} label={copy.servedLabel} />
          <span className="ms-auto text-[0.68rem] font-semibold text-cream/45">{copy.hint}</span>
        </div>
      </div>

      {/* ---- selection card ---- */}
      <AnimatePresence mode="wait">
        {pickedT && (
          <motion.div
            key={pickedT.iso3}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.35, ease: ease.out }}
            className="mt-6 flex flex-col items-start gap-5 rounded-[1.75rem] border border-ink/10 bg-paper p-7 md:flex-row md:items-center md:justify-between"
          >
            <div>
              <span className="text-xs font-bold uppercase tracking-caps text-ink-400">
                {pickedT.iso3 === US ? copy.usLabel : pickedMarket ? copy.servedLabel : copy.openLabel}
              </span>
              <h4 className="display mt-1 text-2xl uppercase text-ink">{pickedT.name}</h4>
              <p className="mt-2 max-w-md text-sm leading-relaxed text-ink-600">
                {pickedT.iso3 === US
                  ? opportunities.usNote
                  : pickedMarket
                    ? copy.servedBody
                    : copy.openBody}
              </p>
            </div>

            {pickedT.iso3 === US ? (
              <Button
                href={opportunities.usUrl}
                target="_blank"
                rel="noopener noreferrer"
                variant="red"
                className="shrink-0"
              >
                {opportunities.usCta}
              </Button>
            ) : pickedMarket ? (
              <Button
                href={pickedMarket.url}
                target="_blank"
                rel="noopener noreferrer"
                variant="ghost"
                className="shrink-0"
              >
                {copy.visit}
              </Button>
            ) : (
              <Button href="#apply-form" variant="red" pulse className="shrink-0">
                {copy.enquire}
              </Button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/** Bolds the typed run inside a suggestion so the match is obvious. */
function Highlight({ name, q }: { name: string; q: string }) {
  const at = name.toLowerCase().indexOf(q);
  if (at < 0) return <>{name}</>;
  return (
    <>
      {name.slice(0, at)}
      <mark className="bg-transparent text-tex-red">{name.slice(at, at + q.length)}</mark>
      {name.slice(at + q.length)}
    </>
  );
}

function Key({ color, label }: { color: string; label: string }) {
  return (
    <span className="flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-caps text-cream/70">
      <span className="size-2.5 rounded-full" style={{ background: color }} />
      {label}
    </span>
  );
}
