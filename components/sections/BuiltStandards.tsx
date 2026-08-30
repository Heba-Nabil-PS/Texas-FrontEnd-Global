"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { builtStandards } from "@/lib/content";
import { WordsReveal } from "@/components/ui/TextReveal";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";

export default function BuiltStandards() {
  return (
    <section className="relative overflow-hidden bg-cream py-20 md:py-28">
      <div className="container-tx grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Copy */}
        <div className="order-2 lg:order-1">
          <h2 className="display text-4xl uppercase leading-[0.95] text-secondary sm:text-5xl md:text-6xl">
            <WordsReveal text={builtStandards.heading[0]} className="block" />
            <WordsReveal text={builtStandards.heading[1]} className="block" />
          </h2>

          <motion.div
            variants={staggerContainer(0.12)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-7 max-w-xl space-y-4"
          >
            {builtStandards.body.map((p, i) => (
              <motion.p
                key={i}
                variants={fadeUp}
                className={`leading-relaxed text-ink-600 ${i === 0 ? "font-bold text-ink" : ""}`}
              >
                {p}
              </motion.p>
            ))}
          </motion.div>
        </div>

        {/* Tray */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
          whileInView={{ opacity: 1, scale: 1, rotate: -3 }}
          viewport={inView}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="order-1 lg:order-2"
        >
          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative mx-auto w-full max-w-[560px]"
          >
            <Image
              src={builtStandards.image}
              alt="Texas Chicken meal tray"
              width={1200}
              height={960}
              priority
              className="h-auto w-full object-contain drop-shadow-[0_40px_60px_rgba(45,42,38,0.28)]"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
