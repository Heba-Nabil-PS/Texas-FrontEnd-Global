"use client";

import { motion } from "motion/react";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { NextImage } from "@/components/global/next-image";
import { useConfig } from "@/components/providers/config-provider";
import { PAGE_PATHS } from "@/constants/page-paths";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import type { CareerPageResourcesProps } from "@/types/resources";
import { MailIcon } from "lucide-react";
import { domSanitize } from "@/lib/domSanitize";

interface CareerEmailViewProps {
  locale: string;
  resources: CareerPageResourcesProps;
  headerCareers: AdvancedContentCategoryProps | undefined;
}

export function CareerEmailView(props: CareerEmailViewProps) {
  const { resources, headerCareers, locale } = props;
  const { careerEmail } = useConfig();

  const defaultBannerImage = headerCareers?.ImageUrl;
  const arBannerImage = headerCareers?.MediumImage || defaultBannerImage || "";

  return (
    <section className="min-h-screen bg-white pt-16 lg:py-28">
      {/* Breadcrumb */}
      <div className="relative z-10 mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { href: PAGE_PATHS.HOME, name: resources["Home"] },
            { href: PAGE_PATHS.CAREER, name: resources["careers"] },
          ]}
        />
      </div>

      {/* Hero Section */}
      {defaultBannerImage && (
        <div className="relative mt-4 flex w-full items-center justify-center overflow-hidden">
          <motion.div
            className="relative aspect-video max-h-[480px] w-[90%] max-w-6xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <NextImage
              src={locale === "ar" ? arBannerImage : defaultBannerImage}
              alt={headerCareers.ImageAlt || ""}
              fill
              className="rounded-[50px] object-cover"
              priority
            />
          </motion.div>
        </div>
      )}
      {careerEmail?.trim() && (
        <div className="container my-8">
          <div className="mx-auto max-w-7xl">
            {headerCareers?.DescriptionLong?.trim() && (
              <div
                dangerouslySetInnerHTML={{
                  __html: domSanitize(headerCareers.DescriptionLong?.trim()),
                }}
                className="ltr:[&_sup]:!me-[5px] ltr:[&_sup]:lg:!ms-[10px]"
              />
            )}

            <div className="text-third-800/80 mb-4 text-center text-xl font-extrabold">
              {headerCareers?.Source1}
            </div>
            <div className="flex flex-wrap justify-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                viewport={{ once: true }}
                className="mx-2 mb-2 w-full cursor-pointer rounded-xl border-2 border-primary p-6 text-center transition-colors duration-300 hover:bg-secondary hover:text-white hover:shadow-lg md:w-2/5"
              >
                <div className="flex items-center justify-center gap-2">
                  <MailIcon className="size-5 text-primary" />
                  <a href={`mailto:${careerEmail?.trim()}`}>
                    {careerEmail?.trim()}
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export const serverClasses =
  "!font-normal md:!ms-4 mb-4 text-center font-texas text-4xl font-extrabold uppercase text-primary md:text-8xl font-black mb-4 text-center font-texas text-4xl uppercase text-primary md:text-8xl font-black leading-none tracking-tight text-primary drop-shadow-sm !font-black !leading-normal";
