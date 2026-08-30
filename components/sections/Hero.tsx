"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { hero } from "@/lib/content";

const HERO_DELAY = 2.0; // hand off after preloader

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  // Layered scroll motion: video scales
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);

  return (
    <section ref={ref} id="top" className="relative h-[100svh] w-full overflow-hidden bg-ink text-cream">
      {/* Background video */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          className="h-full w-full object-cover"
          src={hero.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </motion.div>

      {/* Floating decorative elements */}
      <FloatingStars />

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: HERO_DELAY + 1, duration: 1 }}
        className="absolute bottom-7 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/70"
      >
        <span className="text-[11px] font-bold uppercase tracking-caps">{hero.scrollHint}</span>
        <span className="flex h-9 w-5 justify-center rounded-full border border-cream/40 p-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-tex-yellow"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}

function FloatingStars() {
  const stars = [
    { top: "18%", left: "82%", size: 46, dur: 7, delay: 0 },
    { top: "70%", left: "12%", size: 30, dur: 9, delay: 1 },
    { top: "34%", left: "68%", size: 20, dur: 6, delay: 0.5 },
  ];
  return (
    <div className="pointer-events-none absolute inset-0 z-[5]">
      {stars.map((s, i) => (
        <motion.span
          key={i}
          className="absolute text-tex-yellow/70"
          style={{ top: s.top, left: s.left, fontSize: s.size }}
          animate={{ y: [0, -18, 0], rotate: [0, 12, 0] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}
