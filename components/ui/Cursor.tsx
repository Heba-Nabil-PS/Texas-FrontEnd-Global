"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring, AnimatePresence } from "framer-motion";

/**
 * Custom cursor with magnetic hover states.
 * Morphs into a larger ring over interactive elements ([data-cursor]).
 */
export default function Cursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  const [hovering, setHovering] = useState<null | string>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Only enable on fine-pointer devices
    const mq = window.matchMedia("(hover: hover) and (pointer: fine)");
    if (!mq.matches) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      setHovering(el ? el.getAttribute("data-cursor") || "hover" : null);
    };
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  const isLabel = hovering && hovering !== "hover" && hovering !== "link";

  return (
    <>
      {/* Dot */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-tex-yellow mix-blend-difference"
        style={{ x: sx, y: sy }}
      />
      {/* Ring */}
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9998] flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-tex-yellow text-[11px] font-bold uppercase tracking-caps text-tex-yellow mix-blend-difference"
        style={{ x, y }}
        animate={{
          width: isLabel ? 88 : hovering ? 56 : 36,
          height: isLabel ? 88 : hovering ? 56 : 36,
          opacity: 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
      >
        <AnimatePresence mode="wait">
          {isLabel && (
            <motion.span
              key={hovering}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
            >
              {hovering}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
