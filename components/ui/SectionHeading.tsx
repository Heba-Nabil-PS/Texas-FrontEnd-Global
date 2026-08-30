"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { WordsReveal } from "./TextReveal";
import { fadeUp, inView } from "@/lib/motion";

/**
 * Standard section heading: animated eyebrow + word-reveal headline + optional
 * body. Keeps every section speaking the same motion language.
 */
export default function SectionHeading({
  eyebrow,
  heading,
  body,
  align = "left",
  onDark = false,
  className,
  children,
}: {
  eyebrow?: string;
  heading: string;
  body?: string;
  align?: "left" | "center";
  onDark?: boolean;
  className?: string;
  children?: ReactNode;
}) {
  const alignCls = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";
  return (
    <div className={`flex max-w-3xl flex-col ${alignCls} ${className ?? ""}`}>
      {eyebrow && (
        <motion.span
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className={`eyebrow ${onDark ? "text-tex-yellow" : "text-tex-red"}`}
        >
          <span aria-hidden>★</span> {eyebrow}
        </motion.span>
      )}
      <WordsReveal
        text={heading}
        className={`display mt-4 text-4xl uppercase leading-[0.95] sm:text-5xl md:text-6xl ${
          onDark ? "text-cream" : "text-ink"
        }`}
      />
      {body && (
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          transition={{ delay: 0.1 }}
          className={`mt-5 max-w-xl text-base leading-relaxed md:text-lg ${
            onDark ? "text-cream/70" : "text-ink-600"
          }`}
        >
          {body}
        </motion.p>
      )}
      {children}
    </div>
  );
}
