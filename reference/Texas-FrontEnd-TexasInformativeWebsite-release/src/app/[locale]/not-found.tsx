import NotFound from "@/components/global/NotFound";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { getAdvancedContentCategoryData } from "@/modules/informative/services/advanced-content.service";
import { getLocale } from "next-intl/server";

export default async function NotFoundPage() {
  const locale = await getLocale();
  try {
    const notFoundPageCategoryResponse = await getAdvancedContentCategoryData(
      locale,
      ADVANCED_CONTENT_INSTANCES.NOT_FOUND,
    );
    const notFoundData = notFoundPageCategoryResponse?.results?.[0];

    return <NotFound notFoundData={notFoundData} />;
  } catch (error) {
    console.error("Error in NotFoundPage:", error);
    return <NotFound notFoundData={undefined} />;
  }
}
