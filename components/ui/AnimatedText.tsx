"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * Per-letter reveal — letters flip up + fade in on a stagger when scrolled into
 * view. The showpiece "text skill" ported from the reference site's
 * AnimatedSubHeading, reworked in framer-motion with a 3D flip.
 */
export function LettersReveal({
  text,
  className,
  letterClassName,
  stagger = 0.028,
  delay = 0,
  once = true,
}: {
  text: string;
  className?: string;
  letterClassName?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
}) {
  const letters = Array.from(text);
  return (
    <motion.span
      className={className}
      style={{ display: "inline-block", perspective: 600 }}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.5 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
      aria-label={text}
    >
      {letters.map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`inline-block ${letterClassName ?? ""}`}
          style={{ transformOrigin: "bottom", transformStyle: "preserve-3d" }}
          variants={{
            hidden: { y: "0.55em", opacity: 0, rotateX: -75 },
            show: {
              y: 0,
              opacity: 1,
              rotateX: 0,
              transition: { duration: 0.55, ease: ease.out },
            },
          }}
        >
          {ch === " " ? " " : ch}
        </motion.span>
      ))}
    </motion.span>
  );
}

/**
 * Character-scramble style shimmer heading — each word rises with a slight
 * blur→sharp. Lighter than LettersReveal, good for long headings.
 */
export function CharsRise({
  text,
  className,
  once = true,
}: {
  text: string;
  className?: string;
  once?: boolean;
}) {
  return (
    <motion.span
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount: 0.4 }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04 } } }}
      aria-label={text}
    >
      {text.split(" ").map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            aria-hidden
            className="inline-block"
            variants={{
              hidden: { y: "110%", filter: "blur(6px)", opacity: 0 },
              show: {
                y: "0%",
                filter: "blur(0px)",
                opacity: 1,
                transition: { duration: 0.7, ease: ease.expo },
              },
            }}
          >
            {word}
            {i < text.split(" ").length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
