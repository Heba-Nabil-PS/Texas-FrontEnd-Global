import { notFound } from "next/navigation";
import { STATIC_MODULES } from "@/constants/country-modules";
import { isModuleOn } from "@/lib";
import { getCountryData } from "@/modules/country/services/country.service";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { getAdvancedContentCategoryData } from "@/modules/informative/services/advanced-content.service";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import TermsPageView from "@/views/terms/TermsPageView";
import type { Metadata } from "next";

interface TermsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: TermsPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.TERMS,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function TermsPage(props: TermsPageProps) {
  const { locale  } = await props.params;
  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.FOOTER_TERMSANDCONDITION,
    ),
  );

  if (!isPageOn) {
    return notFound();
  }

  const headerTerrmsResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.TERMS,
  );
  const headerTerrms = headerTerrmsResponse?.results;

  const termsData = headerTerrms?.[0];

  if (!termsData) {
    return notFound();
  }

  return <TermsPageView headerTerrms={termsData} />;
}
