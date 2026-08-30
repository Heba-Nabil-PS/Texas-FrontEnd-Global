"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Menu headline with an Apple-"Pick your chip"-style metallic sheen.
 * The heading is filled with a warm brand-metal gradient (deep red → orange →
 * gold → a bright cream highlight) via background-clip:text; the specular
 * highlight sweeps across the letters as the section scrolls through view.
 */
export default function MenuMaskReveal() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Specular highlight sweeps across the letters as we scroll past.
  const sheen = useTransform(scrollYProgress, [0, 1], ["135% 0%", "-35% 0%"]);
  // Gentle rise / drift reveal.
  const y = useTransform(scrollYProgress, [0, 0.5, 1], ["12%", "0%", "-8%"]);

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-ink py-28 text-cream md:py-40"
    >
      {/* ambient glow + grain */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[42rem] w-[42rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/12 blur-[160px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-overlay"
        style={{ backgroundImage: "url(/assets/tex-grunge.png)", backgroundSize: "360px" }}
      />

      <div className="container-tx relative flex flex-col items-center text-center">
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.6 }}
          className="eyebrow justify-center text-tex-yellow"
        >
          <span aria-hidden>★</span> Pick your crunch
        </motion.span>

        <motion.h2
          style={{
            y,
            backgroundImage:
              "linear-gradient(100deg, #7d1417 0%, #B12028 22%, #e0641f 37%, #F4B118 47%, #fff6e2 50%, #F4B118 53%, #e0641f 63%, #B12028 78%, #7d1417 100%)",
            backgroundSize: "260% 100%",
            backgroundPosition: sheen,
            backgroundRepeat: "no-repeat",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
            color: "transparent",
          }}
          className="display mx-auto mt-6 max-w-[16ch] text-[15vw] uppercase leading-[0.82] md:text-[9vw]"
        >
          Explore our Texas Chicken menu
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-8 max-w-md leading-relaxed text-cream/55"
        >
          Hand-battered, fried fresh, built bold — every category, one unmistakable crunch.
        </motion.p>
      </div>
    </section>
  );
}
