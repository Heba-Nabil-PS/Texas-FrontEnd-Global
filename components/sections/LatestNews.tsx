"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCardHover from "@/components/ui/AnimatedCardHover";
import Button from "@/components/ui/Button";
import { newsPage } from "@/lib/content";
import { staggerContainer, fadeUp } from "@/lib/motion";

/** The four most recent press releases, newest first. */
const latest = newsPage.articles.slice(0, 4);

export default function LatestNews() {
  return (
    <section className="bg-cream-200 py-24 md:py-32">
      <div className="container-tx">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            eyebrow="Newsroom"
            heading="The latest from Texas."
            body="New markets, new partners, new milestones — straight from the press room."
          />
          <Button href="/news" variant="red" className="shrink-0">
            All news
          </Button>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          // "some", not the shared amount-0.3 `inView`: stacked to one column this
          // grid is taller than a phone viewport, so 30% would never be visible.
          viewport={{ once: true, amount: "some" }}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {latest.map((a) => (
            <motion.div key={a.href} variants={fadeUp}>
              <AnimatedCardHover
                image={a.image}
                eyebrow={`${a.category} · ${a.date}`}
                title={a.title}
                desc={a.excerpt}
                href={a.href}
                cta="Read release"
                aspect="aspect-[4/5]"
                titleClassName="text-lg leading-tight line-clamp-4 md:text-xl"
                // Several press images are logos on white — needs a deeper ramp.
                scrimClassName="from-ink via-ink/75 to-ink/5"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
