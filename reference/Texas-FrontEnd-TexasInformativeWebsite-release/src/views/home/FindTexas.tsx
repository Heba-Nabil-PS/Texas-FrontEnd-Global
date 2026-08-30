"use client";

import { NextImage } from "@/components/global/next-image";
import { PAGE_PATHS } from "@/constants/page-paths";
import { useRouter } from "@/i18n/navigation";
import { displayInOrder } from "@/lib";
import { domSanitize } from "@/lib/domSanitize";
import { cn } from "@/lib/utils";
import {
  AdvancedContentCategoryMediaProps,
  AdvancedContentCategoryProps,
} from "@/modules/informative/types/advanced-content.types";
import { motion } from "motion/react";

interface FindTexasProps {
  data: AdvancedContentCategoryProps;
  medias: AdvancedContentCategoryMediaProps[] | undefined;
}

export const FindTexas = ({ data, medias }: FindTexasProps) => {
  const router = useRouter();

  const mainImage = medias?.find((item) => item.Prima);
  const pinImages = medias?.filter((item) => !item.Prima) || [];
  const pinsInOrder = displayInOrder(pinImages, "DisplayOrder");

  return (
    <section className="relative overflow-hidden bg-white py-12 md:py-20">
      {mainImage?.ActualImage && (
        <NextImage
          fill
          className="absolute inset-0 h-full w-full object-cover"
          src={mainImage?.ActualImage}
          alt={mainImage?.Alt || mainImage?.Name}
          sizes="100vw"
        />
      )}

      {/* Main content container */}
      <div className="container relative z-10 flex h-full items-center">
        <div className="relative w-full">
          {/* Left-aligned content block */}
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Main headline */}
              <div className="space-y-2">
                {data?.Name?.trim() && (
                  <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                    viewport={{ once: true }}
                    className="font-texas text-5xl font-black uppercase leading-none tracking-tight text-primary md:text-7xl lg:text-8xl"
                  >
                    {data?.Name?.trim()}
                  </motion.h2>
                )}

                {data?.DescriptionShort?.trim() && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
                    viewport={{ once: true }}
                    className="inline-block bg-secondary px-6 py-2"
                  >
                    <span className="font-texas text-4xl font-black uppercase leading-none tracking-tight text-[#2D2926] md:text-6xl lg:text-7xl">
                      {data?.DescriptionShort?.trim()}
                    </span>
                  </motion.div>
                )}
              </div>

              {data?.DescriptionLong?.trim() && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                  viewport={{ once: true }}
                  className="max-w-lg text-xl leading-relaxed text-third md:text-2xl"
                >
                  <div
                    dangerouslySetInnerHTML={{
                      __html: domSanitize(data?.DescriptionLong?.trim()),
                    }}
                  />
                </motion.div>
              )}

              {data?.Source1?.trim() && (
                <motion.button
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
                  viewport={{ once: true }}
                  className="mt-2 transform rounded-full border-none bg-primary px-8 py-2 font-texas text-base font-bold uppercase tracking-wider text-white transition-all duration-300 hover:bg-secondary max-md:mb-3 sm:mt-4 sm:w-auto md:text-lg"
                  onClick={() =>
                    router.push(data?.Link1?.trim() || PAGE_PATHS.LOCATIONS)
                  }
                >
                  {data?.Source1?.trim()}
                </motion.button>
              )}
              {/* Call-to-action button */}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scattered can-like objects with parallax animation */}

      {pinsInOrder?.length > 0 &&
        pinsInOrder?.map((item, index) => (
          <motion.div
            key={item.ID}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={cn(
              "absolute hidden animate-float ease-in-out lg:block",
              index === 0 && "end-[30%] top-1/2 z-10",
              index === 1 && "bottom-36 end-40 z-10",
              index === 2 &&
                "right-[20%] top-32 z-10 transform rtl:left-[20%] rtl:right-auto",
            )}
            animate={{
              y: [0, index === 0 ? -25 : index === 1 ? -18 : -22, 0],
            }}
            transition={{
              opacity: {
                duration: 1,
                ease: "easeOut",
                delay: index === 0 ? 0.8 : index === 1 ? 0.9 : 1,
              },
              y: {
                duration: 1,
                ease: "easeOut",
                delay: index === 0 ? 0.8 : index === 1 ? 0.9 : 1,
              },
            }}
          >
            {item.ActualImage && (
              <NextImage
                width={80}
                height={128}
                className="h-32 w-20 object-contain"
                src={item?.ActualImage}
                alt={item?.Alt || item?.Name}
              />
            )}
          </motion.div>
        ))}
    </section>
  );
};
