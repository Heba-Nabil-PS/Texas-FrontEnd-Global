"use client";

import { motion } from "framer-motion";
import { lineMaskParent, lineMaskChild, wordChild, inView, ease } from "@/lib/motion";

/**
 * Masked line/word reveal. Each line clips its content; the content slides up
 * from below — the eye only ever sees clean motion. Pass an array of lines,
 * or a single string split by words.
 */
export function LinesReveal({
  lines,
  className,
  lineClassName,
  delay = 0,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  delay?: number;
}) {
  return (
    <motion.span
      className={className}
      variants={lineMaskParent}
      initial="hidden"
      whileInView="show"
      viewport={inView}
      transition={{ delayChildren: delay }}
    >
      {lines.map((line, i) => (
        <span key={i} className="line-clip">
          <motion.span className={lineClassName} variants={lineMaskChild} style={{ display: "block" }}>
            {line}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}

export function WordsReveal({
  text,
  className,
  wordClassName,
  once = true,
}: {
  text: string;
  className?: string;
  wordClassName?: string;
  once?: boolean;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      variants={{ show: { transition: { staggerChildren: 0.045 } } }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.4 }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className={`inline-block ${wordClassName ?? ""}`}
            variants={wordChild}
            transition={{ duration: 0.7, ease: ease.expo }}
          >
            {w}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
