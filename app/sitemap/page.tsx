"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import { siteMapGroups } from "@/lib/content";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";

export default function SitemapPage() {
  return (
    <>
      <PageHero
        eyebrow="Sitemap"
        title={["Everything,", "in one place."]}
        subtitle="Every page on the global Texas Chicken site, grouped for quick access. Search engines get the XML feed; you get the friendly version."
      />

      <section className="bg-cream py-20 md:py-28">
        <div className="container-tx grid gap-8 lg:grid-cols-3">
          {siteMapGroups.map((group) => (
            <motion.div
              key={group.title}
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="flex flex-col rounded-3xl border border-ink/10 bg-white p-8"
            >
              <motion.div variants={fadeUp}>
                <span className="eyebrow text-tex-red">
                  <span aria-hidden>★</span> {group.title}
                </span>
                <p className="mt-3 text-sm text-ink-600">{group.desc}</p>
              </motion.div>

              <ul className="mt-6 space-y-1">
                {group.pages.map((p) => (
                  <motion.li key={p.href} variants={fadeUp}>
                    <Link
                      href={p.href}
                      data-cursor="link"
                      className="group flex items-baseline justify-between gap-3 rounded-xl px-3 py-2.5 transition-colors hover:bg-cream"
                    >
                      <span className="font-texas text-lg font-bold text-ink transition-colors group-hover:text-tex-red">
                        {p.name}
                      </span>
                      <span className="text-right text-xs text-ink/40">{p.note}</span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* XML feed note */}
        <div className="container-tx mt-14">
          <div className="flex flex-col items-start justify-between gap-4 rounded-3xl bg-ink px-8 py-7 text-cream sm:flex-row sm:items-center">
            <div>
              <p className="font-texas text-lg font-bold uppercase">Crawling the site?</p>
              <p className="mt-1 text-sm text-cream/60">
                An auto-generated XML feed is available for search engines at{" "}
                <span className="text-tex-yellow">/sitemap.xml</span>.
              </p>
            </div>
            <span className="rounded-full border border-cream/20 px-4 py-2 text-xs font-bold uppercase tracking-caps text-cream/70">
              Generated at build time
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
