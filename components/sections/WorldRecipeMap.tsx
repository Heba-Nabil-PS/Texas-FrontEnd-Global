"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import { worldPaths, worldDots } from "@/lib/worldPaths";
import { inView } from "@/lib/motion";

/** Markets (ISO A3) — from texaschicken.com + churchstexaschicken.com */
const MARKETS = new Set([
  // Texas Chicken (texaschicken.com)
  "KHM", "IDN", "LAO", "MYS", "NZL", "VNM", "DEU", "GEO",
  "AZE", "QAT", "IRQ", "OMN", "SAU", "ARE", "EGY", "MAR",
  // Church's Texas Chicken (churchstexaschicken.com)
  "USA", "CAN", "MEX", "HND", "GUY", "JAM", "TTO", "PRI",
]);
/** City-state / small-island markets too small for the country dataset */
const TINY = [
  { name: "Singapore", x: 1577, y: 492 },
  { name: "Bahrain", x: 1281, y: 356 },
  { name: "St. Kitts", x: 652, y: 404 },
  { name: "St. Lucia", x: 662, y: 423 },
  { name: "Virgin Islands", x: 639, y: 398 },
];

const DARK = "#33333b";
const LAND_STROKE = "#1c1c22";
const YELLOW = "#F4B118";
const RED = "#e2342b";

export default function WorldRecipeMap() {
  const entries = Object.entries(worldPaths);

  return (
    <section className="relative overflow-hidden bg-[#26262b] py-24 text-cream md:py-32">
      {/* ambient glows */}
      <div className="pointer-events-none absolute -left-40 top-1/3 h-[36rem] w-[36rem] rounded-full bg-secondary/10 blur-[150px]" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-[30rem] w-[30rem] rounded-full bg-primary/10 blur-[140px]" />

      <div className="container-tx relative">
        <SectionHeading
          align="center"
          eyebrow="Our global footprint"
          heading="One recipe, served across the world."
          onDark
          className="mx-auto"
        />

        <div className="mt-12 md:mt-16">
          <svg
            viewBox="0 33 2000 800"
            className="w-full"
            role="img"
            aria-label="Map of Texas Chicken markets around the world"
          >
            <defs>
              <filter id="mkGlow" x="-30%" y="-30%" width="160%" height="160%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor={YELLOW} floodOpacity="0.55" />
              </filter>
            </defs>

            {/* Base landmasses (dark) */}
            {entries.map(([iso, d]) => (
              <path key={iso} d={d} fill={DARK} stroke={LAND_STROKE} strokeWidth={0.6} />
            ))}

            {/* Ambient red hot-spots */}
            {worldDots.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={2.3} fill={RED} opacity={0.6} />
            ))}

            {/* Highlighted markets (yellow, glow, fade-in) */}
            <g filter="url(#mkGlow)">
              {entries
                .filter(([iso]) => MARKETS.has(iso))
                .map(([iso, d], i) => (
                  <motion.path
                    key={iso}
                    d={d}
                    fill={YELLOW}
                    stroke="#b7830f"
                    strokeWidth={0.6}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={inView}
                    transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  />
                ))}

              {/* Tiny city/island markets */}
              {TINY.map((t, i) => (
                <motion.circle
                  key={t.name}
                  cx={t.x}
                  cy={t.y}
                  r={8}
                  fill={YELLOW}
                  stroke="#26262b"
                  strokeWidth={2}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={inView}
                  transition={{ duration: 0.5, ease: "easeOut", delay: 0.8 + i * 0.1 }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                />
              ))}
            </g>
          </svg>
        </div>

        {/* Caption / legend */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-4 text-center"
        >
          <span className="flex items-center gap-2 text-sm text-cream/70">
            <span className="size-3.5 rounded-sm bg-secondary" /> Markets we serve
          </span>
          <span className="hidden h-6 w-px bg-cream/15 sm:block" />
          <span className="display text-3xl text-tex-yellow md:text-4xl">29 markets</span>
          <span className="hidden h-6 w-px bg-cream/15 sm:block" />
          <span className="max-w-xs text-sm text-cream/70">
            One hand-battered recipe, served across the Americas, the Middle East, Asia and beyond.
          </span>
        </motion.div>

        {/* Call to action — find an existing market, or open a new one */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={inView}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/find-your-market" variant="yellow">
            Find your market
          </Button>
          <Button href="/franchising" variant="ghostDark">
            Bring Texas to your market
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
