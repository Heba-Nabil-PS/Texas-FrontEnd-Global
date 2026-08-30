import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { displayInOrder, isModuleOn } from "@/lib";
import { getFaqsData } from "@/modules/faq/services/faq.service";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { getAdvancedContentCategoryData } from "@/modules/informative/services/advanced-content.service";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { getCountryData } from "@/modules/country/services/country.service";
import { STATIC_MODULES } from "@/constants/country-modules";
import { FaqViewPage } from "@/views/faq/FaqViewPage";
import type { FAQPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface FaqPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: FaqPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.FAQ,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function FaqPage(props: FaqPageProps) {
  const { locale  } = await props.params;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(countryResults?.countryData?.countryModules, STATIC_MODULES.FAQ),
  );

  if (!isPageOn) {
    return notFound();
  }

  const headerFAQResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.FAQ,
  );
  const headerFAQ = headerFAQResponse?.results;

  const faqsResponse = await getFaqsData(locale);
  const faqsResults = faqsResponse?.results;
  const faqs = displayInOrder(faqsResults);

  const t = await getTranslations();

  const resources: FAQPageResourcesProps = {
    Home: t("Home"),
    FAQs: t("FAQs"),
  };

  return (
    <FaqViewPage
      locale={locale}
      faqs={faqs}
      headerFAQ={headerFAQ![0]}
      resources={resources}
    />
  );
}
