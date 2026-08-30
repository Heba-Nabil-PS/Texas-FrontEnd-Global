"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Tilt from "@/components/ui/Tilt";
import CTABand from "@/components/sections/CTABand";
import { leadershipPage } from "@/lib/content";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";

export default function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow={leadershipPage.hero.eyebrow}
        title={leadershipPage.hero.title}
        subtitle={leadershipPage.hero.subtitle}
      >
        <Button href="/our-story" variant="yellow">
          Our story
        </Button>
        <Button href="/franchising" variant="ghostDark">
          Partner with us
        </Button>
      </PageHero>

      {/* Intro + executive bios */}
      <section className="bg-cream py-20 md:py-28">
        <div className="container-tx">
          <SectionHeading
            eyebrow="Leadership"
            heading={leadershipPage.intro.heading}
            body={leadershipPage.intro.body}
          />

          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {leadershipPage.execs.map((e) => (
              <motion.div key={e.name} variants={fadeUp}>
                <Tilt max={6} glare={false} className="h-full">
                  <article className="group flex h-full flex-col rounded-3xl border border-ink/10 bg-white p-7 transition-colors hover:border-tex-red/40">
                    <div className="flex items-center gap-4">
                      <span className="relative size-16 shrink-0 overflow-hidden rounded-full ring-2 ring-ink/10 transition-all group-hover:ring-tex-red/50">
                        <Image
                          src={e.image}
                          alt={e.name}
                          fill
                          sizes="64px"
                          className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0"
                        />
                      </span>
                      <div>
                        <h3 className="display text-xl uppercase leading-tight text-ink">{e.name}</h3>
                        <p className="text-xs font-bold uppercase tracking-caps text-tex-red">{e.role}</p>
                      </div>
                    </div>
                    <p className="mt-5 leading-relaxed text-ink-600">{e.bio}</p>
                  </article>
                </Tilt>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Press landing point */}
      <section className="bg-ink py-16 text-cream md:py-20">
        <div className="container-tx flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-xl">
            <span className="eyebrow text-tex-yellow">
              <span aria-hidden>★</span> Press
            </span>
            <h2 className="display mt-4 text-3xl uppercase leading-[0.95] md:text-4xl">
              {leadershipPage.press.heading}
            </h2>
            <p className="mt-4 leading-relaxed text-cream/70">{leadershipPage.press.body}</p>
          </div>
          <a
            href={`mailto:${leadershipPage.press.email}`}
            data-cursor="link"
            className="inline-flex items-center gap-2 rounded-full bg-tex-yellow px-8 py-4 text-sm font-extrabold uppercase tracking-caps text-ink transition-colors hover:bg-tex-yellow600"
          >
            {leadershipPage.press.email}
          </a>
        </div>
      </section>

      <CTABand
        eyebrow="Seventy-two years, one craft"
        heading="Bold brands."
        accent="Bigger vision."
        body="Meet the team building the global future of Texas Chicken."
        primary={{ label: "Explore franchising", href: "/franchising" }}
        secondary={{ label: "Get in touch", href: "/contact-us" }}
      />
    </>
  );
}
