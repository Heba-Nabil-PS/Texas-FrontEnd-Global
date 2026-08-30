import { displayInOrder } from "@/lib";
import { getBannersData } from "@/modules/banners/services/banners.service";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import {
  getAdvancedContentCategoryContentsData,
  getAdvancedContentCategoryData,
  getAdvancedContentCategoryMediaData,
} from "@/modules/informative/services/advanced-content.service";
import { MediaTypeEnum } from "@/modules/informative/types/advanced-content.types";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import HomeView from "@/views/home/HomeView";
import type { Metadata } from "next";

interface HomePageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(
  props: HomePageProps,
): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.HOME,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function HomePage(props: HomePageProps) {
  const { locale } = await props.params;

  const bannersResponse = await getBannersData(locale);
  const bannersResults = bannersResponse?.results;
  const banners = displayInOrder(bannersResults);

  const homePageCategoryResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.HOME,
  );
  const homePageCategoryData = homePageCategoryResponse?.results;

  const introVideoData = homePageCategoryData?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "texas_video_banner",
  );
  const introVideoMediaResponse = await getAdvancedContentCategoryMediaData(
    locale,
    introVideoData?.InstanceUniqueName || "",
    introVideoData?.UniqueName || "",
  );

  const introVideo = introVideoMediaResponse?.results?.[0];

  const storyVideoData = homePageCategoryData?.find(
    (category) => category.PageTitle?.trim()?.toLowerCase() === "story_video",
  );
  const storyVideoMediaResponse = await getAdvancedContentCategoryMediaData(
    locale,
    storyVideoData?.InstanceUniqueName || "",
    storyVideoData?.UniqueName || "",
  );

  const storyVideo = storyVideoMediaResponse?.results?.filter(
    (item) => item.Type === MediaTypeEnum.Video,
  );

  const newAtTexasData = homePageCategoryData?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "new_at_texas_chicken",
  );

  const testimonialsData = homePageCategoryData?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "what_people_say",
  );

  const exploreMenuData = homePageCategoryData?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "explore_our_menu",
  );

  const testimonialsContentDataResults =
    await getAdvancedContentCategoryContentsData(
      locale,
      testimonialsData?.InstanceUniqueName || "",
      testimonialsData?.UniqueName || "",
    );
  const testimonialsContentData = testimonialsContentDataResults?.results;

  const discoverTexasData = homePageCategoryData?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "discover_texas_chicken",
  );
  const downloadAppData = homePageCategoryData?.find(
    (category) => category.PageTitle?.trim()?.toLowerCase() === "download_app",
  );
  const downloadAppMediaResponse = await getAdvancedContentCategoryMediaData(
    locale,
    downloadAppData?.InstanceUniqueName || "",
    downloadAppData?.UniqueName || "",
  );
  const downloadAppVideo = downloadAppMediaResponse?.results?.filter(
    (item) => item.Type === MediaTypeEnum.Video,
  );

  const findYourNearstData = homePageCategoryData?.find(
    (category) =>
      category.PageTitle?.trim()?.toLowerCase() === "find_your_nearest_store",
  );
  const findYourNearestMediaResponse =
    await getAdvancedContentCategoryMediaData(
      locale,
      findYourNearstData?.InstanceUniqueName || "",
      findYourNearstData?.UniqueName || "",
    );
  const findYourNearestMedia = findYourNearestMediaResponse?.results?.filter(
    (item) => item.Type === MediaTypeEnum.Image,
  );

  return (
    <HomeView
      locale={locale}
      banners={banners}
      introVideo={introVideo}
      storyVideoData={storyVideoData}
      storyVideo={storyVideo}
      newAtTexasData={newAtTexasData}
      testimonialsData={testimonialsData}
      testimonialsContentData={testimonialsContentData}
      discoverTexasData={discoverTexasData}
      downloadAppData={downloadAppData}
      downloadAppVideo={downloadAppVideo}
      exploreMenuData={exploreMenuData}
      findYourNearstData={findYourNearstData}
      findYourNearestMedia={findYourNearestMedia}
    />
  );
}
