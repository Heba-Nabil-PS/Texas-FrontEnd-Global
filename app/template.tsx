"use client";

import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * Route template — remounts on every navigation, giving each page a clean
 * rise-and-fade entrance. Pairs with the persistent Nav/Footer in the layout.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: ease.out }}
    >
      {children}
    </motion.main>
  );
}
