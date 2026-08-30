"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

/**
 * Horizontal gallery.
 * - Mobile: a plain native horizontal scroll row (swipeable, no scroll-jacking).
 * - Desktop: a pinned section — while it's pinned, vertical scroll is translated
 *   into horizontal travel of the track, measured from real content width.
 */
export default function HorizontalScroll({
  children,
  header,
  className,
}: {
  children: ReactNode;
  header?: ReactNode;
  className?: string;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => {
      const overflow = track.scrollWidth - window.innerWidth;
      setTravel(Math.max(0, overflow + 32)); // +gutter so the last card fully clears
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [children]);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <>
      {/* Mobile — native horizontal scroll */}
      <section className={`py-12 md:hidden ${className ?? ""}`}>
        {header}
        <div className="flex gap-5 overflow-x-auto px-6 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {children}
        </div>
      </section>

      {/* Desktop — pinned scroll-jack */}
      <section
        ref={sectionRef}
        className={`hidden md:block ${className ?? ""}`}
        style={{ height: `calc(100svh + ${travel}px)` }}
      >
        <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
          {header}
          <motion.div
            ref={trackRef}
            style={{ x, willChange: "transform" }}
            className="flex gap-5 px-6 md:gap-7 md:px-14"
          >
            {children}
          </motion.div>
        </div>
      </section>
    </>
  );
}
