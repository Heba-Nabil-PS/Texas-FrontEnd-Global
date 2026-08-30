import { notFound } from "next/navigation";
import { getCategories } from "@/modules/menu/services/category.service";
import { displayInOrder, isModuleOn } from "@/lib";
import { getCountryData } from "@/modules/country/services/country.service";
import { STATIC_MODULES } from "@/constants/country-modules";
import { getMenuItem } from "@/modules/menu/services/menu-item.service";
import { getCategoryItems } from "@/modules/menu/services/category-item.service";
import MenuItemView from "@/views/menu/MenuItemView";

type MenuItemPageProps = {
  params: Promise<{
    locale: string;
    category: string;
    "menu-item": string;
  }>;
};

export default async function MenuItemPage(props: MenuItemPageProps) {
  const params = await props.params;
  const { locale, category, "menu-item": menuItem } = params;

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

  const menuItemResponse = await getMenuItem(locale, category, menuItem);
  const menuItemResult = menuItemResponse?.results;

  if (!menuItemResult) {
    return notFound();
  }

  const categoryItemsResponse = await getCategoryItems(locale, category);
  const categoryItemsResults = categoryItemsResponse?.results;
  const categoryData = displayInOrder(categoryItemsResults) || [];

  return (
    <MenuItemView
      locale={locale}
      categoryId={category}
      itemId={menuItem}
      categories={categories}
      currentCategory={currentCategory}
      menuItem={menuItemResult}
      categoryItems={categoryData}
    />
  );
}
