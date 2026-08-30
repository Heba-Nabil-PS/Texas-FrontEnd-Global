"use client";

import { useRef } from "react";
import { m } from "motion/react";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import { NextImage } from "@/components/global/next-image";
import { domSanitize } from "@/lib/domSanitize";

interface AllStorySectionProps {
  locale: string;
  revisitingTraditionalCraftsmanshipData:
    | AdvancedContentCategoryProps
    | undefined;
}

const CommunitySection = ({
  locale,
  revisitingTraditionalCraftsmanshipData,
}: AllStorySectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const defaultImage = revisitingTraditionalCraftsmanshipData?.ImageUrl;
  const arImage =
    revisitingTraditionalCraftsmanshipData?.MediumImage || defaultImage || "";

  return (
    <section
      ref={containerRef}
      className="relative overflow-hidden bg-white px-4 lg:mt-4"
    >
      <div className="relative flex h-full flex-col items-center lg:flex-row">
        {/* Image side - Left */}
        {defaultImage && (
          <m.div className="relative order-2 h-full w-full self-end lg:order-1 lg:w-1/2">
            <NextImage
              width={1200}
              height={630}
              src={locale === "ar" ? arImage : defaultImage}
              alt={revisitingTraditionalCraftsmanshipData?.ImageAlt || ""}
              className="h-full w-full max-w-lg object-cover max-md:!relative"
            />
          </m.div>
        )}

        {/* Content side - Right */}
        <div className="relative order-1 h-full w-full px-6 py-10 lg:order-2 lg:w-1/2 lg:px-16 lg:py-20">
          {/* Content */}
          <div
            ref={contentRef}
            className="relative z-20 flex h-full items-center"
          >
            <m.div className="w-full max-w-2xl">
              {/* Enhanced heading */}
              <m.h2
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 1,
                  ease: [0.25, 0.46, 0.45, 0.94],
                  delay: 0.2,
                }}
                viewport={{ once: true }}
                className="font-texas text-4xl font-black uppercase leading-none tracking-tight md:text-5xl lg:text-5xl"
              >
                <span className="relative inline-block text-third">
                  {revisitingTraditionalCraftsmanshipData?.Name}
                </span>
              </m.h2>

              {/* Enhanced description */}
              {revisitingTraditionalCraftsmanshipData?.DescriptionLong?.trim() && (
                <m.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeOut",
                    delay: 0.4,
                  }}
                  viewport={{ once: true }}
                  className="mt-8"
                >
                  <div
                    className="text-lg leading-relaxed text-third md:text-xl"
                    dangerouslySetInnerHTML={{
                      __html: domSanitize(
                        revisitingTraditionalCraftsmanshipData?.DescriptionLong?.trim(),
                      ),
                    }}
                  />
                </m.div>
              )}
            </m.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
