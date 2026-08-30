"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Tilt from "@/components/ui/Tilt";
import { WordsReveal } from "@/components/ui/TextReveal";
import CTABand from "@/components/sections/CTABand";
import { newsPage } from "@/lib/content";
import { staggerContainer, fadeUp, inView, inViewSoft, clipReveal, ease } from "@/lib/motion";

const ALL = "All";

const MotionLink = motion.create(Link);

/** Small arrow used on every "read" affordance. */
function OutArrow() {
  return (
    <span
      aria-hidden
      className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
    >
      ↗
    </span>
  );
}

/** Arrow for links that stay on the site. */
function InArrow() {
  return (
    <span
      aria-hidden
      className="transition-transform duration-300 ease-out group-hover:translate-x-1"
    >
      →
    </span>
  );
}

export default function NewsPage() {
  const [filter, setFilter] = useState<string>(ALL);

  const chips = useMemo(() => [ALL, ...newsPage.categories], []);

  const articles = useMemo(
    () =>
      filter === ALL
        ? newsPage.articles
        : newsPage.articles.filter((a) => a.category === filter),
    [filter],
  );

  // The featured card is our own heritage story, so only the grid counts as releases.
  const total = newsPage.articles.length;

  // Featured may point at an internal route (heritage) or an outbound release.
  const featuredIsInternal = newsPage.featured.href.startsWith("/");
  const FeaturedCard = featuredIsInternal ? MotionLink : motion.a;

  return (
    <>
      <PageHero
        eyebrow={newsPage.hero.eyebrow}
        title={newsPage.hero.title}
        subtitle={newsPage.hero.subtitle}
      >
        <motion.a
          href={newsPage.source.href}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6, ease: ease.out }}
          data-cursor="link"
          className="group mt-8 inline-flex items-center gap-2 rounded-full border border-cream/25 px-5 py-2.5 text-xs font-bold uppercase tracking-caps text-cream/70 transition-colors hover:border-tex-yellow hover:text-tex-yellow"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-tex-yellow" />
          {total} releases · {newsPage.source.label}
          <OutArrow />
        </motion.a>
      </PageHero>

      {/* ---------------------------------------------------------------- */}
      {/* Featured release                                                  */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-tx">
          <FeaturedCard
            href={newsPage.featured.href}
            {...(featuredIsInternal
              ? {}
              : { target: "_blank", rel: "noopener noreferrer" })}
            data-cursor="view"
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="group grid items-stretch gap-0 overflow-hidden rounded-[2rem] border border-ink/10 bg-paper shadow-soft3 transition-shadow duration-500 hover:shadow-pop md:grid-cols-2"
          >
            <motion.div
              variants={clipReveal}
              className="relative aspect-[16/11] overflow-hidden bg-ink md:aspect-auto md:h-full md:min-h-[26rem]"
            >
              <Image
                src={newsPage.featured.image}
                alt={newsPage.featured.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent" />
              <span className="absolute left-5 top-5 rounded-full bg-tex-red px-4 py-1.5 text-xs font-bold uppercase tracking-caps text-cream">
                {newsPage.featured.tag}
              </span>
            </motion.div>

            <div className="flex flex-col justify-center p-8 md:p-12 lg:p-14">
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-full bg-ink/5 px-3 py-1 text-xs font-bold uppercase tracking-caps text-ink-600">
                  {newsPage.featured.category}
                </span>
                <span className="text-xs font-bold uppercase tracking-caps text-ink-400">
                  {newsPage.featured.date}
                </span>
              </div>

              <WordsReveal
                text={newsPage.featured.title}
                className="display mt-4 block text-2xl uppercase leading-tight text-ink transition-colors duration-300 group-hover:text-tex-red md:text-[2rem] lg:text-4xl"
              />

              {/* Two-line summary */}
              <motion.p
                variants={fadeUp}
                className="mt-5 line-clamp-3 max-w-xl text-base leading-relaxed text-ink-600 md:line-clamp-2"
              >
                {newsPage.featured.excerpt}
              </motion.p>

              <motion.span
                variants={fadeUp}
                className="mt-8 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-caps text-tex-red"
              >
                {newsPage.featured.cta ?? "Read the release"}{" "}
                {featuredIsInternal ? <InArrow /> : <OutArrow />}
              </motion.span>
            </div>
          </FeaturedCard>
        </div>
      </section>

      {/* ---------------------------------------------------------------- */}
      {/* Filterable archive                                                */}
      {/* ---------------------------------------------------------------- */}
      <section className="bg-cream-200 py-24 md:py-32">
        <div className="container-tx">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading eyebrow="Archive" heading="More from the press room." />
            <span className="text-sm font-bold uppercase tracking-caps text-ink-400">
              {articles.length} {articles.length === 1 ? "story" : "stories"}
            </span>
          </div>

          {/* Category chips */}
          <motion.div
            variants={staggerContainer(0.05)}
            initial="hidden"
            whileInView="show"
            viewport={inViewSoft}
            className="mt-10 flex flex-wrap gap-3"
          >
            {chips.map((c) => {
              const active = c === filter;
              return (
                <motion.button
                  key={c}
                  variants={fadeUp}
                  type="button"
                  onClick={() => setFilter(c)}
                  aria-pressed={active}
                  data-cursor="link"
                  className={`relative rounded-full px-5 py-2.5 text-xs font-extrabold uppercase tracking-caps transition-colors duration-300 ${
                    active ? "text-cream" : "text-ink-600 hover:text-ink"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="news-chip"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      className="absolute inset-0 rounded-full bg-tex-red"
                    />
                  )}
                  <span
                    className={`absolute inset-0 rounded-full border transition-colors duration-300 ${
                      active ? "border-transparent" : "border-ink/15"
                    }`}
                  />
                  <span className="relative">{c}</span>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Cards — generous gutters so each release breathes */}
          <motion.div
            layout
            className="mt-14 grid gap-8 sm:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {articles.map((a) => (
                <motion.div
                  key={a.href}
                  layout
                  initial={{ opacity: 0, y: 28 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.94 }}
                  transition={{ duration: 0.5, ease: ease.out }}
                >
                  <Tilt max={6} glare={false} className="h-full">
                    <a
                      href={a.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      data-cursor="view"
                      className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-ink/10 bg-paper shadow-soft3 transition-shadow duration-500 hover:shadow-pop"
                    >
                      <div className="relative aspect-[16/10] overflow-hidden bg-ink">
                        <Image
                          src={a.image}
                          alt={a.title}
                          fill
                          sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 30vw"
                          className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-ink/45 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                        <span className="absolute left-4 top-4 rounded-full bg-ink/80 px-3 py-1 text-xs font-bold uppercase tracking-caps text-tex-yellow backdrop-blur">
                          {a.category}
                        </span>
                      </div>

                      <div className="flex flex-1 flex-col p-7">
                        <span className="text-xs font-bold uppercase tracking-caps text-ink-400">
                          {a.date}
                        </span>

                        <h3 className="display mt-2 line-clamp-3 text-xl uppercase leading-tight text-ink transition-colors duration-300 group-hover:text-tex-red">
                          {a.title}
                        </h3>

                        {/* Two-line description */}
                        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-ink-600">
                          {a.excerpt}
                        </p>

                        <span className="mt-auto inline-flex items-center gap-2 border-t border-ink/10 pt-4 text-sm font-extrabold uppercase tracking-caps text-tex-red">
                          Read release <OutArrow />
                        </span>
                      </div>
                    </a>
                  </Tilt>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {articles.length === 0 && (
            <p className="mt-16 text-center text-ink-600">
              No releases in this category yet.
            </p>
          )}
        </div>
      </section>

      <CTABand
        eyebrow="Never miss a drop"
        heading="Get the crunch"
        accent="in your inbox."
        body="New menu items, restaurant openings and market news — straight to you."
        primary={{ label: "Contact the newsroom", href: "/contact-us" }}
        secondary={{ label: "Back to home", href: "/" }}
        tone="ink"
      />
    </>
  );
}
