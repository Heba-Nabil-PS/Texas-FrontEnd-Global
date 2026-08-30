"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Stats from "@/components/ui/Stats";
import CTABand from "@/components/sections/CTABand";
import { careersPage } from "@/lib/content";
import { staggerContainer, fadeUp, inView, ease } from "@/lib/motion";

export default function CareersPage() {
  const [filter, setFilter] = useState(careersPage.filters[0]);
  const roles =
    filter === "All"
      ? careersPage.roles
      : careersPage.roles.filter((r) => r.type === filter);

  return (
    <>
      <PageHero
        eyebrow={careersPage.hero.eyebrow}
        title={careersPage.hero.title}
        subtitle={careersPage.hero.subtitle}
      >
        <Button href="#roles" variant="yellow">
          See open roles
        </Button>
        <Button href="/our-story" variant="ghostDark">
          Our story
        </Button>
      </PageHero>

      {/* Stats */}
      <section className="bg-cream pt-16 md:pt-24">
        <div className="container-tx">
          <Stats stats={careersPage.stats} />
        </div>
      </section>

      {/* Culture */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-tx">
          <SectionHeading
            eyebrow="Culture"
            heading={careersPage.culture.heading}
            body={careersPage.culture.body}
          />
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {careersPage.culture.points.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-7"
              >
                <span className="display text-4xl text-tex-yellow">★</span>
                <h3 className="display mt-4 text-xl uppercase leading-tight text-ink">{p.title}</h3>
                <p className="mt-3 leading-relaxed text-ink-600">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Vacancies (filterable) */}
      <section id="roles" className="scroll-mt-28 bg-ink py-20 text-cream md:py-28">
        <div className="container-tx">
          <SectionHeading eyebrow="Open roles" heading="Find your place." onDark />

          {/* Filters */}
          <div className="mt-10 flex flex-wrap gap-3">
            {careersPage.filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                data-cursor="link"
                className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-caps transition-colors ${
                  filter === f
                    ? "bg-tex-yellow text-ink"
                    : "border border-cream/20 text-cream/70 hover:border-cream/60 hover:text-cream"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Roles list */}
          <motion.div layout className="mt-10 divide-y divide-cream/10 border-y border-cream/10">
            <AnimatePresence mode="popLayout">
              {roles.map((r) => (
                <motion.a
                  key={r.title}
                  layout
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: ease.out }}
                  href="/contact-us"
                  data-cursor="link"
                  className="group flex flex-col gap-2 py-6 transition-colors hover:bg-cream/[0.03] sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <h3 className="display text-2xl uppercase leading-tight text-cream transition-colors group-hover:text-tex-yellow">
                      {r.title}
                    </h3>
                    <p className="mt-1 text-sm text-cream/60">{r.location}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="rounded-full border border-cream/20 px-3 py-1 text-[11px] font-bold uppercase tracking-caps text-cream/70">
                      {r.type}
                    </span>
                    <span className="text-sm text-cream/60">{r.commitment}</span>
                    <span aria-hidden className="text-tex-yellow transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </motion.div>

          <p className="mt-8 text-sm text-cream/50">
            Looking for corporate & support-office roles? They&apos;re listed above alongside
            restaurant vacancies — filter by <span className="text-cream/80">Corporate</span> or{" "}
            <span className="text-cream/80">Support office</span>.
          </p>
        </div>
      </section>

      <CTABand
        eyebrow="Team Texas"
        heading="Your career,"
        accent="hand-crafted."
        body="Don't see the perfect role? Introduce yourself — we're always looking for bold people."
        primary={{ label: "Get in touch", href: "/contact-us" }}
        secondary={{ label: "Meet the leadership", href: "/our-story/leadership" }}
      />
    </>
  );
}
