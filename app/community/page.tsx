"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Parallax from "@/components/ui/Parallax";
import CTABand from "@/components/sections/CTABand";
import { communityPage } from "@/lib/content";
import { staggerContainer, fadeUp, inView, clipReveal } from "@/lib/motion";

export default function CommunityPage() {
  return (
    <>
      <PageHero
        eyebrow={communityPage.hero.eyebrow}
        title={communityPage.hero.title}
        subtitle={communityPage.hero.subtitle}
      >
        <Button href="/our-story" variant="yellow">
          Our story
        </Button>
        <Button href="/contact-us" variant="ghostDark">
          Partner with us
        </Button>
      </PageHero>

      {/* Pillars */}
      <section className="bg-cream py-24 md:py-32">
        <div className="container-tx">
          <SectionHeading
            eyebrow="Our commitments"
            heading="Four ways we give back."
            body="Every restaurant is a local business — run by local people, for a local community."
          />
          <motion.div
            variants={staggerContainer(0.1)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
            {communityPage.pillars.map((p) => (
              <motion.div
                key={p.title}
                variants={fadeUp}
                className="group flex flex-col rounded-3xl bg-ink p-8 text-cream transition-transform duration-300 hover:-translate-y-1.5"
              >
                <span className="display text-5xl text-tex-yellow">{p.stat}</span>
                <span className="mt-1 text-xs font-bold uppercase tracking-caps text-cream/50">
                  {p.statLabel}
                </span>
                <h3 className="display mt-6 text-xl uppercase text-cream">{p.title}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cream/70">{p.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Initiatives — alternating rows */}
      <section className="bg-cream-200 py-24 md:py-32">
        <div className="container-tx">
          <SectionHeading
            eyebrow="On the ground"
            heading="Programs, not press releases."
          />
          <div className="mt-16 space-y-20 md:space-y-28">
            {communityPage.initiatives.map((it, i) => (
              <div
                key={it.title}
                className="grid items-center gap-10 md:grid-cols-2 md:gap-16"
              >
                <Parallax
                  speed={30}
                  className={i % 2 === 1 ? "md:order-2" : ""}
                >
                  <motion.div
                    variants={clipReveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={inView}
                    className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-ink shadow-pop"
                  >
                    <Image
                      src={it.image}
                      alt={it.title}
                      fill
                      sizes="(max-width: 768px) 90vw, 45vw"
                      className="object-cover"
                    />
                  </motion.div>
                </Parallax>

                <motion.div
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={inView}
                  className={i % 2 === 1 ? "md:order-1" : ""}
                >
                  <span className="display text-6xl text-tex-red/20">0{i + 1}</span>
                  <h3 className="display mt-3 text-3xl uppercase text-ink md:text-4xl">{it.title}</h3>
                  <p className="mt-4 max-w-lg text-base leading-relaxed text-ink-600">{it.desc}</p>
                </motion.div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pull quote */}
      <section className="bg-tex-red py-24 text-cream md:py-32">
        <div className="container-tx text-center">
          <span className="display mx-auto block max-w-[18ch] text-3xl uppercase leading-tight md:text-5xl">
            &ldquo;Feed people well and treat your neighbours right. Everything else follows.&rdquo;
          </span>
          <span className="mt-6 block eyebrow justify-center text-tex-yellow">
            The Texas Chicken way
          </span>
        </div>
      </section>

      <CTABand
        eyebrow="Want to help?"
        heading="Good crunch."
        accent="Greater good."
        body="Careers, partnerships, or community programs — let's do something good together."
        primary={{ label: "Get in touch", href: "/contact-us" }}
        secondary={{ label: "Explore careers", href: "/careers" }}
        tone="ink"
      />
    </>
  );
}
