"use client";

import { motion } from "motion/react";
import { PAGE_PATHS } from "@/constants/page-paths";
import { CareersProps } from "@/modules/careers/types/careers.type";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { NextImage } from "@/components/global/next-image";
import type { CareerPageResourcesProps } from "@/types/resources";
import { NextLink } from "@/components/global/next-link";
import { ArrowRightIcon } from "lucide-react";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import { domSanitize } from "@/lib/domSanitize";

interface CareersViewPageProps {
  careers: CareersProps[];
  resources: CareerPageResourcesProps;
  headerCareers: AdvancedContentCategoryProps | undefined;
}
export function CareersViewPage(props: CareersViewPageProps) {
  const { careers, resources, headerCareers } = props;

  return (
    <section className="min-h-screen bg-white pt-16 lg:pt-28">
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
      {headerCareers?.ImageUrl && (
        <div className="relative mt-4 flex w-full items-center justify-center overflow-hidden">
          <h1 className="sr-only">
            {headerCareers?.Name || headerCareers?.ImageAlt}
          </h1>
          <motion.div
            className="relative aspect-video max-h-[480px] w-[90%] max-w-6xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <NextImage
              src={headerCareers.ImageUrl}
              alt={headerCareers.ImageAlt || ""}
              fill
              className="rounded-[50px] object-cover"
              priority
            />
          </motion.div>
        </div>
      )}

      {/* Job Openings */}
      <div
        id="job-openings"
        className="container mx-auto mb-12 mt-6 px-4 lg:mt-10"
      >
        <div className="mx-auto max-w-7xl">
          {headerCareers?.DescriptionLong?.trim() && (
            <div
              dangerouslySetInnerHTML={{
                __html: domSanitize(headerCareers.DescriptionLong?.trim()),
              }}
              className="mt-4 [&_sup]:!me-[5px] [&_sup]:lg:!ms-[10px]"
            />
          )}
          {careers && careers.length > 0 && (
            <div className="flex flex-wrap justify-center gap-4">
              {careers.map((position) => (
                <motion.div
                  key={position.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  viewport={{ once: true }}
                  className="w-full cursor-pointer rounded-xl border-2 border-primary p-4 transition-colors duration-300 hover:bg-secondary hover:text-white hover:shadow-lg md:w-2/5 md:p-6"
                >
                  <NextLink
                    href={`${PAGE_PATHS.CAREER}/${position.uniqueCode}`}
                  >
                    <div className="flex justify-between gap-x-1.5">
                      <div>
                        <h2
                          className="line-clamp-1 text-xl font-bold text-gray-900"
                          title={position.title}
                        >
                          {position.title}
                        </h2>
                        <div className="mt-1 flex items-center space-x-4 sm:mt-2">
                          <span className="rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-500">
                            {new Date(position.showDate).toLocaleDateString(
                              "en-US",
                              {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                              },
                            )}
                          </span>
                        </div>
                      </div>
                      <div className="shrink-0 md:mt-0">
                        <span className="flex items-center gap-1 text-sm font-medium capitalize text-primary">
                          {resources["view-details"]}{" "}
                          <ArrowRightIcon className="size-2 rtl:-scale-x-100" />
                        </span>
                      </div>
                    </div>
                    {position.description?.trim() && (
                      <div
                        className="mt-2 line-clamp-2 text-gray-600 md:mt-4"
                        dangerouslySetInnerHTML={{
                          __html: domSanitize(position.description?.trim()),
                        }}
                      />
                    )}
                  </NextLink>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Don't Remove this
const serverClasses =
  "mb-4 text-center font-texas text-4xl !font-extrabold uppercase text-primary md:text-8xl mb-4 text-center font-extrabold font-black !font-black !leading-normal text-center font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm";
