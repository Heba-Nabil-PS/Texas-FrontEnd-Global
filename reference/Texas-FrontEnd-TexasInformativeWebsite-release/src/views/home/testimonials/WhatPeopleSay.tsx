"use client";

import { getLocaleDirection } from "@/lib";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import { NextImage } from "@/components/global/next-image";

interface WhatPeopleSayProps {
  testimonialsData: AdvancedContentCategoryProps | undefined;
  testimonialsContentData: AdvancedContentCategoryProps[] | undefined;
  locale: string;
}

const WhatPeopleSay = (props: WhatPeopleSayProps) => {
  const { testimonialsData, testimonialsContentData, locale } = props;

  const headingImage =
    locale === "ar"
      ? testimonialsData?.ThumbnailImage
      : testimonialsData?.MediumImage;

  return (
    <div className="relative mx-auto w-full bg-[#be2403] pb-6 pt-10 text-right max-md:bg-top md:py-8">
      {testimonialsData?.ImageUrl?.trim() && (
        <NextImage
          src={testimonialsData?.ImageUrl || ""}
          alt={testimonialsData?.Name || ""}
          fill
          className="absolute inset-0 hidden object-cover object-left lg:block"
        />
      )}

      <div className="relative z-10 grid grid-cols-1 gap-x-4 lg:grid-cols-2">
        <div className="hidden lg:block rtl:order-2"></div>

        <div className="flex w-full flex-col items-center justify-center px-6 sm:py-6 rtl:order-1">
          {/* Curved heading like the image */}
          {headingImage?.trim() && (
            <NextImage
              width={600}
              height={200}
              src={headingImage || ""}
              alt={testimonialsData?.Name || ""}
              className="h-auto w-full object-contain"
            />
          )}
          <h2 className="sr-only">{testimonialsData?.Name}</h2>

          {testimonialsContentData && testimonialsContentData.length > 0 && (
            <Carousel
              opts={{
                loop: true,
                align: "end",
                containScroll: "trimSnaps",
                skipSnaps: false,
                direction: getLocaleDirection(locale),
              }}
              className="mt-4 w-full md:mt-20"
            >
              <CarouselContent className="ml-0 md:py-10">
                {testimonialsContentData.map((t, i) => (
                  <CarouselItem key={i} className="basis-full">
                    <div className="relative flex flex-col items-center justify-center px-7 py-8">
                      <img
                        src="/images/qoute.png"
                        alt="quote"
                        className="absolute start-2 top-2 size-6 rotate-180 rtl:-scale-x-100"
                      />

                      <p
                        role="heading"
                        aria-level={3}
                        className="mb-4 w-full text-center text-xl font-light text-white md:text-3xl"
                      >
                        {t.DescriptionShort}
                      </p>
                      <div className="flex w-full items-center justify-center gap-2 text-center">
                        {t?.ImageUrl && (
                          <NextImage
                            width={32}
                            height={32}
                            src={t.ImageUrl}
                            alt={t.Name}
                            className="size-8 rounded-full bg-white object-contain"
                          />
                        )}
                        {t?.Name && (
                          <span className="text-center text-lg font-medium text-secondary">
                            {t.Name}
                          </span>
                        )}
                      </div>
                      <img
                        src="/images/qoute.png"
                        alt="quote"
                        className="absolute bottom-8 end-8 size-6 rtl:rotate-180"
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

              <div className="mt-6 flex justify-end gap-4 px-4 sm:mt-10">
                <CarouselPrevious
                  className="relative inset-0 flex size-12 -translate-y-1/4 items-center justify-center rounded-full border border-white bg-transparent text-white shadow-none transition hover:border-secondary hover:text-secondary"
                  iconClassName="size-6 text-white hover:text-secondary"
                  iconColor="white"
                />
                <CarouselNext
                  className="relative inset-0 flex size-12 -translate-y-1/4 items-center justify-center rounded-full border border-white bg-transparent text-white shadow-none transition hover:border-secondary hover:text-secondary"
                  iconClassName="fill-white hover:text-secondary"
                  iconColor="white"
                />
              </div>
            </Carousel>
          )}
        </div>
      </div>

      {/* <div className="relative flex w-full flex-col items-center justify-center md:items-end md:justify-end">
        {headingImage?.trim() && (
          <NextImage
            width={600}
            height={200}
            src={headingImage || ""}
            alt={testimonialsData?.Name || ""}
            className="md:absolute md:end-1/2 md:top-0 md:w-1/2 md:translate-x-1/2 lg:-top-10 lg:end-5 lg:translate-x-0"
          />
        )}
        <h2 className="relative top-6 w-full text-center font-texas text-3xl font-bold uppercase text-white md:sr-only">
          {testimonialsData?.Name}
        </h2>
        <p className="sr-only">{testimonialsData?.DescriptionShort}</p>
      </div> */}
    </div>
  );
};

export default WhatPeopleSay;
