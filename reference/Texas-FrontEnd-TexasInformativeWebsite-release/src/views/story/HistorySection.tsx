"use client";

import { m } from "motion/react";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import {
  AdvancedContentCategoryMediaProps,
  AdvancedContentCategoryProps,
} from "@/modules/informative/types/advanced-content.types";
import { domSanitize } from "@/lib/domSanitize";

interface IntroSectionProps {
  locale: string;
  ourStoryData: AdvancedContentCategoryProps;
  ourStoryVideos: AdvancedContentCategoryMediaProps[];
  resources: {
    Home: string;
  };
}

const HistorySection = (props: IntroSectionProps) => {
  const { locale, ourStoryData, ourStoryVideos, resources } = props;

  const defaultVideo =
    ourStoryVideos?.find((video) => video.Prima) || ourStoryVideos?.[0];
  const arVideo =
    ourStoryVideos?.find((video) => !video.Prima) || ourStoryVideos?.[0];

  return (
    <section className="relative bg-white pt-12 lg:pt-28">
      <div className="p-4">
        <div className="relative z-10 my-6 flex justify-center md:mt-10">
          <CustomBreadCrumb
            data={[
              { name: resources["Home"], href: "/" },
              { name: ourStoryData?.Name, href: "/story" },
            ]}
          />
        </div>

        <div className="flex flex-col items-center">
          <m.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="text-center font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
            style={{ fontSize: "clamp(48px, 16vw, 160px)" }}
          >
            {ourStoryData?.Name}
          </m.h1>
          {ourStoryData?.DescriptionLong?.trim() && (
            <div
              dangerouslySetInnerHTML={{
                __html: domSanitize(ourStoryData?.DescriptionLong?.trim()),
              }}
            />
          )}

          {/* history video */}
          {ourStoryVideos?.length > 0 && (
            <div className="relative flex w-full justify-center bg-white py-1 sm:py-10">
              <video
                className="m-auto block w-full object-contain object-center outline-none ring-0"
                autoPlay
                muted
                loop
                playsInline
                poster={defaultVideo?.ActualImage || ""}
              >
                <source
                  src={locale === "ar" ? arVideo?.Video : defaultVideo?.Video}
                  type="video/mp4"
                />
              </video>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default HistorySection;
