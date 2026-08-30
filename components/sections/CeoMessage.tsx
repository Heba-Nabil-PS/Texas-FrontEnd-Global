"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ceoMessage } from "@/lib/content";
import { WordsReveal } from "@/components/ui/TextReveal";
import { staggerContainer, fadeUp, inView, ease } from "@/lib/motion";

export default function CeoMessage({ image }: { image?: string } = {}) {
  const portrait = image ?? ceoMessage.image;

  return (
    <section className="relative overflow-hidden bg-ink text-cream lg:min-h-[640px]">
      {/* ambient colour glows */}
      <div className="pointer-events-none absolute -left-40 top-0 h-[38rem] w-[38rem] rounded-full bg-primary/25 blur-[150px]" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-[32rem] w-[32rem] rounded-full bg-secondary/15 blur-[140px]" />
      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06] mix-blend-overlay"
        style={{ backgroundImage: "url(/assets/tex-grunge.png)", backgroundSize: "360px" }}
      />

      {/* Copy */}
      <div className="container-tx relative z-10 lg:flex lg:min-h-[640px] lg:items-center">
        <div className="max-w-xl py-20 md:max-w-2xl md:py-28 lg:py-16">
          <h2 className="display text-4xl uppercase leading-[0.95] sm:text-5xl md:text-6xl">
            <WordsReveal text={ceoMessage.heading[0]} className="block text-cream" />
            <span className="block">
              <WordsReveal text="from" className="text-cream" />{" "}
              <WordsReveal text="our CEO" className="text-primary" />
            </span>
          </h2>

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-7 max-w-xl space-y-4 border-l-2 border-primary/50 pl-6"
          >
            {ceoMessage.body.map((p, i) => (
              <motion.p key={i} variants={fadeUp} className="leading-relaxed text-cream/70">
                {p}
              </motion.p>
            ))}
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-8 flex items-center gap-3"
          >
            <span className="h-4 w-3 bg-secondary" />
            <span className="display text-xl uppercase tracking-wide text-secondary">{ceoMessage.name}</span>
          </motion.div>
        </div>
      </div>

      {/* CEO portrait — flush to the bottom-right corner, big, never cropped */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={inView}
        transition={{ duration: 0.9, ease: ease.out }}
        whileHover={{ scale: 1.015 }}
        className="relative z-0 mx-auto -mt-8 max-w-xs sm:-mt-16 sm:max-w-sm lg:absolute lg:inset-y-0 lg:right-0 lg:mx-0 lg:mt-0 lg:w-[54%] lg:max-w-none"
      >
        <Image
          src={portrait}
          alt={`${ceoMessage.name}, CEO`}
          width={1100}
          height={1000}
          priority
          className="h-auto w-full select-none object-contain object-bottom lg:h-full lg:object-right-bottom"
        />
      </motion.div>
    </section>
  );
}
