"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { appPage } from "@/lib/content";
import { ease } from "@/lib/motion";

/** "Find your nearest store" — light street-map bg, headline, CTA and floating pins. */
export default function FindUs() {
  const { findUs } = appPage;

  return (
    <section className="relative overflow-hidden bg-white py-14 md:py-24">
      <Image
        src={findUs.map}
        alt=""
        fill
        className="absolute inset-0 h-full w-full object-cover"
        sizes="100vw"
      />

      <div className="container-tx relative z-10 flex items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: ease.out }}
          className="max-w-2xl space-y-6"
        >
          <div className="space-y-2">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: ease.out, delay: 0.2 }}
              className="font-texas text-5xl font-black uppercase leading-none tracking-tight text-primary md:text-7xl lg:text-8xl"
            >
              {findUs.title}
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: ease.out, delay: 0.3 }}
              className="inline-block bg-secondary px-6 py-2"
            >
              <span className="font-texas text-4xl font-black uppercase leading-none tracking-tight text-third md:text-6xl lg:text-7xl">
                {findUs.highlight}
              </span>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: ease.out, delay: 0.4 }}
            className="max-w-lg text-xl leading-relaxed text-third md:text-2xl"
          >
            {findUs.body}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: ease.out, delay: 0.5 }}
          >
            <Link
              href={findUs.ctaHref}
              data-cursor="link"
              className="inline-block rounded-full bg-primary px-8 py-2.5 font-texas text-base font-bold uppercase tracking-wider text-white transition-colors duration-300 hover:bg-secondary hover:text-third md:text-lg"
            >
              {findUs.cta}
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating map pins */}
      {findUs.pins.map((p) => (
        <motion.div
          key={p.src}
          className={`absolute z-10 hidden lg:block ${p.pos}`}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: ease.out, delay: p.delay }}
        >
          <motion.div
            animate={{ y: [0, p.amp, 0] }}
            transition={{ duration: p.dur, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          >
            <Image src={p.src} alt="" width={80} height={128} className="h-32 w-20 object-contain drop-shadow-lg" />
          </motion.div>
        </motion.div>
      ))}
    </section>
  );
}
