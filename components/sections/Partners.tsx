"use client";

import Image from "next/image";
import { partners } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";

export default function Partners() {
  return (
    <section id="partners" className="bg-cream py-24 md:py-32">
      <div className="container-tx text-center">
        <Reveal>
          <span className="eyebrow text-tex-red">★ {partners.eyebrow}</span>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="display mx-auto mt-4 max-w-2xl text-[8vw] leading-[0.92] text-ink md:text-[3.4vw]">
            {partners.heading}
          </h2>
        </Reveal>

        {/* Badges */}
        <div className="mt-14 flex flex-wrap items-center justify-center gap-10 md:gap-16">
          {partners.badges.map((b, i) => (
            <Reveal key={b} delay={i * 0.08}>
              <div
                data-cursor="hover"
                className="relative h-20 w-28 opacity-70 grayscale transition-all duration-300 hover:opacity-100 hover:grayscale-0 md:h-24 md:w-36"
              >
                <Image src={b} alt="Industry award" fill className="object-contain" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Markets marquee */}
      <div className="mt-16 border-y border-ink/10 py-8">
        <Marquee duration={30}>
          {partners.markets.map((m) => (
            <span key={m} className="flex items-center" data-cursor="hover">
              <span className="display text-4xl uppercase text-ink/25 transition-colors duration-300 hover:text-tex-red md:text-6xl">
                {m}
              </span>
              <span className="mx-7 text-3xl text-tex-yellow md:mx-9 md:text-5xl">★</span>
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  );
}
