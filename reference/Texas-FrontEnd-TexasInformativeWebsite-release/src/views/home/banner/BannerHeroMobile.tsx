"use client";

import { motion } from "motion/react";
import { AdvancedContentCategoryMediaProps } from "@/modules/informative/types/advanced-content.types";

interface BannerHeroMobileProps {
  introVideo: AdvancedContentCategoryMediaProps;
}

const BannerHeroMobile = ({ introVideo }: BannerHeroMobileProps) => {
  return (
    <div className="relative h-[50vh] w-full md:hidden">
      <motion.video
        className="absolute h-full w-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        preload="auto"
      >
        <source src={introVideo?.Video} type="video/mp4" />
        Your browser does not support the video tag.
      </motion.video>
    </div>
  );
};

export default BannerHeroMobile;
