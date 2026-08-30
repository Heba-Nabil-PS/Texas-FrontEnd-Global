"use client";

import { NextImage } from "@/components/global/next-image";
import { NextLink } from "@/components/global/next-link";
import { Button } from "@/components/ui/button";
import { PAGE_PATHS } from "@/constants/page-paths";
import { domSanitize } from "@/lib/domSanitize";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";

interface DiscoverTexasProps {
  discoverTexasData: AdvancedContentCategoryProps | undefined;
}

export const DiscoverTexas = ({ discoverTexasData }: DiscoverTexasProps) => {
  return (
    <div className="w-full max-md:py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid items-stretch gap-8 md:grid-cols-2 md:gap-12">
          <div className="animate-fade-in relative h-auto w-full md:order-2">
            <NextImage
              fill
              src={discoverTexasData?.ImageUrl || ""}
              alt={discoverTexasData?.Name || ""}
              className="h-full w-full object-contain object-top"
            />
          </div>
          <div className="animate-fade-up flex h-auto flex-col justify-center space-y-4 px-4 py-10 sm:space-y-6 sm:px-0 md:order-1">
            <h2 className="animate-fade-in-down font-texas text-4xl font-extrabold uppercase leading-tight sm:text-5xl md:text-7xl">
              {discoverTexasData?.Name}
              <span className="animate-fade-in block font-texas text-5xl font-extrabold uppercase text-primary sm:text-6xl md:text-7xl">
                <span className="relative">
                  {discoverTexasData?.DescriptionShort}
                  {discoverTexasData?.Source2 && (
                    <sup className="absolute -right-6 top-4 text-[20px] rtl:right-auto">
                      {discoverTexasData?.Source2}
                    </sup>
                  )}
                </span>
              </span>
            </h2>
            {discoverTexasData?.DescriptionLong?.trim() && (
              <div
                dangerouslySetInnerHTML={{
                  __html: domSanitize(
                    discoverTexasData?.DescriptionLong?.trim(),
                  ),
                }}
              />
            )}

            {discoverTexasData?.Source1?.trim() && (
              <div className="gap-4">
                <Button
                  asChild
                  className="border-none bg-primary px-6 py-2 font-texas text-sm font-bold uppercase text-white hover:bg-secondary sm:w-auto sm:text-base"
                >
                  <NextLink href={discoverTexasData?.Link1 || PAGE_PATHS.STORY}>
                    {discoverTexasData?.Source1}
                  </NextLink>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
