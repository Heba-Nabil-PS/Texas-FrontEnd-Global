"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { finalCta } from "@/lib/content";
import { ease } from "@/lib/motion";
import Button from "@/components/ui/Button";
import { WordsReveal } from "@/components/ui/TextReveal";

export default function FinalCTA() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} id="cta" className="relative flex min-h-[100svh] items-center overflow-hidden bg-ink text-cream">
      {/* Cinematic video bg */}
      <motion.div className="absolute inset-0" style={{ scale, y }}>
        <video
          className="h-full w-full object-cover"
          src={finalCta.video}
          poster={finalCta.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
      </motion.div>
      <div className="absolute inset-0 bg-ink/70" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink/60" />

      <div className="container-tx relative z-10 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: ease.out }}
          className="eyebrow justify-center text-tex-yellow"
        >
          ★ {finalCta.eyebrow}
        </motion.span>

        <h2 className="display mx-auto mt-6 max-w-[18ch] text-[13vw] leading-[0.86] md:text-[7vw]">
          <span className="block">
            <WordsReveal text={finalCta.heading} />
          </span>
          <span className="block text-tex-yellow">
            <WordsReveal text={finalCta.headingAccent} />
          </span>
        </h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.out, delay: 0.2 }}
          className="mx-auto mt-7 max-w-xl text-lg text-cream/75"
        >
          {finalCta.body}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: ease.out, delay: 0.32 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <Button href="/find-your-market" variant="yellow">
            {finalCta.ctaPrimary}
          </Button>
          <Button href="/franchising" variant="ghostDark">
            {finalCta.ctaSecondary}
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
