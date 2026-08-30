"use client";

import { testimonials } from "@/lib/content";
import Reveal from "@/components/ui/Reveal";
import Marquee from "@/components/ui/Marquee";
import { LinesReveal } from "@/components/ui/TextReveal";

export default function Testimonials() {
  return (
    <section id="testimonials" className="relative overflow-hidden bg-tex-red py-28 text-cream md:py-36">
      <div className="container-tx">
        <div className="max-w-3xl">
          <Reveal>
            <span className="eyebrow text-tex-yellow">★ {testimonials.eyebrow}</span>
          </Reveal>
          <h2 className="display mt-5 text-[10vw] leading-[0.9] md:text-[4.6vw]">
            <LinesReveal lines={["People don't forget", "the crunch."]} lineClassName="block" />
          </h2>
        </div>
      </div>

      {/* Auto-moving testimonial cards */}
      <div className="mt-16 space-y-6">
        <Marquee duration={44}>
          {testimonials.quotes.map((q, i) => (
            <QuoteCard key={i} q={q} />
          ))}
        </Marquee>
        <Marquee duration={52} reverse>
          {[...testimonials.quotes].reverse().map((q, i) => (
            <QuoteCard key={i} q={q} />
          ))}
        </Marquee>
      </div>
    </section>
  );
}

function QuoteCard({ q }: { q: (typeof testimonials.quotes)[number] }) {
  return (
    <div
      data-cursor="hover"
      className="mx-3 flex w-[85vw] shrink-0 flex-col justify-between rounded-3xl bg-cream/[0.06] p-8 backdrop-blur-sm transition-colors duration-300 hover:bg-cream/[0.12] sm:w-[440px]"
    >
      <div className="display text-5xl leading-none text-tex-yellow">&ldquo;</div>
      <p className="mt-2 text-lg leading-relaxed text-cream/90">{q.quote}</p>
      <div className="mt-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-tex-yellow font-extrabold text-ink">
          {q.name.charAt(0)}
        </span>
        <div>
          <div className="font-bold uppercase tracking-wide">{q.name}</div>
          <div className="text-sm text-cream/60">{q.role}</div>
        </div>
      </div>
    </div>
  );
}
