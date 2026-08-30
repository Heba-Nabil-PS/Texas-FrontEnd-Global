import type { Variants } from "motion/react";

// Animation for direction variant
export const directionVariants = {
  initial: {
    x: 0,
  },

  exit: {
    x: 0,
    y: 0,
  },
  top: {
    y: 20,
  },
  bottom: {
    y: -20,
  },
  left: {
    x: 20,
  },
  right: {
    x: -20,
  },
};

// Animation for text variant
export const textVariants = {
  initial: {
    y: 0,
    x: 0,
  },
  exit: {
    y: 0,
    x: 0,
  },
  top: {
    y: -10,
    opacity: 1,
  },
  bottom: {
    y: 5,
    opacity: 1,
  },
  left: {
    x: 10,
    opacity: 1,
  },
  right: {
    x: -5,
    opacity: 1,
  },
};

// Animation for subheading container
export const subheadingContainer: Variants = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.04 * i },
  }),
};

// Animation subheading for each word
export const child: Variants = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
  hidden: {
    opacity: 0,
    x: 20,
    transition: {
      type: "spring",
      damping: 12,
      stiffness: 100,
    },
  },
};
