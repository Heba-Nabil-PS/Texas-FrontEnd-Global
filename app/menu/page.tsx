"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Marquee from "@/components/ui/Marquee";
import HorizontalScroll from "@/components/ui/HorizontalScroll";
import Tilt from "@/components/ui/Tilt";
import MenuHero from "@/components/sections/MenuHero";
import MenuMaskReveal from "@/components/sections/MenuMaskReveal";
import FindUs from "@/components/sections/FindUs";
import { menuPage } from "@/lib/content";
import { staggerContainer, fadeUp } from "@/lib/motion";

export default function MenuPage() {
  return (
    <>
      <MenuHero />

      {/* Category marquee strip */}
      <div className="border-y border-ink/10 bg-tex-yellow py-4 text-ink">
        <Marquee duration={26}>
          {menuPage.categories.map((c) => (
            <span key={c.id} className="flex items-center">
              <span className="display px-6 text-2xl uppercase md:text-3xl">{c.title}</span>
              <span className="px-2 text-lg">★</span>
            </span>
          ))}
        </Marquee>
      </div>

      {/* Pinned horizontal category gallery */}
      <HorizontalScroll
        className="bg-cream"
        header={
          <div className="container-tx mb-10">
            <div className="flex items-end justify-between gap-6">
              <SectionHeading
                eyebrow="Explore by category"
                heading="Pick your crunch."
              />
              <span className="hidden shrink-0 items-center gap-2 pb-2 text-sm font-bold uppercase tracking-caps text-ink-400 md:flex">
                Scroll <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        }
      >
        {menuPage.categories.map((c) => (
          <div
            key={c.id}
            className="group relative aspect-[3/4] w-[78vw] shrink-0 overflow-hidden rounded-3xl bg-ink shadow-pop ring-1 ring-ink/5 sm:w-[52vw] md:w-[34vw] lg:w-[26vw]"
          >
            <Image
              src={c.image}
              alt={c.title}
              fill
              sizes="(max-width: 768px) 78vw, 30vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
          </div>
        ))}
      </HorizontalScroll>

      {/* Scroll-driven masked headline — chicken through the letters */}
      <MenuMaskReveal />

      {/* Signature items */}
      <section className="bg-cream-200 py-24 md:py-32">
        <div className="container-tx">
          <SectionHeading
            eyebrow="Signatures"
            heading="The ones people drive across town for."
            body="A taste of the line-up. Full menus, prices and availability live on your local market site."
          />

          <motion.div
            variants={staggerContainer(0.09)}
            initial="hidden"
            whileInView="show"
            /**
             * `amount: "some"` — NOT the shared `inView` (amount 0.3). Stacked to
             * one column this grid is ~3300px tall, so 30% of it never fits a
             * phone viewport and the reveal would never fire, leaving every card
             * stuck at opacity 0.
             */
            viewport={{ once: true, amount: "some" }}
            className="mt-14 grid gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12"
          >
            {menuPage.signatures.map((item, i) => (
              <motion.div key={item.title} variants={fadeUp}>
                <Tilt max={6} glare={false} className="h-full">
                  <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-paper shadow-soft3 transition-shadow duration-500 hover:shadow-pop">
                    <div className="relative aspect-[4/3] overflow-hidden bg-ink">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                      <span className="absolute left-4 top-4 rounded-full bg-tex-red px-3 py-1 text-xs font-extrabold uppercase tracking-caps text-cream">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <span className="eyebrow text-tex-red">{item.tag}</span>
                      <h3 className="display mt-2 text-2xl uppercase text-ink transition-colors duration-300 group-hover:text-tex-red">
                        {item.title}
                      </h3>
                      {/* Clamped to two lines so every card's footer sits on the same rule */}
                      <p className="mt-2 line-clamp-2 min-h-[2.85rem] text-sm leading-relaxed text-ink-600">
                        {item.desc}
                      </p>

                      <div className="mt-auto flex items-center justify-between gap-4 border-t border-ink/10 pt-4 text-xs font-bold uppercase tracking-caps">
                        <span className="text-ink-400">Per serving</span>
                        <span className="text-ink">{item.cals}</span>
                      </div>
                    </div>
                  </article>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>

          <p className="mt-10 text-center text-xs uppercase tracking-caps text-ink-400">{menuPage.note}</p>
        </div>
      </section>

      <FindUs />
    </>
  );
}
