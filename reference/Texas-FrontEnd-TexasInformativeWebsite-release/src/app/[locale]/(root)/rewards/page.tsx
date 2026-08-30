import { displayInOrder } from "@/lib";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import {
  getAdvancedContentCategoryContentsData,
  getAdvancedContentCategoryData,
} from "@/modules/informative/services/advanced-content.service";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import RewardsViewPage from "@/views/rewards/RewardsViewPage";
import type { Metadata } from "next";

interface RewardsPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: RewardsPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.REWARDS,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

const RewardsPage = async (props: RewardsPageProps) => {
  const { locale  } = await props.params;

  const rewardsPageCategoryResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.REWARDS,
  );
  const rewardsPageCategoryData = rewardsPageCategoryResponse?.results;

  const introData = rewardsPageCategoryData?.find(
    (category) => category.PageTitle?.trim()?.toLowerCase() === "rewards_intro",
  );
  const introducingData = rewardsPageCategoryData?.find(
    (category) => category.PageTitle?.trim()?.toLowerCase() === "introducing",
  );
  const tierListData = rewardsPageCategoryData?.find(
    (category) => category.PageTitle?.trim()?.toLowerCase() === "tier_list",
  );

  const introContentResponse = await getAdvancedContentCategoryContentsData(
    locale,
    introData?.InstanceUniqueName || "",
    introData?.UniqueName || "",
  );
  const introContentData = displayInOrder(
    introContentResponse?.results,
    "Order",
  );

  return (
    <RewardsViewPage
      locale={locale}
      introData={introData}
      introducingData={introducingData}
      tierListData={tierListData}
      introContentData={introContentData}
    />
  );
};

export default RewardsPage;
