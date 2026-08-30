"use client";

import { NextImage } from "@/components/global/next-image";
import { domSanitize } from "@/lib/domSanitize";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";

interface AppDataViewProps {
  AppDataBannerData: AdvancedContentCategoryProps | undefined;
  DiscoverMoreWithTheAppData: AdvancedContentCategoryProps | undefined;
  TreatYourselfData: AdvancedContentCategoryProps | undefined;
}
const AppDataView = (props: AppDataViewProps) => {
  const { AppDataBannerData, DiscoverMoreWithTheAppData, TreatYourselfData } =
    props;

  return (
    <div>
      {AppDataBannerData && (
        <section className="relative flex items-center justify-center">
          {AppDataBannerData?.ImageUrl && (
            <>
              <h1 className="sr-only">
                {AppDataBannerData?.Name || AppDataBannerData?.ImageAlt}
              </h1>
              <NextImage
                width={1900}
                height={1080}
                src={AppDataBannerData?.ImageUrl}
                alt={
                  AppDataBannerData?.ImageAlt || AppDataBannerData?.Name || ""
                }
                className="h-auto w-full object-cover object-center"
                priority
              />
            </>
          )}

          <div className="container absolute bottom-4 right-0 w-1/2 sm:bottom-8 lg:bottom-28">
            <div className="mt-6 flex flex-row justify-center gap-4">
              {AppDataBannerData?.MediumImage && (
                <a
                  href={AppDataBannerData?.Link1}
                  target="_blank"
                  aria-label="app store badge"
                  rel="noopener noreferrer"
                >
                  <NextImage
                    src={AppDataBannerData?.MediumImage}
                    alt={
                      AppDataBannerData?.Name ||
                      AppDataBannerData?.ImageAlt ||
                      "app store badge"
                    }
                    width={160}
                    height={48}
                    className="h-12 w-auto object-contain"
                    priority
                  />
                </a>
              )}

              {AppDataBannerData?.ThumbnailImage && (
                <a
                  href={AppDataBannerData?.Link2 ?? undefined}
                  target="_blank"
                  aria-label="google play badge"
                  rel="noopener noreferrer"
                >
                  <NextImage
                    src={AppDataBannerData?.ThumbnailImage}
                    alt={
                      AppDataBannerData?.Name ||
                      AppDataBannerData?.ImageAlt ||
                      "google play badge"
                    }
                    width={160}
                    height={48}
                    className="h-12 w-auto object-contain"
                    priority
                  />
                </a>
              )}
            </div>
          </div>
        </section>
      )}

      {DiscoverMoreWithTheAppData && (
        <section id="features" className="bg-white py-6 md:py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-4 text-center md:mb-8">
              <h2 className="text-foreground mb-4 text-3xl font-extrabold uppercase md:text-4xl lg:text-6xl">
                {DiscoverMoreWithTheAppData?.Name ||
                  "Discover More with the App"}
              </h2>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: domSanitize(
                  DiscoverMoreWithTheAppData?.DescriptionLong?.trim(),
                ),
              }}
            />
          </div>
        </section>
      )}

      {TreatYourselfData && (
        <section className="relative">
          <NextImage
            src={TreatYourselfData?.ImageUrl || ""}
            alt={TreatYourselfData?.ImageAlt || "treat yourself image"}
            width={1920}
            height={700}
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-x-0 bottom-0 start-0 z-10 w-full sm:bottom-2 md:bottom-6 lg:bottom-10 lg:start-10 xl:start-0">
            <div className="container">
              <div className="flex w-2/5 gap-1 ps-2 sm:gap-3">
                {TreatYourselfData?.MediumImage && (
                  <a
                    href={TreatYourselfData?.Link1}
                    target="_blank"
                    aria-label="app store badge"
                    rel="noopener noreferrer"
                  >
                    <NextImage
                      src={TreatYourselfData?.MediumImage}
                      alt={
                        TreatYourselfData?.Name ||
                        TreatYourselfData?.ImageAlt ||
                        "app store badge"
                      }
                      width={160}
                      height={48}
                      className="h-12 w-auto object-contain"
                      priority
                    />
                  </a>
                )}

                {TreatYourselfData?.ThumbnailImage && (
                  <a
                    href={TreatYourselfData?.Link2 ?? undefined}
                    target="_blank"
                    aria-label="google play badge"
                    rel="noopener noreferrer"
                  >
                    <NextImage
                      src={TreatYourselfData?.ThumbnailImage}
                      alt={
                        TreatYourselfData?.Name ||
                        TreatYourselfData?.ImageAlt ||
                        "google play badge"
                      }
                      width={160}
                      height={48}
                      className="h-12 w-auto object-contain"
                      priority
                    />
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default AppDataView;

export const serverClasses =
  "grid gap-4 md:gap-8 md:grid-cols-2 lg:grid-cols-3 border-border relative overflow-hidden rounded-2xl border bg-primary p-8 transition-all duration-300 hover:shadow-lg relative z-10 mb-2 text-2xl font-extrabold uppercase text-white leading-relaxed text-white border-border relative overflow-hidden rounded-2xl border bg-primary p-8 transition-all duration-300 hover:shadow-lg z-0 h-auto w-1/2 object-contain relative z-10 mb-2 text-2xl font-extrabold uppercase text-white leading-relaxed text-white";
