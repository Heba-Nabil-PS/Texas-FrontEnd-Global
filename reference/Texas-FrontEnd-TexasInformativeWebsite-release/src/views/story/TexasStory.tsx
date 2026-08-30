"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";
import { PAGE_PATHS } from "@/constants/page-paths";
import { NextLink } from "@/components/global/next-link";
import { Button } from "@/components/ui/button";
import type {
  AdvancedContentCategoryMediaProps,
  AdvancedContentCategoryProps,
} from "@/modules/informative/types/advanced-content.types";

interface TexasStoryProps {
  storyVideoData: AdvancedContentCategoryProps;
  storyVideo: AdvancedContentCategoryMediaProps[];
  locale: string;
}

const TexasStory = (props: TexasStoryProps) => {
  const { storyVideoData, storyVideo, locale } = props;

  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (bgRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * -0.15; // Adjust speed as needed
        bgRef.current.style.transform = `translateY(${rate}px)`;
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const defaultVideo =
    storyVideo?.find((video) => video.Prima) || storyVideo?.[0];
  const arVideo = storyVideo?.find((video) => !video.Prima) || storyVideo?.[0];

  return (
    <section className="relative bg-[#f0ebe9]">
      <div className="flex justify-center max-md:mb-10">
        <video
          className="m-auto h-auto w-full object-contain"
          autoPlay
          muted
          loop
          playsInline
        >
          <source
            src={locale === "ar" ? arVideo?.Video : defaultVideo?.Video}
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div className="relative flex justify-center">
        <div className="sr-only">
          <h2>{defaultVideo?.Name}</h2>
          <p>{defaultVideo?.ShortDescription}</p>
        </div>
        {storyVideoData?.Source1?.trim() && (
          <Button
            asChild
            className="absolute bottom-0 mb-4 border-none bg-primary px-6 py-2 font-texas text-base font-bold uppercase tracking-wider text-white hover:bg-secondary max-md:mb-3 sm:mt-4 sm:w-auto sm:min-w-40 md:text-lg"
          >
            <NextLink href={storyVideoData?.Link1?.trim() || PAGE_PATHS.STORY}>
              {storyVideoData?.Source1?.trim()}
            </NextLink>
          </Button>
        )}
      </div>

      <Script type="application/ld+json" id="story-video">
        {`
      {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "${defaultVideo?.Name || ""}",
        "description": "A video showcasing the story of Texas Chicken.",
        "thumbnailUrl": [
          "${defaultVideo?.ActualImage || "/images/story.jpg"}"
        ],
        "uploadDate": "2023-01-01",
        "duration": "PT1M30S",
        "contentUrl": "${defaultVideo?.Video}",
        "videoQuality": "HD",
        "contentRating": "General",
        "interactionCount": "100000"
      }
      `}
      </Script>
    </section>
  );
};

export default TexasStory;
