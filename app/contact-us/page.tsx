"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import PageHero from "@/components/ui/PageHero";
import Button from "@/components/ui/Button";
import { contactPage, site } from "@/lib/content";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";

export default function ContactPage() {
  const [subject, setSubject] = useState(contactPage.form.subjects[0]);

  return (
    <>
      <PageHero
        eyebrow={contactPage.hero.eyebrow}
        title={contactPage.hero.title}
        subtitle={contactPage.hero.subtitle}
        accentFrom={0}
      />

      <section className="bg-cream py-24 md:py-32">
        <div className="container-tx grid gap-14 lg:grid-cols-[0.9fr_1.1fr]">
          {/* Channels + HQ */}
          <div>
            <motion.div
              variants={staggerContainer(0.08)}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="grid gap-4 sm:grid-cols-2"
            >
              {contactPage.channels.map((c) => (
                <motion.a
                  key={c.title}
                  variants={fadeUp}
                  href={`mailto:${c.value}`}
                  data-cursor="link"
                  className="group flex flex-col rounded-3xl border border-ink/10 bg-paper p-6 transition-colors hover:border-tex-red"
                >
                  <span className="text-xs font-bold uppercase tracking-caps text-tex-red">{c.title}</span>
                  <span className="mt-2 break-words text-sm font-bold text-ink transition-colors group-hover:text-tex-red">
                    {c.value}
                  </span>
                  <span className="mt-1 text-xs text-ink-400">{c.note}</span>
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="mt-6 rounded-3xl bg-ink p-8 text-cream"
            >
              <span className="eyebrow text-tex-yellow">
                <span aria-hidden>★</span> {contactPage.hq.label}
              </span>
              <div className="mt-4 space-y-1">
                {contactPage.hq.lines.map((l) => (
                  <p key={l} className="text-sm text-cream/80">{l}</p>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1 border-t border-cream/10 pt-4 text-xs uppercase tracking-caps text-cream/40">
                {site.markets.slice(0, 6).map((m) => (
                  <span key={m}>{m}</span>
                ))}
                <span className="text-tex-yellow">+ more</span>
              </div>
            </motion.div>
          </div>

          {/* Form */}
          <motion.form
            variants={staggerContainer(0.06)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            onSubmit={(e) => e.preventDefault()}
            className="rounded-3xl border border-ink/10 bg-paper p-8 shadow-soft3 md:p-10"
          >
            <motion.h2 variants={fadeUp} className="display text-3xl uppercase text-ink md:text-4xl">
              {contactPage.form.heading}
            </motion.h2>

            <motion.div variants={fadeUp} className="mt-6 flex flex-wrap gap-2">
              {contactPage.form.subjects.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSubject(s)}
                  data-cursor="link"
                  className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-caps transition-colors ${
                    subject === s
                      ? "bg-tex-red text-cream"
                      : "border border-ink/15 text-ink-600 hover:border-tex-red"
                  }`}
                >
                  {s}
                </button>
              ))}
            </motion.div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Field label="Full name" placeholder="Jane Doe" />
              <Field label="Email" type="email" placeholder="jane@email.com" />
            </div>
            <motion.label variants={fadeUp} className="mt-5 block">
              <span className="text-xs font-bold uppercase tracking-caps text-ink-600">Message</span>
              <textarea
                rows={5}
                placeholder="How can we help?"
                className="mt-2 w-full resize-none rounded-2xl border border-ink/15 bg-cream px-4 py-3 text-sm text-ink placeholder:text-ink-400 focus:border-tex-red focus:outline-none"
              />
            </motion.label>

            <motion.div variants={fadeUp} className="mt-7">
              <Button href="#" variant="red" className="w-full">
                Send message
              </Button>
            </motion.div>
            <motion.p variants={fadeUp} className="mt-4 text-center text-xs text-ink-400">
              Regarding: <span className="font-bold text-ink">{subject}</span>
            </motion.p>
          </motion.form>
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
