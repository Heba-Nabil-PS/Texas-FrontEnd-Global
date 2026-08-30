"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Thin brand-yellow progress bar pinned to the top of the viewport. */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <motion.div
      className="fixed left-0 top-0 z-[9997] h-[3px] w-full origin-left bg-tex-yellow"
      style={{ scaleX }}
    />
  );
}
