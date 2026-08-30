"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Stats from "@/components/ui/Stats";
import Marquee from "@/components/ui/Marquee";
import InteractiveTimeline from "@/components/ui/InteractiveTimeline";
import { WordsReveal, LinesReveal } from "@/components/ui/TextReveal";
import CTABand from "@/components/sections/CTABand";
import { storyPage, leadershipPage } from "@/lib/content";
import { staggerContainer, fadeUp, inView, ease } from "@/lib/motion";

function RecipeMarquee() {
  return (
    <div className="overflow-hidden border-b border-ink/10 bg-cream py-6 md:py-8">
      <Marquee duration={30}>
        {Array.from({ length: 4 }).map((_, i) => (
          <span key={i} className="flex items-center">
            <span className="display px-6 text-[8vw] uppercase leading-none text-ink/90 md:text-[3.4vw]">
              Same recipe since 1952
            </span>
            <span className="px-4 text-[6vw] text-tex-red md:text-[2.6vw]">★</span>
          </span>
        ))}
      </Marquee>
    </div>
  );
}

export default function StoryPage() {
  return (
    <>
      <PageHero
        eyebrow={storyPage.hero.eyebrow}
        title={storyPage.hero.title}
        subtitle={storyPage.hero.subtitle}
      >
        <Button href="/menu" variant="yellow">
          Taste the legacy
        </Button>
        <Button href="#leadership" variant="ghostDark">
          Meet the team
        </Button>
      </PageHero>

      {/* Animated words — right under the hero */}
      <RecipeMarquee />

      {/* 1 — Heritage & founding (with By-the-numbers merged in) */}
      <Heritage />

      {/* Story in motion — the brand film */}
      <StoryFilm />

      {/* Mission & vision */}
      <MissionVision />

      {/* Timeline */}
      <Timeline />

      {/* Leadership team (sub-page) */}
      <LeadershipTeaser />

      {/* Awards & recognition */}
      <Awards />

      <CTABand
        eyebrow="Be part of the story"
        heading="70 years in."
        accent="Just getting warmed up."
        body="Taste the recipe that started it all — or help us write the next chapter in your market."
        primary={{ label: "Explore the menu", href: "/menu" }}
        secondary={{ label: "Franchise with us", href: "/franchising" }}
        tone="ink"
        video="/assets/home/hero-reference.mp4"
      />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* 1 — Heritage & founding — scroll-linked parallax image + slide copy  */
/* ------------------------------------------------------------------ */
function Heritage() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.15, 1, 1.05]);
  const numbersScale = useTransform(scrollYProgress, [0.2, 0.85], [0.94, 1]);
  const { heritage } = storyPage;

  return (
    <section ref={ref} className="overflow-hidden bg-cream py-24 md:py-32">
      <div className="container-tx grid items-start gap-14 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={inView}
          transition={{ duration: 0.9, ease: ease.out }}
        >
          <span className="eyebrow text-tex-red">
            <span aria-hidden>★</span> {heritage.eyebrow}
          </span>
          <h2 className="display mt-5 uppercase leading-[0.9] text-ink" style={{ fontSize: "clamp(34px, 5.5vw, 76px)" }}>
            <WordsReveal text={heritage.heading} />
          </h2>
          <motion.div
            variants={staggerContainer(0.14)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-7 max-w-xl space-y-4 border-l-2 border-tex-red/20 pl-6"
          >
            {heritage.body.map((p, i) => (
              <motion.p key={i} variants={fadeUp} className="leading-relaxed text-ink-600 md:text-lg">
                {p}
              </motion.p>
            ))}
          </motion.div>

          {/* By the numbers — merged directly under the text */}
          <div className="mt-12">
            <span className="eyebrow text-tex-red">
              <span aria-hidden>★</span> {storyPage.numbers.eyebrow}
            </span>
            <motion.div style={{ scale: numbersScale }} className="mt-6">
              <Stats stats={storyPage.numbers.stats} cols={2} />
            </motion.div>
          </div>
        </motion.div>

        {/* Parallax portrait */}
        <div className="relative aspect-[4/5] overflow-hidden rounded-3xl bg-ink shadow-pop">
          <motion.div style={{ y: imageY, scale: imageScale }} className="absolute inset-0">
            <Image src={heritage.image} alt="Texas Chicken heritage" fill sizes="(max-width:1024px) 90vw, 45vw" className="object-cover" />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={inView}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="eyebrow absolute bottom-6 left-6 text-tex-yellow"
          >
            {heritage.place}
          </motion.span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Story in motion — full-width brand film                             */
/* ------------------------------------------------------------------ */
function StoryFilm() {
  return (
    <section className="bg-cream pb-12 md:pb-16">
      <div className="container-tx">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, ease: ease.out }}
        >
          <video
            className="block aspect-[1536/530] w-full object-cover mix-blend-multiply"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            poster="/assets/story/heritage-chicken.jpg"
          >
            <source src="/assets/story/story-film.mp4" type="video/mp4" />
          </video>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Mission & vision — reference story-page layout                       */
/* Structure mirrors the reference MissionVisionSection: two-column      */
/* grid, rounded blocks, the OUR MISSION / OUR VISION title graphic,     */
/* then a text-xl body paragraph.                                        */
/* ------------------------------------------------------------------ */
function MissionVision() {
  const { missionVision } = storyPage;
  return (
    <section className="relative bg-cream px-4 py-12 md:py-16">
      <div className="container-tx md:px-6">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          {missionVision.items.map((item) => (
            <motion.div
              key={item.alt}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="relative rounded-2xl"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={item.titleImage} alt={item.alt} className="mb-5 h-24 w-auto sm:h-28 md:h-32" />
              <p className="text-xl leading-relaxed text-ink-600">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Interactive timeline                                                */
/* ------------------------------------------------------------------ */
function Timeline() {
  return (
    <section className="relative overflow-hidden bg-cream-200 py-24 md:py-32">
      <div className="container-tx">
        <div className="mx-auto max-w-5xl">
          <div className="text-center">
            <SectionHeading align="center" eyebrow="The timeline" heading="From one stand to the world." className="mx-auto" />
          </div>
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-12"
          >
            <InteractiveTimeline items={storyPage.timeline} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 4 — Leadership team teaser (links to the sub-page)                  */
/* ------------------------------------------------------------------ */
function LeadershipTeaser() {
  const { leadership } = storyPage;
  return (
    <section id="leadership" className="scroll-mt-24 bg-ink py-24 text-cream md:py-32">
      <div className="container-tx grid items-center gap-14 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <span className="eyebrow text-tex-yellow">
            <span aria-hidden>★</span> {leadership.eyebrow}
          </span>
          <h2 className="display mt-5 uppercase leading-[0.92]" style={{ fontSize: "clamp(32px, 5vw, 66px)" }}>
            <LinesReveal lines={["Operators first.", "Brand-builders always."]} lineClassName="block" />
          </h2>
          <motion.p variants={fadeUp} initial="hidden" whileInView="show" viewport={inView} className="mt-6 max-w-lg leading-relaxed text-cream/70 md:text-lg">
            {leadership.body}
          </motion.p>
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={inView} className="mt-8">
            <Button href={leadership.ctaHref} variant="yellow">
              {leadership.cta}
            </Button>
          </motion.div>
        </div>

        {/* Monogram avatar preview */}
        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3"
        >
          {leadershipPage.execs.slice(0, 6).map((e) => (
            <motion.div
              key={e.name}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-cream/10 bg-cream/[0.03] p-5 text-center"
            >
              <span className="relative size-20 overflow-hidden rounded-full ring-2 ring-cream/10 transition-all duration-300 group-hover:ring-tex-yellow">
                <Image
                  src={e.image}
                  alt={e.name}
                  fill
                  sizes="80px"
                  className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                />
              </span>
              <div>
                <p className="font-texas text-sm font-bold text-cream">{e.name}</p>
                <p className="text-[11px] font-bold uppercase tracking-caps text-cream/60">{e.role}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* 5 — Awards & recognition                                            */
/* ------------------------------------------------------------------ */
function Awards() {
  const { awards } = storyPage;
  return (
    <section className="overflow-hidden bg-cream-200 py-24 md:py-32">
      <div className="container-tx">
        <SectionHeading align="center" eyebrow={awards.eyebrow} heading={awards.heading} className="mx-auto" />
        <motion.div
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid gap-8 sm:grid-cols-3"
        >
          {awards.items.map((a) => (
            <motion.div
              key={a.title}
              variants={fadeUp}
              whileHover={{ y: -8, rotate: -1 }}
              transition={{ type: "spring", stiffness: 300, damping: 18 }}
              className="flex flex-col items-center gap-5 rounded-3xl border border-ink/10 bg-cream p-8 text-center"
            >
              <Image src={a.src} alt={`${a.title} — ${a.org}`} width={140} height={140} className="h-28 w-auto object-contain" />
              <div>
                <h3 className="display text-xl uppercase text-ink">{a.title}</h3>
                <p className="mt-1 text-xs font-bold uppercase tracking-caps text-ink/50">{a.org}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
