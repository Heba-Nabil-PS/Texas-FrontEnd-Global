"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import Button from "@/components/ui/Button";
import Tilt from "@/components/ui/Tilt";
import Parallax from "@/components/ui/Parallax";
import { downloadApp } from "@/lib/content";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";

export default function DownloadApp() {
  return (
    <section className="relative overflow-hidden bg-ink py-24 text-cream md:py-32">
      <div className="pointer-events-none absolute -left-32 top-1/3 h-[36rem] w-[36rem] rounded-full bg-tex-red/25 blur-[130px]" />
      <div className="pointer-events-none absolute -right-20 bottom-0 h-[30rem] w-[30rem] rounded-full bg-tex-yellow/10 blur-[120px]" />

      <div className="container-tx relative grid items-center gap-14 lg:grid-cols-2">
        <div>
          <SectionHeading
            eyebrow={downloadApp.eyebrow}
            heading={downloadApp.heading}
            body={downloadApp.body}
            onDark
          />

          <motion.ul
            variants={staggerContainer(0.09)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="mt-8 grid gap-3 sm:grid-cols-2"
          >
            {downloadApp.points.map((p) => (
              <motion.li key={p} variants={fadeUp} className="flex items-center gap-3 text-cream/80">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-tex-yellow text-xs text-ink">
                  ★
                </span>
                <span className="text-sm">{p}</span>
              </motion.li>
            ))}
          </motion.ul>

          <div className="mt-9 flex flex-wrap gap-4">
            <Button href="/menu" variant="yellow">
              Get the app
            </Button>
            <Button href="/find-your-market" variant="ghostDark">
              Find a restaurant
            </Button>
          </div>
        </div>

        {/* Phone-ish showpiece */}
        <Parallax speed={30} className="mx-auto w-full max-w-md">
          <Tilt max={14} className="relative aspect-[4/5] w-full">
            <div className="absolute inset-0 overflow-hidden rounded-[2.2rem] border border-cream/10 bg-ink-800 shadow-pop">
              <Image
                src={downloadApp.image}
                alt="Texas Chicken app"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 90vw, 40vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-ink/70 p-4 backdrop-blur-md">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-caps text-tex-yellow">Rewards</span>
                  <span className="text-xs text-cream/60">1,250 pts</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-cream/15">
                  <div className="h-full w-3/4 rounded-full bg-tex-yellow" />
                </div>
                <p className="mt-2 text-xs text-cream/70">250 pts to a free biscuit 🍯</p>
              </div>
            </div>
          </Tilt>
        </Parallax>
      </div>
    </section>
  );
}
