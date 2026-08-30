"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { services } from "@/lib/content";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";
import Reveal from "@/components/ui/Reveal";
import { LinesReveal } from "@/components/ui/TextReveal";

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-ink py-28 text-cream md:py-40">
      {/* grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{ backgroundImage: "url(/assets/tex-grunge.png)", backgroundSize: "340px" }}
      />
      <div className="container-tx relative">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <span className="eyebrow text-tex-yellow">★ {services.eyebrow}</span>
            </Reveal>
            <h2 className="display mt-5 text-[10vw] leading-[0.9] md:text-[5vw]">
              <LinesReveal lines={["Crafted,", "not manufactured."]} lineClassName="block" />
            </h2>
          </div>
        </div>

        <motion.div
          variants={staggerContainer(0.09)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.items.map((item) => (
            <motion.article
              key={item.title}
              variants={fadeUp}
              data-cursor="hover"
              whileHover="hover"
              initial="rest"
              animate="rest"
              className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-3xl border border-cream/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:bg-white/[0.06]"
            >
              {/* hover glow */}
              <motion.div
                variants={{ rest: { opacity: 0 }, hover: { opacity: 1 } }}
                className="pointer-events-none absolute -inset-px rounded-3xl"
                style={{
                  background:
                    "radial-gradient(400px circle at 50% 0%, rgba(245,181,30,0.18), transparent 60%)",
                }}
              />
              <motion.div
                variants={{ rest: { scale: 1, rotate: 0 }, hover: { scale: 1.08, rotate: -4 } }}
                transition={{ type: "spring", stiffness: 200, damping: 14 }}
                className="flex h-14 w-14 items-center justify-center rounded-2xl bg-tex-yellow"
              >
                <Image src={`/assets/icons/${item.icon}.svg`} alt="" width={26} height={26} />
              </motion.div>

              <div>
                <h3 className="display text-2xl">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-cream/60">{item.desc}</p>
              </div>

              <span className="absolute right-6 top-6 text-cream/20 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-tex-yellow">
                →
              </span>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
