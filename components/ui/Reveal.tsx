"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, inView } from "@/lib/motion";

/** Generic in-view reveal wrapper (fade + rise + blur→sharp by default). */
export default function Reveal({
  children,
  variants = fadeUp,
  className,
  as = "div",
  amount,
  delay = 0,
}: {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  as?: "div" | "section" | "li" | "span";
  amount?: number;
  delay?: number;
}) {
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ ...inView, amount: amount ?? inView.amount }}
      transition={{ delay }}
    >
      {children}
    </MotionTag>
  );
}
