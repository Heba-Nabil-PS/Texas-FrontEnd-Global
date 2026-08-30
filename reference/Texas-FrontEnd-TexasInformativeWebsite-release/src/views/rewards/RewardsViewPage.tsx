"use client";

import { motion } from "motion/react";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import { domSanitize } from "@/lib/domSanitize";
import { NextImage } from "@/components/global/next-image";

interface RewardsViewPageProps {
  introData: AdvancedContentCategoryProps | undefined;
  introducingData: AdvancedContentCategoryProps | undefined;
  tierListData: AdvancedContentCategoryProps | undefined;
  locale: string;
  introContentData: AdvancedContentCategoryProps[] | undefined
}

const RewardsViewPage = (props: RewardsViewPageProps) => {
  const { introData, introducingData, tierListData, introContentData } = props;

  return (
    <div className="min-h-screen bg-white pt-28">
      {/* Heading */}
      <div className="mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { name: "Home", href: "/" },
            { name: "Rewards", href: "/rewards" },
          ]}
        />
      </div>
      <div className="flex flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
          style={{ fontSize: "clamp(48px, 16vw, 160px)" }}
        >
          {introData?.Name}
        </motion.h1>
        <p className="text-third-800/80 mt-3 max-w-3xl text-base md:text-xl">
          {introData?.DescriptionShort}
        </p>
      </div>

      {/* Rewards */}

      {introContentData && (
        <div className="mt-6">
          <div className="container">
            <div className="w-full flex flex-col md:flex-row gap-8 py-8 items-center justify-center flex-wrap">
              {introContentData.map((item, index) => (
                <div
                  key={item.UniqueName ?? index}
                  className="flex min-h-64 w-full items-center gap-4 rounded-xl bg-gray-50 p-4 text-start shadow-lg md:basis-[calc(50%-1rem)]"
                >
                  {item.ImageUrl?.trim() && (
                    <NextImage src={item.ImageUrl?.trim()} alt={item.ImageAlt?.trim() || item.Name} width={230} height={230} className="object-contain rounded-full" />
                  )}

                  <div>
                    <h2 className="font-texas text-2xl font-extrabold text-primary">{item.Name?.trim()}</h2>
                    <p>{item.DescriptionShort?.trim()}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      {/* {introData?.DescriptionLong?.trim() && (
        <div
          className="mt-6"
          dangerouslySetInnerHTML={{
            __html: domSanitize(introData.DescriptionLong?.trim()),
          }}
        />
      )} */}

      <div
        className="bg-dark mt-6 flex min-h-[55vh] items-center justify-center bg-third py-16 max-md:!bg-none md:bg-[length:30%] md:bg-right-top md:bg-no-repeat"
        style={{ backgroundImage: `url(${introducingData?.ImageUrl})` }}
      >
        <div className="z-index-2 container relative">
          <div className="flex items-center justify-end">
            <div className="w-full text-center">
              <h2 className="mb-0 font-texas text-6xl font-extrabold uppercase text-secondary">
                {introducingData?.Name}
              </h2>
              <h3 className="mb-4 text-center text-3xl text-white">
                {introducingData?.DescriptionShort}
              </h3>

              {introducingData?.DescriptionLong?.trim() && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: domSanitize(
                      introducingData.DescriptionLong?.trim(),
                    ),
                  }}
                />
              )}

              {/* <Button
                asChild
                className="mt-2 w-full border-none bg-primary px-6 py-2 font-texas text-sm font-bold uppercase text-white hover:bg-secondary sm:mt-8 sm:w-auto sm:text-base"
              >
                <NextLink href="/">Learn More</NextLink>
              </Button> */}
            </div>
          </div>
        </div>
      </div>

      {/* Tier List Section */}
      <div className="bg-[#F7F9FC] py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-12 text-center">
            <h2 className="mb-2 font-texas text-5xl font-extrabold uppercase text-primary">
              {tierListData?.Name}
            </h2>
            <p className="text-third-800/80 text-xl font-medium">
              {tierListData?.DescriptionShort}
            </p>
          </div>

          {tierListData?.DescriptionLong?.trim() && (
            <div
              dangerouslySetInnerHTML={{
                __html: domSanitize(tierListData.DescriptionLong?.trim()),
              }}
            />
          )}
        </div>
      </div>

      {/* <DownloadAppSection /> */}
    </div>
  );
};

export default RewardsViewPage;


