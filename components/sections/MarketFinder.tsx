"use client";

/**
 * MarketFinder — the "find your country" list under the map.
 *
 * Search + region filter + brand filter over the real market list from
 * texaschicken.com / churchstexaschicken.com. Each card links out to that
 * market's own site; the pin button lights the country up on the map above.
 */

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { marketPage, type BrandId, type MarketRegionId } from "@/lib/content";
import { ease, fadeUp, inView } from "@/lib/motion";

export default function MarketFinder({
  brand,
  onBrandChange,
  region,
  onRegionChange,
  focus,
  onFocus,
}: {
  brand: BrandId | "all";
  onBrandChange: (b: BrandId | "all") => void;
  region: MarketRegionId | "all";
  onRegionChange: (r: MarketRegionId | "all") => void;
  focus: string | null;
  onFocus: (code: string) => void;
}) {
  const [query, setQuery] = useState("");
  const copy = marketPage.finder;
  const regions = marketPage.regions;
  const brands = marketPage.brands;

  const regionName = (id: MarketRegionId) => regions.find((r) => r.id === id)?.short ?? "";
  const brandName = (id: BrandId) => brands.find((b) => b.id === id)?.short ?? "";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return marketPage.markets
      .filter(
        (m) =>
          (region === "all" || m.region === region) &&
          (brand === "all" || m.brand === brand) &&
          (!q || m.name.toLowerCase().includes(q) || (m.alias ?? "").toLowerCase().includes(q))
      )
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [query, region, brand]);

  const selectCls =
    "w-full cursor-pointer appearance-none rounded-full border border-ink/12 bg-cream px-5 py-3.5 pr-10 text-sm font-bold text-ink outline-none transition-colors focus:border-primary";

  return (
    <section className="relative overflow-hidden bg-cream-200 py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-multiply"
        style={{ backgroundImage: "url(/assets/tex-grunge.png)", backgroundSize: "480px" }}
      />

      <div className="container-tx relative z-10">
        {/* ------------------------------ search card --------------------------- */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mx-auto max-w-4xl rounded-[28px] border border-ink/10 bg-paper p-7 text-center shadow-soft3 md:p-10"
        >
          <span className="eyebrow justify-center text-tex-red">
            <span aria-hidden>★</span> {copy.eyebrow}
          </span>
          <h2 className="display mt-4 text-4xl uppercase leading-[0.95] text-ink md:text-5xl">{copy.heading}</h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-ink-600 md:text-base">{copy.body}</p>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
            {/* search */}
            <label className="group flex items-center gap-3 rounded-full border border-ink/12 bg-cream px-5 py-3.5 transition-colors focus-within:border-primary sm:col-span-2 lg:col-span-1">
              <svg viewBox="0 0 24 24" className="size-5 shrink-0 text-ink-400" fill="none" aria-hidden>
                <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
                <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={copy.searchPlaceholder}
                aria-label={copy.searchPlaceholder}
                className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-400"
              />
            </label>

            {/* region */}
            <div className="relative">
              <select
                value={region}
                onChange={(e) => onRegionChange(e.target.value as MarketRegionId | "all")}
                aria-label={copy.allRegions}
                className={selectCls}
              >
                <option value="all">{copy.allRegions}</option>
                {regions.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden>
                ▾
              </span>
            </div>

            {/* brand */}
            <div className="relative">
              <select
                value={brand}
                onChange={(e) => onBrandChange(e.target.value as BrandId | "all")}
                aria-label={copy.allBrands}
                className={selectCls}
              >
                <option value="all">{copy.allBrands}</option>
                {brands.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
              </select>
              <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-ink-400" aria-hidden>
                ▾
              </span>
            </div>
          </div>
        </motion.div>

        {/* -------------------------------- results ----------------------------- */}
        <motion.div layout className="mx-auto mt-12 grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((m, i) => {
              const active = focus === m.code;
              return (
                <motion.div
                  key={m.code}
                  layout
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.4, ease: ease.out, delay: Math.min(i * 0.025, 0.3) }}
                  className={`group relative flex items-center gap-4 rounded-2xl border bg-paper px-4 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft3 ${
                    active ? "border-primary shadow-soft3 ring-2 ring-primary/25" : "border-secondary/45 hover:border-primary"
                  }`}
                >
                  <img
                    src={`/assets/flags/${m.code}.svg`}
                    alt=""
                    className="shrink-0 rounded-full shadow-sm ring-1 ring-ink/10 transition-transform duration-300 group-hover:scale-105"
                    style={{ width: 42, height: 42 }}
                  />

                  {/* whole card links out to that market's own site */}
                  <a
                    href={m.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="link"
                    className="min-w-0 flex-1 text-left after:absolute after:inset-0 after:content-['']"
                  >
                    <span className="block truncate text-sm font-extrabold text-ink">{m.name}</span>
                    <span className="mt-0.5 flex items-center gap-1.5 truncate text-[11px] font-bold uppercase tracking-caps text-ink-400">
                      <span
                        className="size-1.5 shrink-0 rounded-full"
                        style={{ background: m.brand === "texas" ? "#F4B118" : "#B12028" }}
                      />
                      <span className="truncate text-primary/80">{regionName(m.region)}</span>
                      <span className="text-ink-400">· {brandName(m.brand)}</span>
                    </span>
                  </a>

                  {/* …and the pin lights it up on the map above */}
                  <button
                    type="button"
                    onClick={() => onFocus(m.code)}
                    title={copy.showOnMap}
                    aria-label={`${copy.showOnMap}: ${m.name}`}
                    className="relative z-10 grid size-9 shrink-0 place-items-center rounded-full border border-ink/10 bg-cream text-ink-600 transition-colors hover:border-primary hover:bg-primary hover:text-cream"
                  >
                    <svg viewBox="0 0 24 24" className="size-4" fill="none" aria-hidden>
                      <path
                        d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="2" />
                    </svg>
                  </button>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {results.length === 0 && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-12 text-center text-sm text-ink-600">
            {copy.empty}
          </motion.p>
        )}
      </div>
    </section>
  );
}
