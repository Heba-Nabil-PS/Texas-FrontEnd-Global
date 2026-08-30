"use client";

import { about } from "@/lib/content";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";
import { motion } from "framer-motion";
import { LinesReveal, WordsReveal } from "@/components/ui/TextReveal";
import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/ui/Counter";
import Button from "@/components/ui/Button";

export default function About() {
  return (
    <section id="about" className="relative bg-cream pb-20 pt-10 md:pb-28 md:pt-14">
      <div className="container-tx">
        <div className="grid items-center gap-16 lg:grid-cols-[1fr_1.1fr]">
          {/* Text column */}
          <div>
            <Reveal>
              <span className="eyebrow text-tex-red">★ {about.eyebrow}</span>
            </Reveal>

            <h2 className="display mt-5 text-[8vw] leading-[0.92] md:text-[3.6vw]">
              <LinesReveal
                lines={["It started across", "from the Alamo —"]}
                lineClassName="block text-ink"
              />
              <LinesReveal
                lines={["and never slowed down."]}
                delay={0.18}
                lineClassName="block text-tex-red"
              />
            </h2>

            <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink/70">
              <WordsReveal text={about.body} />
            </p>

            {/* Animated stats */}
            <motion.div
              variants={staggerContainer(0.1)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4"
            >
              {about.stats.map((s) => (
                <motion.div key={s.label} variants={fadeUp}>
                  <div className="display text-5xl text-tex-red md:text-6xl">
                    <Counter value={s.value} suffix={s.suffix} />
                  </div>
                  <div className="mt-2 text-xs font-semibold uppercase tracking-caps text-ink/50">
                    {s.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Call to action */}
            <Reveal delay={0.15} className="mt-12 flex flex-wrap items-center gap-4">
              <Button href={about.cta.primary.href} variant="red">
                {about.cta.primary.label}
              </Button>
              <Button href={about.cta.secondary.href} variant="ghost">
                {about.cta.secondary.label}
              </Button>
            </Reveal>
          </div>

          {/* Media column — animated tray GIF filling the space */}
          <div className="relative h-[380px] md:h-[620px]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full w-full"
            >
              <video
                className="h-full w-full object-contain object-center mix-blend-multiply"
                src="/assets/home/food-gif.webm"
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                aria-label="Texas Chicken tray"
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
