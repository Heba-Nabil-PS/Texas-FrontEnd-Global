"use client";

import { motion } from "framer-motion";
import { why } from "@/lib/content";
import { fadeUp, staggerContainer, inView } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import { LinesReveal } from "@/components/ui/TextReveal";

export default function WhyTexas() {
  return (
    <section id="why" className="relative bg-cream py-28 md:py-40">
      <div className="container-tx">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow text-tex-red">★ {why.eyebrow}</span>
          </Reveal>
          <h2 className="display mt-5 text-[9vw] leading-[0.9] text-ink md:text-[4.4vw]">
            <LinesReveal lines={["Seventy-two years,", "one standard."]} lineClassName="block" />
          </h2>
        </div>

        {/* Counters */}
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid gap-8 border-y border-ink/10 py-10 sm:grid-cols-3"
        >
          {why.counters.map((c) => (
            <motion.div key={c.label} variants={fadeUp} className="text-center sm:text-left">
              <div className="display text-6xl text-ink md:text-7xl">
                <Counter value={c.value} suffix={c.suffix} />
              </div>
              <div className="mt-2 text-xs font-semibold uppercase tracking-caps text-ink/50">
                {c.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
