"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import PageHero from "@/components/ui/PageHero";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Stats from "@/components/ui/Stats";
import Marquee from "@/components/ui/Marquee";
import FranchiseTabs from "@/components/sections/FranchiseTabs";
import { franchisePage } from "@/lib/content";
import { staggerContainer, fadeUp } from "@/lib/motion";

export default function FranchisingPage() {
  return (
    <>
      <PageHero
        eyebrow={franchisePage.hero.eyebrow}
        title={franchisePage.hero.title}
      >
        <Button href="#apply-form" variant="yellow" pulse>
          Start your application
        </Button>
      </PageHero>

      {/* Proof — the figures that justify the rest of the page */}
      <section className="bg-cream-200 pb-16 pt-0 md:pb-20">
        <div className="container-tx">
          <div className="-mt-14 md:-mt-20">
            <Stats stats={franchisePage.proof} />
          </div>
        </div>
      </section>

      {/* The four source pages, tabbed */}
      <FranchiseTabs />

      {/* Marquee */}
      <section className="overflow-hidden bg-tex-yellow py-6 text-ink">
        <Marquee duration={28}>
          <span className="flex items-center">
            <span className="display px-6 text-3xl uppercase md:text-4xl">
              Proven · Crave-worthy · Global
            </span>
            <span className="px-3 text-2xl">★</span>
          </span>
        </Marquee>
      </section>

      {/* The path + the application, read as one move: the four steps explain
          what happens after you send the form sitting right next to them. */}
      <section
        id="apply"
        className="relative overflow-hidden bg-ink py-24 text-cream md:py-32"
      >
        {/* Photographic ground instead of flat black; the overlay keeps the
            cream copy and the form legible on top of it. */}
        <Image
          src="/assets/story/heritage-chicken.jpg"
          alt=""
          aria-hidden
          fill
          sizes="100vw"
          className="pointer-events-none select-none object-cover"
        />
        <div className="pointer-events-none absolute inset-0 bg-ink/40" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-ink/90 via-ink/20 to-ink/90" />

        <div className="pointer-events-none absolute -right-24 top-10 h-[30rem] w-[30rem] rounded-full bg-tex-red/25 blur-[120px]" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-[26rem] w-[26rem] rounded-full bg-tex-yellow/10 blur-[120px]" />

        <div className="container-tx relative grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:gap-20">
          {/* ---- the four steps, stacked into a timeline ---- */}
          <div className="lg:sticky lg:top-40">
            <SectionHeading onDark eyebrow="The path" heading="Four steps to open." />
            <motion.ol
              variants={staggerContainer(0.12)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: "some" }}
              className="mt-12 flex flex-col gap-9"
            >
              {franchisePage.steps.map((s, i) => (
                <motion.li key={s.n} variants={fadeUp} className="relative flex gap-5">
                  {/* the rail joining one step to the next */}
                  {i < franchisePage.steps.length - 1 && (
                    <span className="absolute left-6 top-14 h-[calc(100%+0.5rem)] w-px bg-cream/15" />
                  )}
                  <span className="display grid size-12 shrink-0 place-items-center rounded-full border border-tex-yellow/40 bg-ink text-lg text-tex-yellow">
                    {s.n}
                  </span>
                  <div className="pt-1.5">
                    <h3 className="display text-xl uppercase text-cream">{s.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-cream/70">{s.desc}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ol>
          </div>

          {/* ---- the application ---- */}
          <div>
            <SectionHeading
              onDark
              eyebrow="Get started"
              heading="Ready to make a bold move?"
              body="Share a few details and our development team will be in touch."
            />
            <motion.form
              id="apply-form"
              variants={staggerContainer(0.06)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: "some" }}
              onSubmit={(e) => e.preventDefault()}
              /* HashScroll targets this id directly, so the CTAs land ON the
                 form — on mobile #apply would only reach the four steps. */
              className="mt-10 grid gap-5 rounded-3xl border border-cream/10 bg-paper p-8 md:p-10"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Full name" placeholder="Jane Doe" />
                <Field label="Email" type="email" placeholder="jane@company.com" />
                <Field label="Country / market" placeholder="e.g. Egypt" />
                <Field label="Investment capacity" placeholder="Select range" />
              </div>
              <motion.label variants={fadeUp} className="block">
                <span className="text-xs font-bold uppercase tracking-caps text-ink-600">
                  Tell us more
                </span>
                <textarea
                  rows={4}
                  placeholder="Your experience, target territory, timeline…"
                  className="mt-2 w-full resize-none rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-400 focus:border-tex-red focus:outline-none"
                />
              </motion.label>
              <motion.div variants={fadeUp} className="flex justify-center pt-2">
                <Button type="submit" variant="red">
                  Submit application
                </Button>
              </motion.div>
            </motion.form>

            <p className="mt-6 text-xs uppercase tracking-caps text-cream/40">
              This website is not an offer of a franchise.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder?: string;
  type?: string;
}) {
  return (
    <motion.label variants={fadeUp} className="block">
      <span className="text-xs font-bold uppercase tracking-caps text-ink-600">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        className="mt-2 w-full rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-400 focus:border-tex-red focus:outline-none"
      />
    </motion.label>
  );
}
