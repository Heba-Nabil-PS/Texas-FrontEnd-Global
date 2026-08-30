import { getTranslations } from "next-intl/server";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { getAdvancedContentCategoryData } from "@/modules/informative/services/advanced-content.service";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { LocationsView } from "@/views/locations/LocationsView";
import type { LocationsPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface LocationsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: LocationsPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.LOCATION,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function LocationsPage(props: LocationsPageProps) {
  const { locale  } = await props.params;

  const headerLocationsResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.LOCATIONS,
  );
  const headerLocations = headerLocationsResponse?.results;

  const t = await getTranslations();

  const resources: LocationsPageResourcesProps = {
    Home: t("Home"),
    ourstores: t("ourstores"),
    "discover-the-nearest-one": t("discover-the-nearest-one"),
    GetDirections: t("GetDirections"),
    getcoupons: t("getcoupons"),
    allowLocationMsg: t("allowLocationMsg"),
    farFromLocation: t("farFromLocation"),
    openDaily: t("openDaily"),
    phoneNumber: t("phoneNumber"),
  };

  return (
    <LocationsView
      headerLocations={headerLocations?.[0]}
      resources={resources}
    />
  );
}
