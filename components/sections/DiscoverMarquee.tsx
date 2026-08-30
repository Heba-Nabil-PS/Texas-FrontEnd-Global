"use client";

import Marquee from "@/components/ui/Marquee";
import { discover } from "@/lib/content";

/**
 * Full-bleed brand-word marquee. Two counter-scrolling rows of oversized words
 * with star separators — a loud, kinetic divider between chapters of the page.
 */
export default function DiscoverMarquee() {
  const row = (words: string[]) => (
    <div className="flex items-center">
      {words.map((w) => (
        <span key={w} className="flex items-center">
          <span className="display px-6 text-[9vw] uppercase leading-none md:text-[7vw]">{w}</span>
          <span className="text-tex-yellow px-2 text-[5vw] md:text-[3.5vw]">★</span>
        </span>
      ))}
    </div>
  );

  return (
    <section className="relative overflow-hidden bg-tex-red py-10 text-cream md:py-14">
      <Marquee duration={38} className="text-cream">
        {row(discover.words)}
      </Marquee>
      <Marquee duration={44} reverse className="mt-2 text-cream/40">
        {row([...discover.words].reverse())}
      </Marquee>
    </section>
  );
}
