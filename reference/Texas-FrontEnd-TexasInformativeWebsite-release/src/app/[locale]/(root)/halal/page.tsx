import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { STATIC_MODULES } from "@/constants/country-modules";
import { isModuleOn } from "@/lib";
import { getCountryData } from "@/modules/country/services/country.service";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import {
  getAdvancedContentCategoryData,
  getCategoryDocs,
} from "@/modules/informative/services/advanced-content.service";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import HalalPageView from "@/views/halal/HalalPageView";
import type { Metadata } from "next";

interface HalalPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: HalalPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.HALAL,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

const HalalPage = async (props: HalalPageProps) => {
  const { locale } = (await props.params);

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.HALAL,
    ),
  );

  if (!isPageOn) {
    return notFound();
  }

  const halalPageCategoryResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.HALAL,
  );
  const halalPageCategoryData = halalPageCategoryResponse?.results;

  const halalIntroData = halalPageCategoryData?.find(
    (category) => category.PageTitle?.trim()?.toLowerCase() === "halal_intro",
  );
  const aboutHalalData = halalPageCategoryData?.find(
    (category) => category.PageTitle?.trim()?.toLowerCase() === "about_halal",
  );
  const secondHalalData = halalPageCategoryData?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "halal_second_section",
  );
  const certificationHalalData = halalPageCategoryData?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "certification_halal",
  );

  const t = await getTranslations();

  const resources = {
    Home: t("Home"),
  };

  const halalDocsResponse = certificationHalalData
    ? await getCategoryDocs(
        locale,
        certificationHalalData?.InstanceUniqueName,
        certificationHalalData?.UniqueName,
      )
    : undefined;

  const halalDocs = halalDocsResponse?.results?.[0];

  return (
    <HalalPageView
      halalIntroData={halalIntroData}
      aboutHalalData={aboutHalalData}
      secondHalalData={secondHalalData}
      certificationHalalData={certificationHalalData}
      resources={resources}
      halalDocs={halalDocs}
    />
  );
};

export default HalalPage;
