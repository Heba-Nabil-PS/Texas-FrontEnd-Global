import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { STATIC_MODULES } from "@/constants/country-modules";
import {
  getAdvancedContentCategoryData,
  getCategoryDocs,
} from "@/modules/informative/services/advanced-content.service";
import { displayInOrder, isModuleOn } from "@/lib";
import { getCountryData } from "@/modules/country/services/country.service";
import { getCategories } from "@/modules/menu/services/category.service";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { MenuPageView } from "@/views/menu/MenuPageView";
import type { MenuPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface MenuPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  props: MenuPageProps,
): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.MENU,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function MenuPage(props: MenuPageProps) {
  const { locale } = await props.params;

  const headerMenuResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.MENU,
  );
  const headerMenu = headerMenuResponse?.results;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.MENU,
    ),
  );

  if (!isPageOn) {
    notFound();
  }

  const categoriesResponse = await getCategories(locale);
  const categoriesResults = categoriesResponse?.results;

  const categories = displayInOrder(categoriesResults);

  if (!categories || categories?.length === 0) return null;

  // const nutritionalInformationCategoryResponse =
  //   await getAdvancedContentCategoryData(
  //     locale,
  //     ADVANCED_CONTENT_INSTANCES.NUTRITIONAL_INFORMATION,
  //   );
  // const nutritionalInformationCategory =
  //   nutritionalInformationCategoryResponse?.results?.[0];
  // const nutritionalInformationMediaResponse = await getCategoryDocs(
  //   locale,
  //   nutritionalInformationCategory?.InstanceUniqueName || "",
  //   nutritionalInformationCategory?.UniqueName || "",
  // );
  // const nutritionalInformationDocs =
  //   nutritionalInformationMediaResponse?.results?.[0];

  const t = await getTranslations();

  const resources: MenuPageResourcesProps = {
    Home: t("Home"),
    Menu: t("Menu"),
  };

  return (
    <MenuPageView
      menuData={categories}
      resources={resources}
      headerMenu={headerMenu?.[0]}
      // nutritionalInformationDocs={nutritionalInformationDocs}
    />
  );
}
