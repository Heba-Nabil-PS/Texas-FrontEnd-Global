"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import { worldMap } from "@/lib/content";

/** Simplified continent silhouettes (viewBox 1000×500) — faint backdrop. */
const CONTINENTS = [
  // North America
  "M60,95 C120,55 210,58 252,96 C284,120 256,150 276,168 C254,205 212,208 190,238 C160,262 150,212 136,186 C110,176 70,150 60,95 Z",
  // Greenland
  "M300,52 C342,44 362,72 346,102 C326,126 300,112 300,82 Z",
  // South America
  "M252,300 C292,286 302,332 286,378 C276,424 250,432 240,396 C224,360 226,320 252,300 Z",
  // Europe
  "M470,112 C512,96 548,110 542,136 C562,152 520,166 500,160 C475,166 460,142 470,112 Z",
  // Africa
  "M482,200 C542,186 586,206 576,256 C572,302 546,346 516,362 C490,346 486,300 480,266 C470,242 472,216 482,200 Z",
  // Middle East (bridge)
  "M560,214 C600,204 632,220 626,250 C610,272 574,262 558,240 C552,228 552,220 560,214 Z",
  // Asia
  "M560,96 C662,70 782,80 842,120 C882,146 852,186 822,196 C782,212 722,196 682,216 C642,226 602,212 576,182 C550,160 546,120 560,96 Z",
  // India
  "M652,220 C682,214 692,256 666,278 C646,268 640,242 652,220 Z",
  // SE Asia / Indonesia
  "M718,300 C760,290 802,300 812,322 C792,342 742,336 722,326 C706,320 710,305 718,300 Z",
  // Oceania
  "M792,340 C842,330 876,356 860,392 C836,412 796,396 786,370 C780,356 782,346 792,340 Z",
];

function arcPath(a: { x: number; y: number }, b: { x: number; y: number }) {
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const bow = Math.hypot(b.x - a.x, b.y - a.y) * 0.28;
  return `M${a.x},${a.y} Q${mx},${my - bow} ${b.x},${b.y}`;
}

export default function WorldMap() {
  const [hover, setHover] = useState<number | null>(null);
  const { hq, regions } = worldMap;
  const px = (x: number) => `${(x / 1000) * 100}%`;
  const py = (y: number) => `${(y / 500) * 100}%`;

  return (
    <section className="relative overflow-hidden bg-cream-200 py-20 md:py-28">
      <div className="container-tx">
        <SectionHeading align="center" eyebrow={worldMap.eyebrow} heading={worldMap.heading} className="mx-auto" />

        <div className="relative mx-auto mt-12 max-w-5xl">
          <svg viewBox="0 0 1000 500" className="h-auto w-full">
            <g className="fill-ink/[0.07]">
              {CONTINENTS.map((d, i) => (
                <path key={i} d={d} />
              ))}
            </g>

            {/* Arcs from HQ to each region */}
            {regions.map((r, i) => (
              <motion.path
                key={`arc-${i}`}
                d={arcPath(hq, r)}
                fill="none"
                stroke="#F4B118"
                strokeWidth={1.6}
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0 }}
                whileInView={{ pathLength: 1, opacity: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, delay: 0.25 + i * 0.12, ease: "easeInOut" }}
              />
            ))}

            {/* Region pins */}
            {regions.map((r, i) => (
              <g
                key={`pin-${i}`}
                className="cursor-pointer"
                onMouseEnter={() => setHover(i)}
                onMouseLeave={() => setHover((h) => (h === i ? null : h))}
              >
                <motion.circle
                  cx={r.x}
                  cy={r.y}
                  r={5}
                  fill="#F4B118"
                  animate={{ r: [5, 13], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.3, ease: "easeOut" }}
                />
                <circle cx={r.x} cy={r.y} r={hover === i ? 7 : 5.5} fill="#F4B118" stroke="#2d2a26" strokeWidth={1.4} className="transition-all" />
                <circle cx={r.x} cy={r.y} r={16} fill="transparent" />
              </g>
            ))}

            {/* Egypt HQ */}
            <g>
              <motion.circle
                cx={hq.x}
                cy={hq.y}
                r={8}
                fill="#B12028"
                animate={{ r: [8, 22], opacity: [0.45, 0] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeOut" }}
              />
              <circle cx={hq.x} cy={hq.y} r={9} fill="#B12028" stroke="#faf6ef" strokeWidth={2} />
            </g>
          </svg>

          {/* HQ label */}
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[190%]"
            style={{ left: px(hq.x), top: py(hq.y) }}
          >
            <span className="whitespace-nowrap rounded-full bg-ink px-3 py-1.5 text-[11px] font-bold uppercase tracking-caps text-cream shadow-soft3">
              {worldMap.hqLabel}
            </span>
          </div>

          {/* Region tooltip */}
          {hover !== null && (
            <motion.div
              key={hover}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-[200%]"
              style={{ left: px(regions[hover].x), top: py(regions[hover].y) }}
            >
              <span className="whitespace-nowrap rounded-full bg-primary px-3 py-1.5 text-[11px] font-bold uppercase tracking-caps text-white shadow-lg">
                {regions[hover].name}
              </span>
            </motion.div>
          )}
        </div>

        {/* Legend + hint */}
        <div className="mx-auto mt-8 flex max-w-5xl flex-col items-start justify-between gap-3 text-xs uppercase tracking-caps text-ink-600 sm:flex-row sm:items-center">
          <div className="flex flex-wrap gap-x-6 gap-y-2">
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-secondary" />
              {worldMap.legendActive}
            </span>
            <span className="flex items-center gap-2">
              <span className="size-3 rounded-full bg-primary" />
              {worldMap.legendHq}
            </span>
          </div>
          <span className="text-ink-400">{worldMap.hint}</span>
        </div>
      </div>
    </section>
  );
}
