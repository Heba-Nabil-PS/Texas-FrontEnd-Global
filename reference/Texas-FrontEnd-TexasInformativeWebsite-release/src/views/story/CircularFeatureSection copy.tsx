"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselDots,
  type CarouselApi,
} from "@/components/ui/carousel";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import { NextImage } from "@/components/global/next-image";
import { getLocaleDirection } from "@/lib";
import type { StoryPageResourcesProps } from "@/types/resources";
import { MoveLeftIcon, MoveRightIcon } from "lucide-react";

interface CircularFeatureSectionProps {
  locale: string;
  ourValuesData: AdvancedContentCategoryProps;
  ourValuesContentData: AdvancedContentCategoryProps[];
  resources: StoryPageResourcesProps;
}

const CircularFeatureSection = (props: CircularFeatureSectionProps) => {
  const {
    locale,
    ourValuesData,
    ourValuesContentData,
    resources
  } = props

  //carousel slides
  const slides = ourValuesContentData.map((m) => ({
    src: m.ImageUrl || "",
    alt: m.ImageAlt || m.Name || "",
    title: m.Name || "",
    text: m.DescriptionShort || "",
  }));

  const [api, setApi] = useState<CarouselApi | null>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => {
      // @ts-ignore
      api?.off("select", onSelect);
    };
  }, [api]);

  const nextIndex = (selectedIndex + 1) % slides.length;

  return (
    <section className="bg-[#FAF7F2] py-12 md:pb-10 md:pt-32">
      <h2 className="mb-4 block text-center font-texas text-5xl font-extrabold text-primary md:hidden">
        {ourValuesData?.Name}
      </h2>
      <div className="container">
        <div className="grid items-center gap-10 md:grid-cols-3">
          {/* Left description with Prev */}
          <div className="order-2 flex flex-col gap-6 md:order-1">
            <button
              onClick={() => api?.scrollPrev()}
              className="flex items-center gap-2 font-bold uppercase tracking-wide text-primary"
              aria-label="Previous"
            >
              <MoveLeftIcon className="rtl:-scale-x-100" />
              {resources["prev"]}
            </button>
            <div className="space-y-4">
              <h3 className="font-texas text-4xl font-extrabold text-primary">
                {slides[selectedIndex]?.title}
              </h3>
              <p className="text-third-800/80 max-w-md leading-relaxed">
                {slides[selectedIndex]?.text}
              </p>
            </div>
          </div>

          {/* Center circular media with top-half arc title */}
          <div className="relative order-1 flex justify-center md:order-2">
            <div className="relative h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] md:h-[500px] md:w-[500px]">
              {/* Top-half arc title */}
              {ourValuesData?.Name && (
                <svg
                  viewBox="0 0 700 420"
                  className="pointer-events-none absolute -top-40 left-1/2 z-20 h-[570px] w-[650px] -translate-x-1/2 max-md:hidden"
                  aria-hidden
                >
                  <defs>
                    <path id="top-arc" d="M 50 350 A 300 300 0 0 1 650 350" />
                  </defs>
                  <text
                    fill="#b12028"
                    style={{
                      fontFamily: "var(--font-texas)",
                      fontWeight: 900,
                    }}
                  >
                    <textPath
                      xlinkHref="#top-arc"
                      startOffset="50%"
                      textAnchor="middle"
                      style={{ fontSize: 130, letterSpacing: 6 }}
                    >
                      {ourValuesData?.Name}
                    </textPath>
                  </text>
                </svg>
              )}

              {/* Carousel container with circular mask */}
              <div className="absolute inset-0 h-full w-full overflow-hidden rounded-full">
                <Carousel
                  setApi={setApi as any}
                  opts={{
                    loop: true,
                    align: "center",
                    direction: getLocaleDirection(locale),
                  }}
                  className="h-full"
                >
                  <CarouselContent className="ml-0 h-full gap-4 p-2">
                    {slides.map((slide, i) => (
                      <CarouselItem key={i} className="h-full pl-0">
                        <div className="relative h-full w-full">
                          <NextImage
                            width={500}
                            height={500}
                            src={slide.src}
                            alt={slide.alt}
                            className="h-full w-full rounded-full object-cover"
                            style={{ aspectRatio: "1/1" }}
                            loading="lazy"
                          />

                          {/* Circular border */}
                          <div className="pointer-events-none absolute inset-0 h-full w-full rounded-full ring-4 ring-primary max-md:hidden" />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <div className="absolute -bottom-10 left-1/2 -translate-x-1/2">
                    <CarouselDots />
                  </div>
                </Carousel>
              </div>
            </div>
          </div>

          {/* Right next with preview */}
          <div className="order-3 flex items-end justify-end md:order-3">
            <div className="flex flex-col items-end gap-4">
              <button
                onClick={() => api?.scrollNext()}
                className="flex items-center gap-2 font-bold uppercase tracking-wide text-primary"
                aria-label="Next"
              >
                {resources["next"]}
                <MoveRightIcon className="rtl:-scale-x-100" />
              </button>
              <div className="relative h-36 w-36 overflow-hidden rounded-full border-2 border-primary/30 shadow-lg">
                <NextImage
                  fill
                  src={slides[nextIndex]?.src}
                  alt={slides[nextIndex]?.alt}
                  className="h-full w-full object-cover"
                  style={{ aspectRatio: "2/2" }}
                  loading="lazy"
                />
              </div>
              <p className="max-w-[300px] text-right font-texas text-base font-bold uppercase text-primary">
                {slides[nextIndex]?.title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CircularFeatureSection;
