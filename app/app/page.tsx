"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import FindUs from "@/components/sections/FindUs";
import { appPage } from "@/lib/content";
import { staggerContainer, fadeUp, inView, ease } from "@/lib/motion";

/** App Store + Google Play badges, using the real reference badge images. */
function Badges({ className = "" }: { className?: string }) {
  const b = appPage.badges;
  return (
    <div className={`flex flex-row items-center gap-2 sm:gap-4 ${className}`}>
      <a
        href={b.appStoreHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        data-cursor="link"
        className="transition-transform hover:scale-105"
      >
        <Image src={b.appStore} alt="Download on the App Store" width={200} height={60} className="h-9 w-auto object-contain sm:h-11 lg:h-12" />
      </a>
      <a
        href={b.googlePlayHref}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Get it on Google Play"
        data-cursor="link"
        className="transition-transform hover:scale-105"
      >
        <Image src={b.googlePlay} alt="Get it on Google Play" width={200} height={60} className="h-9 w-auto object-contain sm:h-11 lg:h-12" />
      </a>
    </div>
  );
}

export default function AppPage() {
  const { banner, discover, treat } = appPage;

  return (
    <>
      {/* ---------------- Banner (full-bleed hero image + badges) ---------------- */}
      <section className="relative flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: ease.out }}
          className="w-full"
        >
          <Image
            src={banner.image}
            alt="Satisfy your craving & order fast — download the app now"
            width={1920}
            height={800}
            className="h-auto w-full object-cover object-center"
            priority
          />
        </motion.div>

        <div className="container-tx absolute bottom-3 right-0 w-full sm:bottom-8 sm:w-1/2 lg:bottom-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: ease.out, delay: 0.55 }}
            className="flex justify-center"
          >
            <Badges />
          </motion.div>
        </div>
      </section>

      {/* ---------------- Discover more with the app ---------------- */}
      <section id="features" className="scroll-mt-24 bg-white py-10 md:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-6 text-center md:mb-10">
            <motion.h2
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={inView}
              className="text-3xl font-extrabold uppercase text-third md:text-4xl lg:text-6xl"
            >
              {discover.heading}
            </motion.h2>
          </div>

          <motion.div
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={inView}
            className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-3"
          >
            {discover.features.map((f) => (
              <motion.div
                key={f.title}
                variants={fadeUp}
                className="relative min-h-[168px] overflow-hidden rounded-2xl border border-black/5 bg-primary p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Real animated GIF (unoptimized keeps the animation) */}
                <Image
                  src={f.gif}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width:768px) 100vw, 33vw"
                  className="object-contain object-right"
                />
                <div className="relative z-10 max-w-[62%]">
                  <h3 className="mb-2 text-2xl font-extrabold uppercase text-white">{f.title}</h3>
                  <p className="leading-relaxed text-white">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ---------------- Treat yourself (full-bleed image + badges) ---------------- */}
      <section className="relative">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: ease.out }}
          className="w-full"
        >
          <Image
            src={treat.image}
            alt="Big rewards start with the app"
            width={1899}
            height={669}
            className="h-auto w-full object-cover"
          />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 z-10 w-full sm:bottom-2 md:bottom-6 lg:bottom-10">
          <div className="container-tx">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: ease.out, delay: 0.25 }}
              className="flex gap-2 ps-1"
            >
              <Badges />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Find your nearest store */}
      <FindUs />
    </>
  );
}
