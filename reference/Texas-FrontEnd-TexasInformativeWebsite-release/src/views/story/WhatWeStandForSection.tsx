"use client";

import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import { NextImage } from "@/components/global/next-image";

interface CircularFeatureSectionProps {
  locale: string;
  ourValuesData: AdvancedContentCategoryProps;
  ourValuesContentData: AdvancedContentCategoryProps[];
}

const WhatWeStandForSection = (props: CircularFeatureSectionProps) => {
  const { locale, ourValuesData, ourValuesContentData } = props;

  //grid items
  const gridItems = ourValuesContentData.map((m) => ({
    src: locale === "ar" ? m.MediumImage || m.ImageUrl : m.ImageUrl || "",
    alt: m.ImageAlt || m.Name || "",
    title: m.Name || "",
    text: m.DescriptionShort || "",
  }));

  return (
    <section className="z-10 mt-4 bg-white px-4 py-10 md:py-16">
      <div className="relative mb-10 text-center">
        <h2 className="font-texas text-6xl font-black uppercase text-primary md:text-7xl rtl:mb-6">
          {ourValuesData?.Name}
        </h2>
        <p className="text-lg font-medium text-gray-700">
          {ourValuesData?.DescriptionShort}
        </p>
      </div>

      <div className="container relative">
        <div className="grid gap-x-4 gap-y-6 sm:grid-cols-2 lg:grid-cols-4 2xl:gap-x-6">
          {gridItems.map((item, index) => (
            <div
              key={index}
              className="group relative"
              style={{
                animationDelay: `${index * 150}ms`,
              }}
            >
              {/* Glass card */}
              <div className="relative h-full min-h-[400px] overflow-hidden rounded-3xl border border-white/20 bg-white/10 shadow-2xl backdrop-blur-xl transition-all duration-700 hover:scale-105 hover:shadow-primary/20">
                {/* Content */}
                <div className="relative flex h-full flex-col">
                  <div className="relative h-64 w-full overflow-hidden rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-105">
                    <NextImage
                      width={650}
                      height={650}
                      src={item.src}
                      alt={item.alt}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />

                    {/* Shimmer effect */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                  </div>

                  {/* Title with modern styling */}
                  <div className="p-4">
                    <div className="mb-1">
                      <h3 className="font-texas text-3xl font-black uppercase text-third transition-colors duration-300 group-hover:text-primary">
                        {item.title}
                      </h3>
                      <div className="mt-2 h-0.5 w-0 bg-gradient-to-r from-primary to-primary/60 transition-all duration-500 group-hover:w-full"></div>
                    </div>

                    {/* Description */}
                    <p className="flex-1 leading-relaxed text-gray-600 transition-colors duration-300 group-hover:text-gray-700">
                      {item.text}
                    </p>
                  </div>
                </div>

                {/* Corner accent */}
                <div className="absolute right-0 top-0 h-16 w-16 overflow-hidden">
                  <div className="absolute right-0 top-0 h-8 w-8 -translate-y-4 translate-x-4 rotate-45 transform bg-gradient-to-br from-primary/20 to-transparent"></div>
                </div>
              </div>

              {/* Floating shadow */}
              <div className="absolute -bottom-4 left-1/2 h-2 w-3/4 -translate-x-1/2 rounded-full bg-primary/10 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeStandForSection;
