"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { featured } from "@/lib/content";
import { LinesReveal } from "@/components/ui/TextReveal";
import Reveal from "@/components/ui/Reveal";

/**
 * What's new (LTOs).
 * - Mobile: a native swipe carousel (no scroll-jacking) so every card + the
 *   CTA are reachable with a thumb.
 * - Desktop: a pinned horizontal gallery driven by vertical scroll, with travel
 *   measured from the real track width so the last card always clears.
 */
export default function Featured() {
  return (
    <>
      {/* Mobile — native swipe carousel */}
      <section id="featured" className="bg-cream py-16 md:hidden">
        <Heading />
        <div className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {featured.items.map((item) => (
            <FeaturedCard key={item.title} item={item} />
          ))}
          <EndCard />
        </div>
      </section>

      {/* Desktop — pinned horizontal scroll */}
      <FeaturedPinned />
    </>
  );
}

function Heading() {
  return (
    <div className="container-tx">
      <Reveal>
        <span className="eyebrow text-tex-red">★ {featured.eyebrow}</span>
      </Reveal>
      <h2 className="display mt-4 text-[12vw] leading-[0.88] text-ink md:text-[6vw]">
        <LinesReveal lines={[featured.heading]} lineClassName="block" />
      </h2>
    </div>
  );
}

function FeaturedPinned() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [travel, setTravel] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () =>
      setTravel(Math.max(0, track.scrollWidth - window.innerWidth + 40));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -travel]);

  return (
    <section
      ref={sectionRef}
      className="relative hidden bg-cream md:block"
      style={{ height: `calc(100svh + ${travel}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col overflow-hidden">
        <div className="pt-24 md:pt-28">
          <Heading />
        </div>
        <motion.div
          ref={trackRef}
          style={{ x, willChange: "transform" }}
          className="mt-8 flex flex-1 items-center gap-8 pb-12 pl-[5vw]"
        >
          {featured.items.map((item) => (
            <FeaturedCard key={item.title} item={item} />
          ))}
          <EndCard />
        </motion.div>
      </div>
    </section>
  );
}

function FeaturedCard({ item }: { item: (typeof featured.items)[number] }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="group relative aspect-square w-[82vw] max-w-[440px] shrink-0 snap-center overflow-hidden rounded-[28px] bg-ink shadow-pop md:h-[58vh] md:w-auto md:max-w-none"
    >
      <Image
        src={item.image}
        alt={item.title}
        fill
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
        sizes="(max-width: 768px) 82vw, 58vh"
      />
    </motion.article>
  );
}

function EndCard() {
  return (
    <Link
      href="/menu"
      data-cursor="link"
      className="group flex aspect-square w-[82vw] max-w-[440px] shrink-0 snap-center flex-col items-center justify-center gap-5 rounded-[28px] bg-tex-red text-cream md:h-[58vh] md:w-auto md:max-w-none"
    >
      <span className="display text-center text-4xl leading-[0.9]">
        See the
        <br />
        full menu
      </span>
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-tex-yellow text-2xl text-ink transition-transform duration-300 group-hover:scale-110">
        →
      </span>
    </Link>
  );
}
