"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { newAtTexas } from "@/lib/content";
import { WordsReveal } from "@/components/ui/TextReveal";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";

export default function NewAtTexas() {
  const trackRef = useRef<HTMLDivElement>(null);

  const scrollByCards = (dir: number) => {
    const el = trackRef.current;
    if (!el) return;
    const card = el.querySelector<HTMLElement>("[data-card]");
    const amount = card ? card.offsetWidth + 20 : el.clientWidth * 0.8;
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  return (
    <section className="overflow-hidden bg-third py-20 text-cream md:py-28">
      <div className="container-tx">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <h2 className="display text-4xl uppercase leading-[0.95] sm:text-5xl md:text-6xl">
              <WordsReveal text={newAtTexas.heading[0]} className="block text-cream" />
              <WordsReveal text={newAtTexas.heading[1]} className="block text-secondary" />
            </h2>
            <motion.p
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              transition={{ delay: 0.1 }}
              className="mt-5 text-base leading-relaxed text-cream/70 md:text-lg"
            >
              {newAtTexas.body}
            </motion.p>
          </div>
        </div>
      </div>

      {/* Track */}
      <motion.div
        ref={trackRef}
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={inView}
        className="mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-pl-6 px-6 pb-4 [scrollbar-width:none] md:scroll-pl-14 md:px-14 [&::-webkit-scrollbar]:hidden"
      >
        {newAtTexas.items.map((item) => (
          <motion.article
            key={item.title}
            data-card
            variants={fadeUp}
            className="group relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-ink sm:w-[46vw] lg:w-[30vw] xl:w-[26vw]"
          >
            <Image
              src={item.image}
              alt={item.title}
              fill
              sizes="(max-width: 640px) 78vw, (max-width: 1024px) 46vw, 26vw"
              className="object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/10 to-transparent opacity-90" />
            <div className="absolute inset-x-0 bottom-0 p-6">
              <span className="eyebrow text-secondary">{item.tag}</span>
              <h3 className="display mt-1 text-2xl uppercase text-cream md:text-3xl">{item.title}</h3>
            </div>
          </motion.article>
        ))}
      </motion.div>

      {/* Controls */}
      <div className="container-tx mt-6 flex justify-end gap-3">
        <CarouselButton dir={-1} onClick={() => scrollByCards(-1)} label="Previous" />
        <CarouselButton dir={1} onClick={() => scrollByCards(1)} label="Next" />
      </div>
    </section>
  );
}

function CarouselButton({ dir, onClick, label }: { dir: number; onClick: () => void; label: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      data-cursor="link"
      className="flex size-12 items-center justify-center rounded-full border border-cream/25 text-cream transition-colors hover:border-secondary hover:bg-secondary hover:text-ink"
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        {dir < 0 ? <path d="m15 18-6-6 6-6" /> : <path d="m9 18 6-6-6-6" />}
      </svg>
    </button>
  );
}
