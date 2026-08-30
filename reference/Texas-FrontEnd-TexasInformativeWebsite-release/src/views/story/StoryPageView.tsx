"use client";

import { LazyMotion } from "motion/react";
import { domAnimation } from "motion/react";
import MissionVisionSection from "./MissionVisionSection";

import {
  AdvancedContentCategoryMediaProps,
  AdvancedContentCategoryProps,
} from "@/modules/informative/types/advanced-content.types";
import TexasValuesSection from "./TexasValuesSection";
import type { StoryPageResourcesProps } from "@/types/resources";
import HistorySection from "./HistorySection";
import WhatWeStandForSection from "./WhatWeStandForSection";
import CommunitySection from "./CommunitySection";
import { displayInOrder } from "@/lib";

interface StoryPageProps {
  locale: string;
  resources: StoryPageResourcesProps;
  ourStoryData: AdvancedContentCategoryProps | undefined;
  ourStoryVideos: AdvancedContentCategoryMediaProps[] | undefined;
  ourHistoryData: AdvancedContentCategoryProps | undefined;
  historyMedia: AdvancedContentCategoryMediaProps[] | undefined;
  ourValuesData: AdvancedContentCategoryProps | undefined;
  ourValuesContentData: AdvancedContentCategoryProps[] | undefined;
  revisitingTraditionalCraftsmanshipData:
    | AdvancedContentCategoryProps
    | undefined;
  missionAndVisionData: AdvancedContentCategoryProps[] | undefined;
  builtOnTexasData: AdvancedContentCategoryProps | undefined;
  builtOnTexasMediaData: AdvancedContentCategoryMediaProps[] | undefined;
}

const StoryPageView = (props: StoryPageProps) => {
  const {
    locale,
    resources,
    ourStoryData,
    ourStoryVideos,
    ourHistoryData,
    historyMedia,
    ourValuesData,
    ourValuesContentData,
    revisitingTraditionalCraftsmanshipData,
    missionAndVisionData,
    builtOnTexasData,
    builtOnTexasMediaData,
  } = props;

  return (
    <LazyMotion features={domAnimation}>
      <>
        {ourStoryData && ourHistoryData && historyMedia && (
          <HistorySection
            locale={locale}
            ourStoryData={ourStoryData}
            ourStoryVideos={ourStoryVideos || []}
            resources={resources}
          />
        )}

        {builtOnTexasData && (
          <TexasValuesSection
            data={builtOnTexasData}
            builtOnTexasMediaData={builtOnTexasMediaData}
            locale={locale}
          />
        )}

        {ourValuesData && ourValuesContentData && (
          <WhatWeStandForSection
            locale={locale}
            ourValuesData={ourValuesData}
            ourValuesContentData={ourValuesContentData}
          />
        )}

        {missionAndVisionData && (
          <MissionVisionSection
            data={displayInOrder(missionAndVisionData, "Order")}
            locale={locale}
          />
        )}

        {revisitingTraditionalCraftsmanshipData && (
          <CommunitySection
            locale={locale}
            revisitingTraditionalCraftsmanshipData={
              revisitingTraditionalCraftsmanshipData
            }
          />
        )}
      </>
    </LazyMotion>
  );
};

export default StoryPageView;
