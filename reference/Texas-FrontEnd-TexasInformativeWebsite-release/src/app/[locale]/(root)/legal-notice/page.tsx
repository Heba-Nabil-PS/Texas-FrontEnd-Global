import { notFound } from "next/navigation";
import { STATIC_MODULES } from "@/constants/country-modules";
import { isModuleOn } from "@/lib";
import { getCountryData } from "@/modules/country/services/country.service";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { getAdvancedContentCategoryData } from "@/modules/informative/services/advanced-content.service";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import type { Metadata } from "next";
import LegalNoticeView from "@/views/legal-notice/LegalNoticeView";

interface LegalNoticePageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata({
  params,
}: LegalNoticePageProps): Promise<Metadata> {
  try {
    const { locale } = await params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.LEGAL_NOTICE,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function LegalNoticePage(props: LegalNoticePageProps) {
  const { locale } = await props.params;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.LEGALNOTICE,
    ),
  );

  if (!isPageOn) {
    return notFound();
  }

  const headerLegalResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.LEGAL_NOTICE,
  );

  const headerLegal = headerLegalResponse?.results;

  const legalNoticeData = headerLegal?.[0];

  if (!legalNoticeData) {
    return notFound();
  }

  return <LegalNoticeView headerLegal={legalNoticeData} />;
}
