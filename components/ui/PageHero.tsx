"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LinesReveal } from "./TextReveal";
import { ease } from "@/lib/motion";

/**
 * Cinematic inner-page hero. Big masked-line title, floating decoration, a
 * slow-rotating ghost star, scroll-linked parallax and a scroll cue. Shared by
 * every route so the site feels like one production.
 */
export default function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  accentFrom = 1,
}: {
  eyebrow: string;
  title: string[];
  subtitle?: string;
  children?: ReactNode;
  /** index from which lines turn yellow (default: last line) */
  accentFrom?: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const starRot = useTransform(scrollYProgress, [0, 1], [0, 90]);

  const accent = accentFrom < 0 ? title.length + accentFrom : accentFrom;

  return (
    <section
      ref={ref}
      className="relative flex min-h-[82vh] items-end overflow-hidden bg-ink pb-16 pt-40 text-cream md:min-h-[86vh] md:pb-24"
    >
      {/* Warm radial glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-40 top-10 h-[42rem] w-[42rem] rounded-full bg-tex-red/25 blur-[120px]" />
        <div className="absolute -right-24 bottom-0 h-[36rem] w-[36rem] rounded-full bg-tex-yellow/15 blur-[120px]" />
      </div>

      {/* Grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12] mix-blend-overlay"
        style={{ backgroundImage: "url(/assets/tex-grunge.png)", backgroundSize: "480px" }}
      />

      {/* Slow-rotating ghost star */}
      <motion.div
        aria-hidden
        style={{ rotate: starRot }}
        className="pointer-events-none absolute -right-24 top-24 select-none text-[34rem] leading-none text-cream/[0.04]"
      >
        ★
      </motion.div>

      {/* Floating stars */}
      <FloatingStars />

      <motion.div style={{ y, opacity }} className="container-tx relative z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ease.out, delay: 0.15 }}
          className="eyebrow text-tex-yellow"
        >
          <span aria-hidden>★</span> {eyebrow}
        </motion.span>

        <h1 className="display mt-5 text-[13vw] leading-[0.86] sm:text-[12vw] md:text-[8.5vw]">
          {title.map((line, i) => (
            <LinesReveal
              key={i}
              lines={[line]}
              delay={0.2 + i * 0.05}
              className="block"
              lineClassName={i >= accent ? "text-tex-yellow" : "text-cream"}
            />
          ))}
        </h1>

        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: ease.out, delay: 0.55 }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-cream/75 md:text-lg"
          >
            {subtitle}
          </motion.p>
        )}

        {children && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: ease.out, delay: 0.7 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            {children}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}

function FloatingStars() {
  const stars = [
    { top: "22%", left: "8%", size: 30, dur: 8, delay: 0 },
    { top: "38%", left: "88%", size: 20, dur: 6, delay: 0.6 },
    { top: "68%", left: "80%", size: 40, dur: 9, delay: 1 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-[5]">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-tex-yellow/60"
          style={{ top: s.top, left: s.left, fontSize: s.size }}
          animate={{ y: [0, -18, 0], rotate: [0, 14, 0] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}
