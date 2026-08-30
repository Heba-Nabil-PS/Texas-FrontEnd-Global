import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCategories } from "@/modules/menu/services/category.service";
import { displayInOrder, isModuleOn } from "@/lib";
import { buildMetaData } from "@/modules/seo/seo.utils";
import { getCountryData } from "@/modules/country/services/country.service";
import { STATIC_MODULES } from "@/constants/country-modules";
import { getCategoryItems } from "@/modules/menu/services/category-item.service";
import { CategoryItemView } from "@/views/menu/CategoryItemView";
import type { MenuPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface CategoryPageProps {
  params: Promise<{
    category: string;
    locale: string;
  }>;
}

export async function generateMetadata(
  props: CategoryPageProps,
): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale, category } = params;

    const categoriesResponse = await getCategories(locale);
    const categoriesResults = categoriesResponse?.results;

    const categories = displayInOrder(categoriesResults);
    const currentCategory = categories.find(
      (item) => item.uniqueCode === category,
    );

    if (!currentCategory) throw new Error("No meta data found");

    return await buildMetaData({
      metaData: currentCategory,
    });
  } catch {
    return {};
  }
}

export default async function CategoryPage(props: CategoryPageProps) {
  const params = await props.params;
  const { category, locale } = params;

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
  const currentCategory = categories.find(
    (item) => item.uniqueCode === category,
  );

  if (!currentCategory) {
    return notFound();
  }

  const categoryItemsResponse = await getCategoryItems(locale, category);
  const categoryItemsResults = categoryItemsResponse?.results;

  const categoryData = displayInOrder(categoryItemsResults);

  if (!categoryData || categoryData?.length === 0) {
    return notFound();
  }

  const t = await getTranslations();

  const resources: MenuPageResourcesProps = {
    Home: t("Home"),
    Menu: t("Menu"),
  };

  return (
    <CategoryItemView
      categories={categories}
      currentCategory={currentCategory}
      categoryData={categoryData}
      locale={locale}
      resources={resources}
      categorySlug={decodeURIComponent(category)}
    />
  );
}
