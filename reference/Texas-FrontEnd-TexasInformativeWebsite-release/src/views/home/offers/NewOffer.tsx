"use client";

import { useEffect, useState } from "react";
import { domAnimation, LazyMotion } from "motion/react";
import { getLocaleDirection, isModuleOn } from "@/lib";
import { domSanitize } from "@/lib/domSanitize";
import {
  Carousel,
  CarouselContent,
  CarouselDots,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { NextLink } from "@/components/global/next-link";
import {
  BannerProps,
  BannerTypeEnum,
} from "@/modules/banners/types/banners.types";
import { NextImage } from "@/components/global/next-image";
import { useData } from "@/components/providers/data-provider";
import { useConfig } from "@/components/providers/config-provider";
import { STATIC_MODULES } from "@/constants/country-modules";
import { PAGE_PATHS } from "@/constants/page-paths";
import type { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";

interface NewOfferProps {
  banners?: BannerProps[];
  locale: string;
  data: AdvancedContentCategoryProps;
}

const NewOffer = (props: NewOfferProps) => {
  const { banners, locale, data } = props;

  const {
    countryData: { countryModules },
  } = useData();
  const { orderExternalLink } = useConfig();

  const useOrderInternalLink = Boolean(
    isModuleOn(countryModules, STATIC_MODULES.ORDER),
  );
  const useOrderExternalLink = Boolean(orderExternalLink);
  const canOrderNow = useOrderInternalLink || useOrderExternalLink;
  const orderNowHref = useOrderInternalLink
    ? PAGE_PATHS.ORDER_NOW
    : orderExternalLink || "#";

  const [carouselApi, setCarouselApi] = useState<any>(null);

  useEffect(() => {
    if (!carouselApi) return;
    const interval = setInterval(() => {
      if (carouselApi) {
        if (carouselApi.canScrollNext()) {
          carouselApi.scrollNext();
        } else {
          carouselApi.scrollTo(0); // Loop back to start
        }
      }
    }, 6000);
    return () => clearInterval(interval);
  }, [carouselApi]);

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative w-full py-4">
        <div className="container py-6">
          <h2 className="animate-fade-in-down font-texas text-4xl font-extrabold uppercase leading-tight sm:text-5xl md:text-7xl">
            {data?.Name}
            <span className="animate-fade-in block font-texas font-extrabold uppercase text-primary sm:text-6xl md:text-7xl rtl:leading-normal">
              <bdi className="trade-mark !font-extrabold">
                {data?.DescriptionShort}
                <sup>{data?.Source2}</sup>
              </bdi>
            </span>
          </h2>
          {data?.DescriptionLong?.trim() && (
            <div
              dangerouslySetInnerHTML={{
                __html: domSanitize(data?.DescriptionLong?.trim()),
              }}
            />
          )}
        </div>

        {banners && banners.length > 0 && (
          <Carousel
            className="relative mx-auto px-4 lg:px-8"
            setApi={setCarouselApi}
            opts={{
              direction: getLocaleDirection(locale),
            }}
          >
            <CarouselContent className="gap-4 py-2">
              {banners
                ?.filter((item) => !item.video)
                .map((item, i) => (
                  <CarouselItem
                    className="relative mx-auto basis-full lg:ps-4"
                    key={i}
                  >
                    {item.bannerType === BannerTypeEnum.Image && (
                      <>
                        {canOrderNow ? (
                          <NextLink
                            href={orderNowHref}
                            target={useOrderExternalLink ? "_blank" : "_self"}
                            rel={
                              useOrderExternalLink
                                ? "noopener noreferrer"
                                : ""
                            }
                          >
                            <NextImage
                              src={item?.imageActual}
                              alt={item.alt}
                              width={1920}
                              height={700}
                              // fill
                              className="h-auto w-full rounded-3xl object-contain"
                            />
                          </NextLink>
                        ) : item.button1URL && item.button1Enabled ? (
                          <NextLink href={item.button1URL} target="_self">
                            <NextImage
                              src={item?.imageActual}
                              alt={item.alt}
                              width={1920}
                              height={700}
                              // fill
                              className="h-auto w-full rounded-3xl object-contain"
                            />
                          </NextLink>
                        ) : (
                          <NextImage
                            src={item?.imageActual}
                            alt={item.alt}
                            width={1920}
                            height={700}
                            // fill
                            className="h-auto w-full rounded-3xl object-contain"
                          />
                        )}
                      </>
                    )}
                  </CarouselItem>
                ))}
            </CarouselContent>

            <div className="container relative mx-auto w-full text-center lg:-mt-16">
              <div className="hidden w-full grid-cols-12 lg:grid">
                <CarouselDots className="border border-gray-400 bg-white" />
              </div>
              {banners?.filter((item) => !item.video).length > 1 && (
                <div className="mt-4 flex justify-end gap-2 sm:mt-6 lg:mt-0">
                  <CarouselPrevious
                    className="relative inset-0 flex size-12 items-center justify-center rounded-full border border-black bg-transparent text-black shadow-none transition hover:border-secondary hover:text-secondary max-lg:translate-y-0 lg:border-white lg:text-white"
                    iconClassName="size-6 hover:text-secondary"
                    iconColor="currentColor"
                  />
                  <CarouselNext
                    className="relative inset-0 flex size-12 items-center justify-center rounded-full border border-black bg-transparent text-black shadow-none transition hover:border-secondary hover:text-secondary max-lg:translate-y-0 lg:border-white lg:text-white"
                    iconClassName="hover:text-secondary"
                    iconColor="currentColor"
                  />
                </div>
              )}
            </div>
          </Carousel>
        )}
      </section>
    </LazyMotion>
  );
};

export default NewOffer;
