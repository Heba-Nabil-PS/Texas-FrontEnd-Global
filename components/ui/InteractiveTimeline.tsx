"use client";

import { useCallback, useEffect, useState, type KeyboardEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";

type TItem = { year: string; title: string; desc: string };

const AUTOPLAY_MS = 4600;

/**
 * Interactive "scrollytelling"-style timeline.
 * - click / keyboard (←→) / auto-play navigation
 * - shared-layout (layoutId) node indicator that slides between years
 * - direction-aware crossfade of the active milestone
 * - auto-advance progress bar that pauses on hover / focus
 */
export default function InteractiveTimeline({ items }: { items: TItem[] }) {
  const n = items.length;
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const [paused, setPaused] = useState(false);

  const go = useCallback(
    (next: number) => {
      const i = ((next % n) + n) % n;
      setDir(i >= active ? 1 : -1);
      setActive(i);
    },
    [active, n],
  );

  // auto-advance
  useEffect(() => {
    if (paused) return;
    const id = setTimeout(() => {
      setDir(1);
      setActive((p) => (p + 1) % n);
    }, AUTOPLAY_MS);
    return () => clearTimeout(id);
  }, [active, paused, n]);

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(active + 1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(active - 1);
    }
  };

  const item = items[active];

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* ---------------- Milestone card ---------------- */}
      <div className="relative overflow-hidden rounded-[2rem] border border-ink/10 bg-cream shadow-pop">
        {/* giant ghost year */}
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={`ghost-${active}`}
            initial={{ opacity: 0, x: dir * 80 }}
            animate={{ opacity: 0.05, x: 0 }}
            exit={{ opacity: 0, x: dir * -80 }}
            transition={{ duration: 0.6, ease: ease.out }}
            className="pointer-events-none absolute -right-2 -top-16 select-none font-texas text-[40vw] font-black leading-none text-ink md:text-[15rem]"
          >
            {item.year}
          </motion.span>
        </AnimatePresence>

        <div className="relative grid gap-6 p-8 md:grid-cols-[0.85fr_1.15fr] md:gap-10 md:p-14">
          {/* year */}
          <div className="flex items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`year-${active}`}
                initial={{ opacity: 0, y: dir * 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: dir * -40 }}
                transition={{ duration: 0.4, ease: ease.out }}
              >
                <span className="eyebrow text-tex-red">
                  Chapter {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </span>
                <div className="display mt-2 text-6xl leading-none text-tex-red sm:text-7xl md:text-8xl">
                  {item.year}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* title + copy */}
          <div className="flex items-center">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`body-${active}`}
                initial={{ opacity: 0, x: dir * 60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: dir * -60 }}
                transition={{ duration: 0.45, ease: ease.out }}
              >
                <h3 className="display text-2xl uppercase leading-tight text-ink sm:text-3xl md:text-4xl">
                  {item.title}
                </h3>
                <p className="mt-4 max-w-md leading-relaxed text-ink-600 md:text-lg">{item.desc}</p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* auto-advance progress bar */}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-ink/5">
          <motion.div
            key={`bar-${active}-${paused}`}
            className="h-full bg-tex-yellow"
            initial={{ width: "0%" }}
            animate={{ width: paused ? "0%" : "100%" }}
            transition={{ duration: paused ? 0.3 : AUTOPLAY_MS / 1000, ease: "linear" }}
          />
        </div>
      </div>

      {/* ---------------- Clickable rail ---------------- */}
      <div
        role="tablist"
        aria-label="Brand timeline"
        tabIndex={0}
        onKeyDown={onKey}
        className="relative mt-10 flex items-start justify-between rounded-2xl px-1 outline-none focus-visible:ring-2 focus-visible:ring-tex-red/40"
      >
        {/* base + progress lines (inset to node centres) */}
        <div className="absolute left-[12px] right-[12px] top-[11px] h-[2px] bg-ink/10" />
        <motion.div
          className="absolute left-[12px] right-[12px] top-[11px] h-[2px] origin-left bg-tex-red"
          animate={{ scaleX: n > 1 ? active / (n - 1) : 0 }}
          transition={{ duration: 0.5, ease: ease.out }}
        />

        {items.map((it, i) => {
          const done = i <= active;
          return (
            <button
              key={it.year}
              role="tab"
              aria-selected={i === active}
              aria-label={`${it.year} — ${it.title}`}
              onClick={() => go(i)}
              className="group relative z-10 flex shrink-0 flex-col items-center gap-3"
            >
              <span
                className={`relative flex h-6 w-6 items-center justify-center rounded-full border-2 bg-cream transition-colors duration-300 ${
                  done ? "border-tex-red" : "border-ink/20 group-hover:border-tex-red/50"
                }`}
              >
                {i === active && (
                  <>
                    <motion.span
                      layoutId="tl-active-fill"
                      className="absolute inset-0 rounded-full bg-tex-red"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                    <motion.span
                      className="absolute inset-0 rounded-full bg-tex-red/40"
                      animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    />
                  </>
                )}
                <span
                  className={`relative h-2 w-2 rounded-full transition-colors ${
                    i === active ? "bg-cream" : done ? "bg-tex-red" : "bg-ink/25"
                  }`}
                />
              </span>
              <span
                className={`font-texas text-xs font-bold transition-colors sm:text-sm ${
                  i === active ? "text-tex-red" : "text-ink/40 group-hover:text-ink"
                }`}
              >
                {it.year}
              </span>
            </button>
          );
        })}
      </div>

      <p className="mt-5 text-center text-xs uppercase tracking-caps text-ink/35">
        Tap a year · use ← → keys · auto-plays
      </p>
    </div>
  );
}
