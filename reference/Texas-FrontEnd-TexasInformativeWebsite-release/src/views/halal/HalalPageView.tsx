"use client";

import { motion as m } from "motion/react";
import { Download } from "lucide-react";
import { useData } from "@/components/providers/data-provider";
import { isModuleOn } from "@/lib";
import { PAGE_PATHS } from "@/constants/page-paths";
import { STATIC_MODULES } from "@/constants/country-modules";
import { Button } from "@/components/ui/button";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { NextImage } from "@/components/global/next-image";
import type {
  AdvancedContentCategoryDocsProps,
  AdvancedContentCategoryProps,
} from "@/modules/informative/types/advanced-content.types";
import { domSanitize } from "@/lib/domSanitize";

interface HalalPageProps {
  halalIntroData: AdvancedContentCategoryProps | undefined;
  aboutHalalData: AdvancedContentCategoryProps | undefined;
  secondHalalData: AdvancedContentCategoryProps | undefined;
  certificationHalalData: AdvancedContentCategoryProps | undefined;
  resources: {
    Home: string;
  };
  halalDocs: AdvancedContentCategoryDocsProps | undefined;
}

const HalalPageView = (props: HalalPageProps) => {
  const {
    halalIntroData,
    aboutHalalData,
    secondHalalData,
    certificationHalalData,
    resources,
    halalDocs,
  } = props;

  const {
    countryData: { countryModules },
  } = useData();

  const useHalalFirstSection = Boolean(
    isModuleOn(countryModules, STATIC_MODULES.HALALFIRSTSECTION),
  );
  const hasSecondHalalContent = Boolean(
    secondHalalData?.Name?.trim() ||
    secondHalalData?.DescriptionShort?.trim() ||
    secondHalalData?.DescriptionLong?.trim() ||
    secondHalalData?.ImageUrl?.trim(),
  );
  const useHalalSecondSection =
    Boolean(isModuleOn(countryModules, STATIC_MODULES.HALALSECONDSECTION)) &&
    hasSecondHalalContent;
  const useHalalCertificate = Boolean(
    isModuleOn(countryModules, STATIC_MODULES.HALALCERIFICATE),
  );

  // The native `download` attribute is ignored for cross-origin URLs, so fetch
  // the PDF as a blob and trigger the download manually.
  const handleDownload = async () => {
    const url = halalDocs?.URL || "/pdf/Halal.pdf";
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const objectUrl = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = objectUrl;
      a.download = "halal-certificate.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(objectUrl);
    } catch {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <section className="relative pt-12 lg:pt-28">
      {/* Optional breadcrumb below the intro */}
      <div className="relative z-10 mt-6 flex justify-center md:mt-10">
        {halalIntroData?.Name && (
          <CustomBreadCrumb
            pageClassName="capitalize"
            data={[
              {
                name: resources["Home"],
                href: PAGE_PATHS.HOME,
              },
              {
                name: halalIntroData?.Name,
                href: PAGE_PATHS.HALAL,
              },
            ]}
          />
        )}
      </div>

      <div className="flex flex-col items-center text-center">
        <m.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
          style={{ fontSize: "clamp(48px, 16vw, 160px)" }}
        >
          {halalIntroData?.Name}
        </m.h1>
        {halalIntroData?.DescriptionLong?.trim() && (
          <div
            className="px-3 rtl:mt-4"
            dangerouslySetInnerHTML={{
              __html: domSanitize(halalIntroData?.DescriptionLong?.trim()),
            }}
          />
        )}
      </div>

      {/* New Half-Image Half-Text Section */}
      {(useHalalFirstSection || useHalalSecondSection) && (
        <div className="mx-auto my-8 px-4 md:my-10">
          <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-2">
            {useHalalFirstSection && (
              <>
                {/* Image Section */}
                {aboutHalalData?.ImageUrl && (
                  <div className="relative h-96 w-full overflow-hidden rounded-xl md:h-full md:min-h-[550px]">
                    <NextImage
                      src={aboutHalalData?.ImageUrl}
                      alt={aboutHalalData.ImageAlt || ""}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                )}

                {/* Text Section */}
                <div className="flex w-full flex-col justify-center space-y-6 rounded-xl bg-secondary p-12 md:min-h-[550px]">
                  <h2 className="font-texas text-3xl font-extrabold uppercase text-primary md:text-4xl">
                    {aboutHalalData?.Name}
                  </h2>
                  <p className="text-xl text-gray-700">
                    {aboutHalalData?.DescriptionShort}
                  </p>
                  {aboutHalalData?.DescriptionLong?.trim() && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: domSanitize(
                          aboutHalalData?.DescriptionLong?.trim(),
                        ),
                      }}
                    />
                  )}
                </div>
              </>
            )}

            {useHalalSecondSection && (
              <>
                {/* Text Section */}
                <div className="flex w-full flex-col justify-center space-y-6 rounded-xl bg-secondary p-12 md:min-h-[550px]">
                  <h2 className="font-texas text-3xl font-extrabold uppercase text-primary md:text-4xl">
                    {secondHalalData?.Name}
                  </h2>
                  <p className="text-xl text-gray-700">
                    {secondHalalData?.DescriptionShort}
                  </p>
                  {secondHalalData?.DescriptionLong?.trim() && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: domSanitize(
                          secondHalalData?.DescriptionLong?.trim(),
                        ),
                      }}
                    />
                  )}
                </div>

                {/* Image Section */}
                {secondHalalData?.ImageUrl?.trim() && (
                  <div className="relative h-96 w-full overflow-hidden rounded-xl md:h-full md:min-h-[550px]">
                    <NextImage
                      src={secondHalalData?.ImageUrl?.trim()}
                      alt={secondHalalData.ImageAlt || ""}
                      fill
                      className="object-cover object-center"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* See our Local Halal Certification */}
      {useHalalCertificate && (
        <div className="container relative mx-auto my-8 px-4 md:my-10">
          {/* Background Image */}
          <div
            className="pointer-events-none absolute inset-0 -bottom-24 -left-20 bg-[length:40%_100%] bg-left bg-no-repeat opacity-5"
            style={{
              backgroundImage: `url(${certificationHalalData?.ImageUrl})`,
            }}
          ></div>
          <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="flex-1 text-center md:text-left">
              <h2 className="font-texas text-2xl font-extrabold uppercase text-primary md:text-6xl">
                {certificationHalalData?.Name}
              </h2>
              <p className="text-third-800/80 mt-3 text-center text-base md:text-lg">
                {certificationHalalData?.DescriptionShort}
              </p>
            </div>

            {halalDocs?.URL && (
              <div className="flex-shrink-0">
                <Button
                  onClick={handleDownload}
                  className="flex cursor-pointer items-center bg-primary px-6 py-3 font-texas font-bold uppercase text-white hover:border-secondary hover:bg-secondary"
                >
                  <Download className="mr-2 size-5" />
                  {certificationHalalData?.Source1 || halalDocs?.Name}
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default HalalPageView;
