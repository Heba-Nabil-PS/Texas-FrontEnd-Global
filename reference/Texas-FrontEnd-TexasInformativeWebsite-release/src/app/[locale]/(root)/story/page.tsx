import { getTranslations } from "next-intl/server";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import {
  getAdvancedContentCategoryContentsData,
  getAdvancedContentCategoryData,
  getAdvancedContentCategoryMediaData,
} from "@/modules/informative/services/advanced-content.service";
import { notFound } from "next/navigation";
import { getCountryData } from "@/modules/country/services/country.service";
import { isModuleOn } from "@/lib";
import { STATIC_MODULES } from "@/constants/country-modules";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import StoryPageView from "@/views/story/StoryPageView";
import type { Metadata } from "next";
import type { StoryPageResourcesProps } from "@/types/resources";
import { MediaTypeEnum } from "@/modules/informative/types/advanced-content.types";

interface StoryPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: StoryPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.STORY,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

const StoryPage = async (props: StoryPageProps) => {
  const params = await props.params;
  const { locale } = params;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.STORY,
    ),
  );

  if (!isPageOn) {
    notFound();
  }

  const storyPageCategoryResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.STORY,
  );
  const storyPageCategoryData = storyPageCategoryResponse?.results;

  const ourStoryData = storyPageCategoryData?.find(
    (category) => category.PageTitle?.trim()?.toLowerCase() === "our_story",
  );
  const ourStoryMediaResponse = await getAdvancedContentCategoryMediaData(
    locale,
    ourStoryData?.InstanceUniqueName || "",
    ourStoryData?.UniqueName || "",
  );

  const ourStoryMedia = ourStoryMediaResponse?.results;
  const ourStoryVideos = ourStoryMedia?.filter(
    (item) => item.Type === MediaTypeEnum.Video,
  );
  //history
  const ourHistoryData = storyPageCategoryData?.find(
    (category) => category.PageTitle?.trim()?.toLowerCase() === "our_history",
  );
  const historyMediaResponse = await getAdvancedContentCategoryMediaData(
    locale,
    ourHistoryData?.InstanceUniqueName || "",
    ourHistoryData?.UniqueName || "",
  );

  const historyMedia = historyMediaResponse?.results;

  // our values
  const ourValuesData = storyPageCategoryData?.find(
    (category) => category.PageTitle?.trim()?.toLowerCase() === "our_values",
  );

  const ourValuesContentDataResults =
    await getAdvancedContentCategoryContentsData(
      locale,
      ourValuesData?.InstanceUniqueName || "",
      ourValuesData?.UniqueName || "",
    );
  const ourValuesContentData = ourValuesContentDataResults?.results;

  // revisiting traditional craftsmanship
  const revisitingTraditionalCraftsmanshipData = storyPageCategoryData?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() ===
      "revisiting_traditional_craftsmanship",
  );

  // Mission and Vision Data
  const missionAndVisionCategroy = storyPageCategoryData?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "mission_vision",
  );

  const missionAndVisionResponse = missionAndVisionCategroy
    ? await getAdvancedContentCategoryContentsData(
        locale,
        missionAndVisionCategroy?.InstanceUniqueName || "",
        missionAndVisionCategroy?.UniqueName || "",
      )
    : undefined;
  const missionAndVisionData = missionAndVisionResponse?.results;

  const builtOnTexasData = storyPageCategoryData?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "built_standards",
  );
  const builtOnTexasMediaResponse = await getAdvancedContentCategoryMediaData(
    locale,
    builtOnTexasData?.InstanceUniqueName || "",
    builtOnTexasData?.UniqueName || "",
  );

  const builtOnTexasMediaData = builtOnTexasMediaResponse?.results;

  const t = await getTranslations();

  const resources: StoryPageResourcesProps = {
    next: t("next"),
    prev: t("prev"),
    Home: t("Home"),
  };

  return (
    <StoryPageView
      locale={locale}
      resources={resources}
      ourStoryData={ourStoryData}
      ourStoryVideos={ourStoryVideos}
      ourHistoryData={ourHistoryData}
      historyMedia={historyMedia}
      ourValuesData={ourValuesData}
      ourValuesContentData={ourValuesContentData}
      revisitingTraditionalCraftsmanshipData={
        revisitingTraditionalCraftsmanshipData
      }
      missionAndVisionData={missionAndVisionData}
      builtOnTexasData={builtOnTexasData}
      builtOnTexasMediaData={builtOnTexasMediaData}
    />
  );
};

export default StoryPage;
