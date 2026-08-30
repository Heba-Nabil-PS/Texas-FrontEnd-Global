"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import CTABand from "@/components/sections/CTABand";
import { faqsPage } from "@/lib/content";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";

function slug(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function ChevronDown() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="size-5 shrink-0 text-tex-red transition-transform duration-300 group-open:rotate-180">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

export default function FaqsPage() {
  return (
    <>
      <PageHero
        eyebrow={faqsPage.hero.eyebrow}
        title={faqsPage.hero.title}
        subtitle={faqsPage.hero.subtitle}
      />

      {/* Category quick-nav */}
      <section className="border-b border-ink/10 bg-cream">
        <div className="container-tx flex flex-wrap gap-3 py-6">
          {faqsPage.groups.map((g) => (
            <a
              key={g.title}
              href={`#${slug(g.title)}`}
              data-cursor="link"
              className="rounded-full border border-ink/15 px-4 py-2 text-xs font-bold uppercase tracking-caps text-ink-600 transition-colors hover:border-tex-red hover:text-tex-red"
            >
              {g.title}
            </a>
          ))}
        </div>
      </section>

      {/* Accordion groups */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-tx space-y-16">
          {faqsPage.groups.map((g) => (
            <div key={g.title} id={slug(g.title)} className="scroll-mt-28">
              <SectionHeading eyebrow="FAQs" heading={g.title} />
              <motion.div
                variants={staggerContainer(0.06)}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                className="mt-8 max-w-3xl"
              >
                {g.items.map((item) => (
                  <motion.details
                    key={item.q}
                    variants={fadeUp}
                    className="group border-b border-ink/10"
                  >
                    <summary className="flex cursor-pointer items-center justify-between gap-4 py-5">
                      <span className="font-texas text-lg font-bold text-ink">{item.q}</span>
                      <ChevronDown />
                    </summary>
                    <p className="pb-6 pr-9 leading-relaxed text-ink-600">{item.a}</p>
                  </motion.details>
                ))}
              </motion.div>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        eyebrow="Still curious?"
        heading="Can't find"
        accent="your answer?"
        body="Our team is happy to help. Reach out and we'll get back to you."
        primary={{ label: "Contact us", href: "/contact-us" }}
        secondary={{ label: "Find your market", href: "/find-your-market" }}
      />
    </>
  );
}
