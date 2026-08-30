"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { PAGE_PATHS } from "@/constants/page-paths";
import { domSanitize } from "@/lib/domSanitize";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { NextImage } from "@/components/global/next-image";
import type { FAQPageResourcesProps } from "@/types/resources";
import type { FaqProps } from "@/modules/faq/types/faq.type";
import type { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";

interface FaqViewPageProps {
  locale: string;
  faqs: FaqProps[];
  resources: FAQPageResourcesProps;
  headerFAQ: AdvancedContentCategoryProps | undefined;
}

export function FaqViewPage(props: FaqViewPageProps) {
  const { locale, faqs, resources, headerFAQ } = props;

  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const defaultBannerImage = headerFAQ?.ImageUrl;
  const arBannerImage = headerFAQ?.MediumImage || defaultBannerImage || "";

  return (
    <section className="bg-gray-50 pt-16 lg:pt-28">
      <div className="relative z-10 mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { href: PAGE_PATHS.HOME, name: resources["Home"] },
            {
              href: PAGE_PATHS.FAQ,
              name: headerFAQ?.Name || resources["FAQs"],
            },
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
              alt={headerFAQ?.ImageAlt || "FAQ"}
              fill
              className="rounded-[50px] object-cover"
              priority
            />
          </motion.div>
        </div>
      )}

      <div className="my-6 px-4 text-center">
        <h1 className="mb-4 font-texas text-4xl font-extrabold uppercase text-primary md:text-8xl">
          {headerFAQ?.Name}
        </h1>
        <p className="mx-auto max-w-3xl text-lg text-gray-600">
          {headerFAQ?.DescriptionShort}
        </p>
      </div>

      {faqs && faqs.length > 0 && (
        <div className="mb-10 flex gap-4 p-3">
          <div className="mx-auto md:w-3/5">
            <div className="space-y-4">
              {faqs.map((item, index) => (
                <div key={index} className="overflow-hidden rounded-xl">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className={`flex w-full items-center justify-between px-6 py-6 text-left rtl:text-right ${
                      activeIndex === index
                        ? "bg-white text-third"
                        : "rounded-xl border-2 border-primary bg-white hover:bg-primary hover:text-white"
                    } transition-colors duration-200`}
                  >
                    <span
                      className="font-texas text-lg sm:text-2xl sm:font-bold [&_sub]:bottom-1 [&_sub]:ps-1"
                      dangerouslySetInnerHTML={{
                        __html: domSanitize(item.question?.trim()),
                      }}
                    />
                    <motion.span
                      animate={{ rotate: activeIndex === index ? 180 : 0 }}
                      className="shrink-0 text-3xl"
                    >
                      <img src="/images/dr.png" className="w-4" alt="faq" />
                    </motion.span>
                  </button>

                  {item.answer?.trim() && (
                    <AnimatePresence>
                      {activeIndex === index && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-gray-100 bg-white px-6 py-3">
                            <p
                              className="text-sm text-gray-700 [&_a]:text-primary [&_a]:underline [&_a]:hover:text-secondary [&_a]:hover:underline [&_sub]:bottom-1 [&_sub]:pl-1"
                              dangerouslySetInnerHTML={{
                                __html: domSanitize(item.answer?.trim()),
                              }}
                            />
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default FaqViewPage;
