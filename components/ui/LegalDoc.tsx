"use client";

import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { fadeUp, inView } from "@/lib/motion";

type LegalSection = { id: string; title: string; body: string[] };

/**
 * Shared layout for legal / policy pages (Privacy, Terms). Cinematic hero,
 * a sticky table of contents and a readable prose column — so utility pages
 * still feel part of the same production.
 */
export default function LegalDoc({
  hero,
  updated,
  sections,
}: {
  hero: { eyebrow: string; title: string[]; subtitle?: string };
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <PageHero eyebrow={hero.eyebrow} title={hero.title} subtitle={hero.subtitle} />

      <section className="bg-cream py-20 md:py-28">
        <div className="container-tx grid gap-12 lg:grid-cols-[240px_1fr]">
          {/* Table of contents */}
          <aside className="lg:sticky lg:top-32 lg:self-start">
            <p className="text-xs font-bold uppercase tracking-caps text-ink/40">{updated}</p>
            <nav className="mt-5 flex flex-col gap-2.5 border-l-2 border-ink/10 pl-4">
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  data-cursor="link"
                  className="text-sm text-ink-600 transition-colors hover:text-tex-red"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          {/* Prose */}
          <div className="max-w-2xl space-y-12">
            {sections.map((s) => (
              <motion.div
                key={s.id}
                id={s.id}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={inView}
                className="scroll-mt-32"
              >
                <h2 className="display text-2xl uppercase leading-tight text-ink md:text-3xl">
                  {s.title}
                </h2>
                <div className="mt-4 space-y-4">
                  {s.body.map((p, i) => (
                    <p key={i} className="leading-relaxed text-ink-600">
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
