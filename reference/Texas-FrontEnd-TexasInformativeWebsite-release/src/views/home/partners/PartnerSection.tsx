"use client";

import GlobalHeading from "@/components/global/GlobalHeading";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getLocaleDirection } from "@/lib";
import { CategoryContentMediaType, CategoryType } from "@/types";
import { m } from "motion/react";

interface PartnerSectionProps {
  patrnersSectionMedia: CategoryContentMediaType[];
  patrnersSection: CategoryType;
  locale: string;
}

export default function PartnerSection(props: PartnerSectionProps) {
  const { patrnersSectionMedia, patrnersSection, locale } = props;

  return (
    <section className="z-30 w-full overflow-hidden bg-[url('/images/bg-gray.webp')] pb-10">
      <m.div
        initial={{ opacity: 0, y: 100, x: 0 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mx-auto flex flex-col items-center justify-center max-md:container"
      >
        <GlobalHeading
          heading={patrnersSection?.Name}
          // subHeading="news &"
          headingClassName="text-secondary uppercase text-center mb-5  lg:mb-10"
          subHeadingClassName="text-primary"
        />
        <Carousel
          carouselType="normal"
          className="relative w-full sm:w-3/4"
          opts={{ direction: getLocaleDirection(locale) }}
        >
          <CarouselContent className="-ml-4 items-center">
            {patrnersSectionMedia?.map((item, i) => (
              <CarouselItem
                className="flex basis-full items-center justify-center pl-4 max-sm:scale-90 sm:basis-1/3 md:basis-1/4 2xl:basis-1/6"
                key={i}
              >
                {item?.ActualImage && (
                  <img
                    src={item?.ActualImage}
                    alt={item?.Name}
                    width={150}
                    height={150}
                  />
                )}
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="mt-16 flex items-center justify-center gap-5 lg:mt-24 lg:justify-end lg:pr-20">
            <CarouselPrevious
              className="absolute -left-7 size-14 border-0 max-sm:top-[40%] sm:-left-20 lg:-left-28"
              iconClassName="size-8 text-black"
            />
            <CarouselNext
              className="absolute -right-7 size-14 border-0 max-sm:top-[40%] sm:-right-20 lg:-right-28"
              iconClassName="size-8 text-black"
            />
          </div>
        </Carousel>
        {/* <div className="grid grid-cols-6 self">
          {partners.map(({ src, alt }, i) => (
            <div className="col-span-1" key={i}>
              <img src={src} alt={alt} width={150} height={150} />
            </div>
          ))}
        </div> */}
      </m.div>
    </section>
  );
}
