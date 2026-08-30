"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";

/**
 * Lenis smooth scrolling — the single biggest "premium" tell.
 * Eased inertia scroll that makes every scroll-linked animation feel weighted.
 */
export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.09,
        duration: 1.2,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.6,
        // easeOutExpo
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      {children}
    </ReactLenis>
  );
}
