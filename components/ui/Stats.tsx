"use client";

import { motion } from "framer-motion";
import Counter from "./Counter";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";

export type Stat = { value: number; label: string; suffix?: string };

/**
 * Animated stat row — numbers count up on scroll, cards rise on a stagger.
 */
export default function Stats({
  stats,
  onDark = false,
  cols = 4,
  className,
}: {
  stats: Stat[];
  onDark?: boolean;
  /** Columns on desktop — 4 for a full-width row, 2 for a narrow column (2×2). */
  cols?: 2 | 4;
  className?: string;
}) {
  const colsCls = cols === 2 ? "grid-cols-2" : "grid-cols-2 md:grid-cols-4";
  return (
    <motion.div
      variants={staggerContainer(0.1)}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      className={`grid ${colsCls} gap-px overflow-hidden rounded-3xl ${
        onDark ? "bg-cream/10" : "bg-ink/10"
      } ${className ?? ""}`}
    >
      {stats.map((s) => (
        <motion.div
          key={s.label}
          variants={fadeUp}
          className={`flex flex-col gap-2 p-6 md:p-8 ${onDark ? "bg-ink" : "bg-cream"}`}
        >
          <Counter
            value={s.value}
            suffix={s.suffix}
            className={`display text-4xl md:text-5xl ${onDark ? "text-tex-yellow" : "text-tex-red"}`}
          />
          <span
            className={`text-xs font-bold uppercase tracking-caps md:text-sm ${
              onDark ? "text-cream/60" : "text-ink-600"
            }`}
          >
            {s.label}
          </span>
        </motion.div>
      ))}
    </motion.div>
  );
}
