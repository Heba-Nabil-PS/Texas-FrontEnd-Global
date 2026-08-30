import TexasStory from "../story/TexasStory";
import BannerHero from "./banner/BannerHero";
import DownloadAppSection from "./downloadApp/DownloadAppSection";
import WhatPeopleSay from "./testimonials/WhatPeopleSay";
import { HomeFeaturedCategories } from "@/modules/menu/components/home-featured-categories";
import { DiscoverTexas } from "./banner/DiscoverTexas";
import NewOffer from "./offers/NewOffer";
import BannerHeroMobile from "./banner/BannerHeroMobile";
import { LazyMotionWrapper } from "@/components/global/lazy-motion-wrapper";
import { BannerProps } from "@/modules/banners/types/banners.types";
import {
  AdvancedContentCategoryMediaProps,
  AdvancedContentCategoryProps,
} from "@/modules/informative/types/advanced-content.types";
import { FindTexas } from "./FindTexas";

interface HomeViewProps {
  locale: string;
  banners?: BannerProps[];
  introVideo: AdvancedContentCategoryMediaProps | undefined;
  storyVideoData: AdvancedContentCategoryProps | undefined;
  storyVideo: AdvancedContentCategoryMediaProps[] | undefined;
  newAtTexasData: AdvancedContentCategoryProps | undefined;
  testimonialsData: AdvancedContentCategoryProps | undefined;
  testimonialsContentData: AdvancedContentCategoryProps[] | undefined;
  discoverTexasData: AdvancedContentCategoryProps | undefined;
  downloadAppData: AdvancedContentCategoryProps | undefined;
  downloadAppVideo: AdvancedContentCategoryMediaProps[] | undefined;
  exploreMenuData: AdvancedContentCategoryProps | undefined;
  findYourNearstData: AdvancedContentCategoryProps | undefined;
  findYourNearestMedia: AdvancedContentCategoryMediaProps[] | undefined;
}
const HomeView = (props: HomeViewProps) => {
  const {
    locale,
    banners,
    introVideo,
    storyVideoData,
    storyVideo,
    newAtTexasData,
    testimonialsData,
    testimonialsContentData,
    discoverTexasData,
    downloadAppData,
    downloadAppVideo,
    exploreMenuData,
    findYourNearstData,
    findYourNearestMedia,
  } = props;

  return (
    <div className="block w-full">
      <LazyMotionWrapper>
        {introVideo && <BannerHero introVideo={introVideo} />}

        {introVideo && <BannerHeroMobile introVideo={introVideo} />}

        {storyVideoData && storyVideo && storyVideo?.length > 0 && (
          <TexasStory
            storyVideoData={storyVideoData}
            storyVideo={storyVideo}
            locale={locale}
          />
        )}

        {newAtTexasData &&
          banners &&
          banners?.filter((item) => !item.video?.trim())?.length > 0 && (
            <NewOffer banners={banners} locale={locale} data={newAtTexasData} />
          )}
      </LazyMotionWrapper>

      {exploreMenuData && (
        <HomeFeaturedCategories
          locale={locale}
          exploreMenuData={exploreMenuData}
        />
      )}

      <LazyMotionWrapper>
        {testimonialsData && (
          <WhatPeopleSay
            testimonialsData={testimonialsData}
            testimonialsContentData={testimonialsContentData}
            locale={locale}
          />
        )}

        {discoverTexasData && (
          <DiscoverTexas discoverTexasData={discoverTexasData} />
        )}

        {((downloadAppVideo && downloadAppVideo?.length > 0) ||
          downloadAppData) && (
          <DownloadAppSection
            downloadAppData={downloadAppData}
            downloadAppVideo={downloadAppVideo}
            locale={locale}
          />
        )}

        {findYourNearstData && (
          <FindTexas data={findYourNearstData} medias={findYourNearestMedia} />
        )}
      </LazyMotionWrapper>
    </div>
  );
};

export default HomeView;
