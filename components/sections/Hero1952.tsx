"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { homeHero } from "@/lib/content";
import { ease } from "@/lib/motion";

const HERO_DELAY = 2.0; // hand off after the preloader curtain

export default function Hero1952() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const year = Array.from(homeHero.year);

  return (
    <section ref={ref} id="top" className="relative flex h-[92vh] min-h-[560px] w-full items-center overflow-hidden bg-ink">
      {/* Vintage stand video */}
      <motion.div className="absolute inset-0" style={{ scale: videoScale }}>
        <video
          className="h-full w-full object-cover"
          src={homeHero.video}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden
        />
      </motion.div>

      {/* Red duotone + vignette */}
      <div className="absolute inset-0 bg-primary mix-blend-multiply opacity-[0.78]" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-ink/50" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,rgba(45,42,38,0.55))]" />

      {/* Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="container-tx relative z-10 pt-16"
      >
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: ease.out, delay: HERO_DELAY }}
          className="display text-[7vw] uppercase leading-none text-secondary drop-shadow-[0_4px_20px_rgba(0,0,0,0.4)] sm:text-4xl md:text-5xl"
        >
          {homeHero.pre}
        </motion.p>

        <h1 className="display mt-1 flex text-secondary drop-shadow-[0_8px_30px_rgba(0,0,0,0.45)]">
          {year.map((d, i) => (
            <span key={i} className="block overflow-hidden">
              <motion.span
                className="block text-[34vw] leading-[0.82] md:text-[22vw] lg:text-[16rem]"
                initial={{ y: "110%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 1, ease: ease.expo, delay: HERO_DELAY + 0.15 + i * 0.08 }}
              >
                {d}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: HERO_DELAY + 1, duration: 1 }}
        className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/80"
      >
        <span className="flex h-9 w-5 justify-center rounded-full border border-cream/50 p-1">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-secondary"
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </span>
      </motion.div>
    </section>
  );
}
