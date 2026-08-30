"use client";

import { NextImage } from "@/components/global/next-image";
import { NextLink } from "@/components/global/next-link";
import { domSanitize } from "@/lib/domSanitize";
import {
  AdvancedContentCategoryMediaProps,
  AdvancedContentCategoryProps,
} from "@/modules/informative/types/advanced-content.types";
import { motion } from "motion/react";

interface FindOurStoreProps {
  locationsSectionData: AdvancedContentCategoryProps;
  mapBg: AdvancedContentCategoryMediaProps | undefined;
}

export const FindOurStore = ({
  locationsSectionData,
  mapBg,
}: FindOurStoreProps) => {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>

      <section className="relative overflow-hidden bg-primary py-12 md:py-20">
        {mapBg?.ActualImage && (
          <NextImage
            fill
            className="absolute inset-0 h-full w-full object-cover"
            src={mapBg?.ActualImage}
            alt={mapBg?.Alt || mapBg?.Name}
            sizes="100vw"
          />
        )}

        {/* Main content container */}
        <div className="container relative z-10 flex h-full items-center">
          <div className="relative w-full">
            {/* Left-aligned content block */}
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                {/* Main headline */}
                <div className="space-y-2">
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="font-texas text-5xl font-black leading-none tracking-tight text-[#F5F5F5] md:text-7xl lg:text-8xl"
                  >
                    {locationsSectionData?.Name}
                  </motion.h2>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                    className="inline-block bg-secondary px-6 py-2"
                  >
                    <span className="font-texas text-4xl font-black leading-none tracking-tight text-[#2D2926] md:text-6xl lg:text-7xl">
                      {locationsSectionData?.DescriptionShort}
                    </span>
                  </motion.div>
                </div>

                {locationsSectionData?.DescriptionLong?.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                    viewport={{ once: true }}
                    className="max-w-lg text-xl leading-relaxed text-[#F5F5F5] md:text-2xl"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: domSanitize(
                          locationsSectionData?.DescriptionLong?.trim(),
                        ),
                      }}
                    />
                  </motion.div>
                )}
                {locationsSectionData?.Source1 && (
                  <motion.button
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                    viewport={{ once: true }}
                    className="mt-2 transform rounded-full border-none bg-white px-8 py-2 font-texas text-base font-extrabold uppercase tracking-wider text-third transition-all duration-300 hover:bg-secondary max-md:mb-3 sm:mt-4 sm:w-auto md:text-lg"
                  >
                    <NextLink href="/locations">
                      {locationsSectionData?.Source1}
                    </NextLink>
                  </motion.button>
                )}
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scattered can-like objects with parallax animation */}

        {locationsSectionData?.ImageUrl && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute top-1/2 z-10 hidden lg:block ltr:right-[40%] rtl:left-[40%]"
            animate={{
              y: [0, -25, 0],
            }}
            transition={{
              opacity: { duration: 1, ease: "easeOut", delay: 0.8 },
              y: { duration: 1, ease: "easeOut", delay: 0.8 },
            }}
            style={{
              animation: "float 3.5s ease-in-out infinite",
            }}
          >
            <NextImage
              width={80}
              height={128}
              className="h-32 w-20 object-contain"
              src={locationsSectionData?.ImageUrl}
              alt={locationsSectionData?.ImageAlt || locationsSectionData?.Name}
            />
          </motion.div>
        )}

        {locationsSectionData?.MediumImage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute bottom-36 z-10 hidden lg:block ltr:right-52 rtl:left-52"
            animate={{
              y: [0, -18, 0],
            }}
            transition={{
              opacity: { duration: 1, ease: "easeOut", delay: 0.9 },
              y: { duration: 1, ease: "easeOut", delay: 0.9 },
            }}
            style={{
              animation: "float 2.8s ease-in-out infinite",
            }}
          >
            <NextImage
              width={80}
              height={128}
              className="h-32 w-20 object-contain"
              src={locationsSectionData?.MediumImage}
              alt={locationsSectionData?.ImageAlt || locationsSectionData?.Name}
            />
          </motion.div>
        )}

        {locationsSectionData?.ThumbnailImage && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="absolute top-32 z-10 hidden -translate-x-1/2 transform lg:block ltr:left-2/3 rtl:right-2/3"
            animate={{
              y: [0, -22, 0],
            }}
            transition={{
              opacity: { duration: 1, ease: "easeOut", delay: 1.0 },
              y: { duration: 1, ease: "easeOut", delay: 1.0 },
            }}
            style={{
              animation: "float 3.2s ease-in-out infinite",
            }}
          >
            <NextImage
              width={80}
              height={128}
              className="h-32 w-20 object-contain"
              src={locationsSectionData?.ThumbnailImage}
              alt={locationsSectionData?.ImageAlt || locationsSectionData?.Name}
            />
          </motion.div>
        )}
      </section>
    </>
  );
};
