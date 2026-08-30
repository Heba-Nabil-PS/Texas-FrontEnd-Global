import type { Variants, Transition } from "framer-motion";

/**
 * Texas motion system
 * Premium, consistent easing + reusable variants. Import these everywhere so the
 * whole homepage speaks one motion language (see colors_and_type.css eases).
 */

// Signature eases (cubic-bezier control points)
export const ease = {
  out: [0.22, 1, 0.36, 1] as const, // slow-out settle
  inOut: [0.65, 0, 0.35, 1] as const, // cinematic
  pop: [0.34, 1.56, 0.64, 1] as const, // satisfying overshoot
  expo: [0.16, 1, 0.3, 1] as const, // long, expensive glide
};

export const dur = {
  fast: 0.35,
  base: 0.6,
  slow: 0.9,
  xslow: 1.2,
};

// Base spring for magnetic / cursor
export const spring: Transition = { type: "spring", stiffness: 150, damping: 20, mass: 0.6 };
export const softSpring: Transition = { type: "spring", stiffness: 90, damping: 18, mass: 0.9 };

/* ----------------------------- Variants ----------------------------- */

// Container that staggers its children in
export const staggerContainer = (stagger = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: {
    transition: { staggerChildren: stagger, delayChildren: delay },
  },
});

// Fade + rise (with a whisper of blur → sharp)
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 34, filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: dur.slow, ease: ease.out },
  },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: dur.slow, ease: ease.out } },
};

export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 1.12 },
  show: { opacity: 1, scale: 1, transition: { duration: dur.xslow, ease: ease.expo } },
};

// Line-mask reveal: the parent clips, the child slides up from below
export const lineMaskParent: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

export const lineMaskChild: Variants = {
  hidden: { y: "110%" },
  show: { y: "0%", transition: { duration: dur.slow, ease: ease.expo } },
};

// Word-by-word reveal
export const wordChild: Variants = {
  hidden: { y: "120%", opacity: 0 },
  show: { y: "0%", opacity: 1, transition: { duration: 0.7, ease: ease.expo } },
};

// Clip-path image reveal (wipe up)
export const clipReveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)", scale: 1.15 },
  show: {
    clipPath: "inset(0% 0% 0% 0%)",
    scale: 1,
    transition: { duration: dur.xslow, ease: ease.expo },
  },
};

// Standard viewport trigger config
export const inView = { once: true, amount: 0.3 } as const;
export const inViewSoft = { once: true, amount: 0.2 } as const;
