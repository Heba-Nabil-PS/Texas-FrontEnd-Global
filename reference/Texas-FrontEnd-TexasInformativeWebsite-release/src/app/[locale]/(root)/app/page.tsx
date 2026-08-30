import { notFound } from "next/navigation";
import { STATIC_MODULES } from "@/constants/country-modules";
import { isModuleOn } from "@/lib";
import { getCountryData } from "@/modules/country/services/country.service";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import { getAdvancedContentCategoryData } from "@/modules/informative/services/advanced-content.service";
import AppDataView from "@/views/app-data/AppDataView";
import type { Metadata } from "next";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";

interface AppDataPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: AppDataPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.APPDATA,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}
const AppPage = async (props: AppDataPageProps) => {
  const { locale  } = await props.params;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.APPPAGE,
    ),
  );

  if (!isPageOn) {
    return notFound();
  }

  const appDataResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.APP_DATA,
  );
  const appDataResults = appDataResponse?.results;

  const AppDataBannerData = appDataResults?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "app_data_banner",
  );
  const DiscoverMoreWithTheAppData = appDataResults?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() ===
      "discover_more_with_the_app",
  );
  const TreatYourselfData = appDataResults?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "treat_yourself",
  );

  return (
    <AppDataView
      AppDataBannerData={AppDataBannerData}
      DiscoverMoreWithTheAppData={DiscoverMoreWithTheAppData}
      TreatYourselfData={TreatYourselfData}
    />
  );
};

export default AppPage;
