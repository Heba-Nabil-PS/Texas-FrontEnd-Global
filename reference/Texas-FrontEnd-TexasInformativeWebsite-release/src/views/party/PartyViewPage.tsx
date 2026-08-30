"use client";

import { motion as m } from "motion/react";
import { PAGE_PATHS } from "@/constants/page-paths";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { NextImage } from "@/components/global/next-image";
import { PartyForm } from "./PartyForm";
import type { PartyPageResourcesProps } from "@/types/resources";
import type { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import { domSanitize } from "@/lib/domSanitize";
import { cn } from "@/lib/utils";

interface PartyViewPageProps {
  locale: string;
  resources: PartyPageResourcesProps;
  headerParty: AdvancedContentCategoryProps | undefined;
  bigCrowedData: AdvancedContentCategoryProps | undefined;
  thankyouData: AdvancedContentCategoryProps | undefined;
}

export function PartyViewPage(props: PartyViewPageProps) {
  const { locale, resources, headerParty, bigCrowedData, thankyouData } = props;

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-28">
      <div className="relative z-10 mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { name: resources.Home, href: PAGE_PATHS.HOME },
            {
              name: resources.party,
              href: headerParty?.Name || PAGE_PATHS.PARTY,
            },
          ]}
        />
      </div>

      <div className="flex flex-col items-center px-4 text-center">
        <m.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
          style={{ fontSize: "clamp(48px, 16vw, 160px)" }}
        >
          {headerParty?.Name}
        </m.h1>
        {headerParty?.DescriptionLong?.trim() && (
          <div
            dangerouslySetInnerHTML={{
              __html: domSanitize(headerParty.DescriptionLong?.trim()),
            }}
          />
        )}
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid items-center gap-8 md:grid-cols-2">
          {/* Left Side - Image */}
          {headerParty?.ImageUrl && (
            <div className="relative h-96 overflow-hidden rounded-xl md:h-[500px]">
              <NextImage
                src={headerParty.ImageUrl}
                alt={headerParty.ImageAlt || "Party Pickup"}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Right Side - Form */}
          {bigCrowedData && (
            <div
              className="p-6"
              dangerouslySetInnerHTML={{
                __html: domSanitize(
                  bigCrowedData?.DescriptionLong?.trim() || "",
                ),
              }}
            />
          )}

          <div
            className={cn(
              "flex flex-col items-center justify-center",
              thankyouData?.DescriptionLong && "col-span-full mt-6",
            )}
          >
            {thankyouData?.DescriptionLong && (
              <div
                className="mx-auto mb-6 max-w-xl text-center"
                dangerouslySetInnerHTML={{
                  __html: domSanitize(thankyouData?.DescriptionLong),
                }}
              />
            )}

            <div className="w-full rounded-xl bg-white p-6 shadow-lg md:w-fit md:p-8">
              <p className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
                {headerParty?.Source1}
              </p>

              <PartyForm locale={locale} resources={resources} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const serverClasses =
  "mb-6 text-2xl font-bold text-gray-800 md:text-3xl list-inside list-disc [&>li]:py-1 mb-2 text-2xl font-extrabold uppercase !leading-normal text-gray-900 sm:text-5xl !font-extrabold mb-4 text-secondary sm:text-4xl";
