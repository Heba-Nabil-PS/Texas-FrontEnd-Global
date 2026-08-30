"use client";

import { m, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import { NextImage } from "@/components/global/next-image";
import {
  AdvancedContentCategoryMediaProps,
  AdvancedContentCategoryProps,
  MediaTypeEnum,
} from "@/modules/informative/types/advanced-content.types";
import { domSanitize } from "@/lib/domSanitize";
import { displayInOrder } from "@/lib";

interface TexasValuesSectionProps {
  data: AdvancedContentCategoryProps;
  builtOnTexasMediaData: AdvancedContentCategoryMediaProps[] | undefined;
  locale: string;
}

const TexasValuesSection = (props: TexasValuesSectionProps) => {
  const { data, builtOnTexasMediaData, locale } = props;

  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects for image and text
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const textOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.8, 1, 1, 0.9],
  );

  const videos = builtOnTexasMediaData
    ? displayInOrder(builtOnTexasMediaData, "DisplayOrder")?.filter(
        (item) => item.Type === MediaTypeEnum.Video,
      )
    : [];
  const defaultVideos = videos?.filter((item) => item.Prima);
  const arVideos = videos?.filter((item) => !item.Prima);

  const videosToShow =
    locale === "ar"
      ? arVideos?.length > 0
        ? arVideos
        : defaultVideos
      : defaultVideos;

  const defaultBannerImage = data?.ImageUrl;
  const arBannerImage = data?.MediumImage || defaultBannerImage || "";

  return (
    <div ref={sectionRef} className="relative px-4">
      <div className="container relative z-10">
        <div className="grid items-start gap-4 lg:grid-cols-2">
          {/* Text Content */}
          <m.div
            style={{
              y: textY,
              opacity: textOpacity,
            }}
            className="order-2 space-y-8 max-lg:!transform-none lg:order-1 lg:mt-20"
          >
            {data?.Name?.trim() && (
              <m.h2
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="font-texas text-4xl font-extrabold uppercase text-primary md:text-6xl"
              >
                {data?.Name?.trim()}
              </m.h2>
            )}

            {data?.DescriptionLong?.trim() && (
              <m.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="space-y-6"
              >
                <div
                  className="text-third-800/80 text-base leading-relaxed md:text-xl"
                  dangerouslySetInnerHTML={{
                    __html: domSanitize(data?.DescriptionLong?.trim()),
                  }}
                />
              </m.div>
            )}
          </m.div>

          {defaultBannerImage && (
            <m.div
              style={{
                y: imageY,
                scale: scale,
              }}
              className="order-1 space-y-8 max-lg:!transform-none lg:order-2"
            >
              <div className="relative">
                <m.div
                  initial={{ scale: 1.2, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="mx-auto flex max-w-[90%] items-center justify-center max-lg:!transform-none sm:max-w-full"
                >
                  <NextImage
                    src={locale === "ar" ? arBannerImage : defaultBannerImage}
                    alt={data?.ImageAlt || data?.Name}
                    width={700}
                    height={700}
                    className="object-cover"
                    loading="lazy"
                  />
                </m.div>
              </div>
            </m.div>
          )}
        </div>
      </div>

      {/* Section Divider */}
      {/* <div className="absolute bottom-0 left-0 right-0 h-px" /> */}

      {/* Video Grid */}
      {videosToShow?.length > 0 && (
        <div className="mx-auto mt-2 grid max-w-[75%] grid-cols-1 gap-x-3 sm:mt-10 sm:max-w-[90%] md:grid-cols-3 lg:-mt-16">
          {videosToShow?.map((item, index) => (
            <div className="relative overflow-hidden" key={index}>
              <video
                className="size-full max-h-96 object-contain"
                autoPlay
                muted
                loop
                playsInline
                poster={item.ActualImage || ""}
              >
                <source src={item.Video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TexasValuesSection;
