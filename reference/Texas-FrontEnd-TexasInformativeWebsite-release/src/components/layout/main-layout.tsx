"use client";

import { usePathname } from "@/i18n/navigation";
import {
  AdvancedContentCategoryDocsProps,
  AdvancedContentCategoryMediaProps,
  AdvancedContentCategoryProps,
} from "@/modules/informative/types/advanced-content.types";
import { PAGE_PATHS } from "@/constants/page-paths";
import { DesktopHeader } from "./header/DesktopHeader";
import { ScrollToTop } from "../global/scroll-to-top";
import { Footer } from "./footer/Footer";
import { FindOurStore } from "@/views/story/FindOurStore";
import type {
  FooterResourcesProps,
  HeaderResourcesProps,
} from "@/types/resources";
import { cn } from "@/lib/utils";
import { isModuleOn } from "@/lib";
import { useData } from "../providers/data-provider";
import { STATIC_MODULES } from "@/constants/country-modules";

type Props = {
  children: React.ReactNode;
  locale: string;
  locales: { isoCode: string; languageName: string }[];
  locationsSectionData: AdvancedContentCategoryProps | undefined;
  mapBg: AdvancedContentCategoryMediaProps | undefined;
  headerResources: HeaderResourcesProps;
  footerResources: FooterResourcesProps;
  applyCMP: boolean;
  nutritionalInformationDocs: AdvancedContentCategoryDocsProps | undefined;
};

export function MainLayout(props: Props) {
  const {
    children,
    locale,
    locales,
    locationsSectionData,
    mapBg,
    headerResources,
    footerResources,
    applyCMP,
    nutritionalInformationDocs,
  } = props;

  const pathname = usePathname()?.toLowerCase();

  const showFindOurStoreSection = Boolean(
    pathname !== PAGE_PATHS.HOME && !pathname.includes(PAGE_PATHS.LOCATIONS),
  );

  const {
    countryData: { countryModules },
  } = useData();

  const useLegalNotice = Boolean(
    isModuleOn(countryModules, STATIC_MODULES.LEGALNOTICE),
  );

  return (
    <div className="flex min-h-screen w-full flex-col justify-between">
      <DesktopHeader
        locale={locale}
        locales={locales}
        resources={headerResources}
      />

      <main className="flex w-full flex-grow flex-col">{children}</main>

      <ScrollToTop
        className={cn(
          applyCMP
            ? "bottom-20 right-6 z-[99] md:bottom-28 md:right-[52px] rtl:bottom-24 rtl:right-8 rtl:md:bottom-36 rtl:md:right-[58px]"
            : "bottom-6 right-5",
        )}
      />

      {showFindOurStoreSection && locationsSectionData && (
        <FindOurStore
          locationsSectionData={locationsSectionData}
          mapBg={mapBg}
        />
      )}

      <Footer
        locale={locale}
        resources={footerResources}
        nutritionalInformationDocs={nutritionalInformationDocs}
      />
    </div>
  );
}
