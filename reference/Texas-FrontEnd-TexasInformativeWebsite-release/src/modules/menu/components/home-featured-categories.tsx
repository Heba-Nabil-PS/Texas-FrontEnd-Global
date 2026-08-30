import { getFeaturedCategories } from "../services/category.service";
import { displayInOrder } from "@/lib";
import MenuSection from "@/views/home/menuCateg/MenuSection";
import type { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";

interface HomeFeaturedCategoriesProps {
  locale: string;
  exploreMenuData: AdvancedContentCategoryProps;
}

export async function HomeFeaturedCategories(
  props: HomeFeaturedCategoriesProps,
) {
  const { locale, exploreMenuData } = props;

  const featuredCategoriesResponse = await getFeaturedCategories(locale);
  const featuredCategoriesResults = featuredCategoriesResponse?.results;

  const featuredCategories = displayInOrder(featuredCategoriesResults);

  if (!featuredCategories || featuredCategories?.length === 0) return null;

  return (
    <MenuSection
      data={featuredCategories}
      locale={locale}
      exploreMenuData={exploreMenuData}
    />
  );
}
