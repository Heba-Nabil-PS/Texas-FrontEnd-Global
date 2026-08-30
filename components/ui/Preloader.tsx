"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ease } from "@/lib/motion";

/**
 * Cinematic preloader — a counter races 0→100 while assets settle, then the
 * curtain lifts and hands off into the hero. Sets the pace for everything after.
 */
export default function Preloader() {
  const [count, setCount] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    const total = 1600;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / total);
      // easeOutExpo
      const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else setTimeout(() => setDone(true), 260);
    };
    raf = requestAnimationFrame(tick);
    // lock scroll while loading
    document.documentElement.classList.add("lenis-stopped");
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (done) document.documentElement.classList.remove("lenis-stopped");
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center bg-ink text-cream"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: ease.expo }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: ease.out }}
            className="eyebrow text-tex-yellow"
          >
            ★ Since 1952
          </motion.div>

          <div className="mt-4 overflow-hidden">
            <motion.span
              className="display block text-[18vw] leading-none text-cream md:text-[12vw]"
              initial={{ y: "110%" }}
              animate={{ y: "0%" }}
              transition={{ duration: 0.8, ease: ease.expo }}
            >
              {count}
              <span className="text-tex-yellow">%</span>
            </motion.span>
          </div>

          <div className="mt-6 h-[2px] w-40 overflow-hidden rounded-full bg-white/15">
            <motion.div
              className="h-full bg-tex-yellow"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: count / 100 }}
              style={{ transformOrigin: "0% 50%" }}
              transition={{ ease: "linear" }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
