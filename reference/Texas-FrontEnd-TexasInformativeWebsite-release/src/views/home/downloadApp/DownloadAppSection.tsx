"use client";

import { useRef } from "react";
import Script from "next/script";
import { motion, type Variants } from "motion/react";
import { domSanitize } from "@/lib/domSanitize";
import { useData } from "@/components/providers/data-provider";
import { isModuleOn } from "@/lib";
import { STATIC_MODULES } from "@/constants/country-modules";
import { NextImage } from "@/components/global/next-image";
import type {
  AdvancedContentCategoryMediaProps,
  AdvancedContentCategoryProps,
} from "@/modules/informative/types/advanced-content.types";

interface DownloadAppSectionProps {
  downloadAppData: AdvancedContentCategoryProps | undefined;
  downloadAppVideo: AdvancedContentCategoryMediaProps[] | undefined;
  locale: string;
}

const DownloadAppSection = (props: DownloadAppSectionProps) => {
  const { downloadAppData, downloadAppVideo, locale } = props;

  const {
    countryData: { countryModules },
  } = useData();

  const sectionRef = useRef(null);

  const useMobileApp = Boolean(
    isModuleOn(countryModules, STATIC_MODULES.MOBILEAPP),
  );

  if (!useMobileApp) return null;

  // Animation for headline text
  const headlineVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        type: "spring",
      },
    }),
  };

  const defaultVideo =
    downloadAppVideo?.find((item) => item.Prima) || downloadAppVideo?.[0];
  const arVideo =
    downloadAppVideo?.find((item) => !item.Prima) || downloadAppVideo?.[0];

  return (
    <div
      className="relative w-full bg-[#9e3224] md:min-h-screen"
      ref={sectionRef}
    >
      {/* Fullscreen background video */}
      <div className="relative size-full md:min-h-[80vh]">
        {defaultVideo?.Video && (
          <video
            className="h-full w-[100vw] object-cover md:w-full"
            autoPlay
            loop
            muted
            playsInline
          >
            <source
              src={locale === "ar" ? arVideo?.Video : defaultVideo?.Video}
              type="video/mp4"
            />
          </video>
        )}

        {/* Content Container */}
        <div className="inset-0 flex items-center justify-center px-4 py-16 sm:px-6 lg:absolute lg:px-8">
          <div className="max-w-8xl mx-auto w-full">
            <div className="flex flex-col items-center justify-center lg:items-end lg:justify-end 2xl:pe-10">
              <div className="w-full max-w-sm xl:max-w-lg">
                <motion.h2
                  className="mb-4 font-texas text-4xl font-extrabold uppercase leading-tight text-white sm:mb-6 sm:text-5xl md:text-6xl"
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                  variants={headlineVariants}
                >
                  <span className="block">{downloadAppData?.Name}</span>
                  <span className="block">
                    {downloadAppData?.DescriptionShort}
                  </span>
                </motion.h2>

                {downloadAppData?.DescriptionLong?.trim() && (
                  <motion.div
                    className="mb-6 max-w-lg text-base text-white sm:mb-8 sm:text-lg md:text-xl"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.7 }}
                    viewport={{ once: true, amount: 0.5 }}
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: domSanitize(
                          downloadAppData?.DescriptionLong?.trim(),
                        ),
                      }}
                    />
                  </motion.div>
                )}

                <motion.div
                  className="w-full"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.7 }}
                  viewport={{ once: true }}
                >
                  {/* Store Badges */}
                  <div className="mt-6 flex flex-row items-center gap-4">
                    {defaultVideo?.ActualImage && (
                      <a
                        href={downloadAppData?.Link1}
                        target="_blank"
                        aria-label="app store badge"
                        rel="noopener noreferrer"
                      >
                        <NextImage
                          src={defaultVideo?.ActualImage}
                          alt={defaultVideo?.Name}
                          width={160}
                          height={48}
                          className="h-12 w-auto object-contain"
                          priority
                        />
                      </a>
                    )}
                    {defaultVideo?.MediumImage && (
                      <a
                        href={downloadAppData?.Link2!}
                        target="_blank"
                        aria-label="google play badge"
                        rel="noopener noreferrer"
                      >
                        <NextImage
                          src={defaultVideo?.MediumImage}
                          alt={defaultVideo?.Name}
                          width={160}
                          height={48}
                          className="h-12 w-auto object-contain"
                          priority
                        />
                      </a>
                    )}
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Script type="application/ld+json" id="download-app-video">
        {`
      {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "Download App",
        "description": "A video showcasing the story of Texas Chicken.",
        "thumbnailUrl": [
          "/images/download-app.jpg"
        ],
        "uploadDate": "2023-01-01",
        "duration": "PT1M30S",
        "contentUrl": "/images/download-app.mp4",
        "videoQuality": "HD",
        "contentRating": "General",
        "interactionCount": "100000"
      }
      `}
      </Script>
    </div>
  );
};

export default DownloadAppSection;
