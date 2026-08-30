"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { CharsRise } from "@/components/ui/AnimatedText";
import { fadeUp, inView } from "@/lib/motion";

/** Reusable closing call-to-action band, shared across inner pages. */
export default function CTABand({
  eyebrow,
  heading,
  accent,
  body,
  primary,
  secondary,
  tone = "red",
  video,
}: {
  eyebrow: string;
  heading: string;
  accent?: string;
  body?: string;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
  tone?: "red" | "ink";
  video?: string;
}) {
  const bg = tone === "red" ? "bg-tex-red" : "bg-ink";
  return (
    <section className={`relative overflow-hidden ${bg} py-24 text-cream md:py-36`}>
      {video && (
        <>
          <video
            className="absolute inset-0 h-full w-full object-cover"
            src={video}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-ink/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />
        </>
      )}
      <div className="pointer-events-none absolute -right-24 -top-24 h-[32rem] w-[32rem] rounded-full bg-tex-yellow/15 blur-[120px]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-overlay"
        style={{ backgroundImage: "url(/assets/tex-grunge.png)", backgroundSize: "480px" }}
      />
      <div className="container-tx relative text-center">
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="eyebrow justify-center text-tex-yellow"
        >
          <span aria-hidden>★</span> {eyebrow}
        </motion.span>

        <h2 className="display mx-auto mt-5 max-w-[16ch] text-5xl uppercase leading-[0.92] md:text-7xl">
          <CharsRise text={heading} className="block" />
          {accent && <CharsRise text={accent} className="block text-tex-yellow" />}
        </h2>

        {body && (
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            transition={{ delay: 0.1 }}
            className="mx-auto mt-6 max-w-xl text-base text-cream/75 md:text-lg"
          >
            {body}
          </motion.p>
        )}

        <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
          <Button href={primary.href} variant="yellow">
            {primary.label}
          </Button>
          {secondary && (
            <Button href={secondary.href} variant="ghostDark">
              {secondary.label}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
