"use client";

import { useRef } from "react";
import Script from "next/script";
import { AdvancedContentCategoryMediaProps } from "@/modules/informative/types/advanced-content.types";
import {
  domAnimation,
  LazyMotion,
  useScroll,
  useTransform,
  motion,
} from "motion/react";

interface BannerHeroProps {
  introVideo: AdvancedContentCategoryMediaProps;
}

const BannerHero = ({ introVideo }: BannerHeroProps) => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const maskSize = useTransform(scrollYProgress, [0, 0.5], ["30px", "300vh"]);
  const playButtonOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const shortDescription = introVideo?.ShortDescription ?? "";
  // Arabic is a cursive, connected script. letter-spacing and method="stretch"
  // sever the glyph joins, so detect RTL content and disable both for it.
  const isRTL = /[؀-ۿݐ-ݿࢠ-ࣿ]/.test(
    shortDescription,
  );

  return (
    <LazyMotion features={domAnimation}>
      <section
        ref={sectionRef}
        className="relative z-30 h-[300vh] w-full bg-third max-md:hidden"
      >
        <div className="sticky top-0 flex h-screen w-full items-center justify-center overflow-hidden">
          <h1 className="sr-only">{introVideo?.Name}</h1>
          <motion.video
            className="max-md-!transform-none absolute size-full object-cover"
            autoPlay
            muted
            loop
            playsInline
            style={{
              WebkitMaskImage: useTransform(
                maskSize,
                (size) =>
                  `radial-gradient(circle at 50% 50%, black ${size}, transparent ${size})`,
              ),
              maskImage: useTransform(
                maskSize,
                (size) =>
                  `radial-gradient(circle at 50% 50%, black ${size}, transparent ${size})`,
              ),
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "cover",
              maskSize: "cover",
              pointerEvents: "none",
            }}
          >
            <source src={introVideo?.Video} type="video/mp4" />
            Your browser does not support the video tag.
          </motion.video>
          <motion.div
            className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center"
            style={{
              width: maskSize,
              height: maskSize,
              borderRadius: "50%",
              background: "transparent",
              overflow: "visible",
              pointerEvents: "none",
            }}
          >
            {/* Circular Text */}
            <motion.svg
              width="100%"
              height="100%"
              viewBox="0 0 400 400"
              className={`pointer-events-none absolute left-0 top-0 h-full w-full font-extrabold ${
                isRTL ? "font-cairo" : "font-texas"
              }`}
              style={{
                zIndex: 2,
                WebkitMaskImage: useTransform(
                  maskSize,
                  (size) =>
                    `radial-gradient(circle at 50% 50%, black ${size}, transparent ${size})`,
                ),
                maskImage: useTransform(
                  maskSize,
                  (size) =>
                    `radial-gradient(circle at 50% 50%, black ${size}, transparent ${size})`,
                ),
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
                WebkitMaskPosition: "center",
                maskPosition: "center",
                WebkitMaskSize: "cover",
                maskSize: "cover",
              }}
              animate={{ rotate: 360 }}
              transition={{
                duration: 20,
                ease: "linear",
                repeat: Infinity,
              }}
            >
              <defs>
                <path
                  id="circlePath"
                  d="M200,200 m-130,0 a130,130 0 1,1 260,0 a130,130 0 1,1 -260,0"
                />
              </defs>
              <text
                fill="#b12028"
                fontSize="46"
                fontWeight="extrabold"
                letterSpacing={isRTL ? "0" : "1.5"}
                direction={isRTL ? "rtl" : undefined}
              >
                <textPath
                  xlinkHref="#circlePath"
                  startOffset="0"
                  textAnchor="middle"
                  method={isRTL ? "align" : "stretch"}
                  spacing="auto"
                >
                  {shortDescription}
                  {/* • SCROLL FOR MORE FLAVOR •
                  SCROLL FOR MORE FLAVOR • SCROLL FOR MORE FLAVOR • */}
                </textPath>
              </text>
            </motion.svg>
            {/* Play Button */}
            <motion.svg
              width="60"
              height="60"
              viewBox="0 0 32 32"
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              style={{
                zIndex: 3,
                opacity: playButtonOpacity,
              }}
            >
              <g>
                <g data-name="Layer 2">
                  <path
                    d="M16 2a9.01 9.01 0 0 0-9 9v10a9 9 0 0 0 18 0V11a9.01 9.01 0 0 0-9-9zm7 19a7 7 0 0 1-14 0V11a7 7 0 0 1 14 0z"
                    fill="#fff"
                    opacity="1"
                    data-original="#fff"
                  />
                  <motion.path
                    d="M16 8a1 1 0 0 0-1 1v4a1 1 0 0 0 2 0V9a1 1 0 0 0-1-1z"
                    fill="#fff"
                    opacity="1"
                    data-original="#fff"
                    initial={{ y: 0 }}
                    animate={{
                      y: [0, 6, 0],
                      opacity: [1, 0.8, 1],
                    }}
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: Infinity,
                      repeatType: "loop",
                    }}
                  />
                </g>
              </g>
            </motion.svg>
          </motion.div>
        </div>
        <Script type="application/ld+json" id="banner-video">
          {`
      {
        "@context": "https://schema.org",
        "@type": "VideoObject",
        "name": "${introVideo?.Name}",
        "description": "A video showcasing the story of Texas Chicken.",
        "thumbnailUrl": [
          "/images/intro.jpg"
        ],
        "uploadDate": "2023-01-01",
        "duration": "PT1M30S",
        "contentUrl": "/images/intro.mp4",
        "videoQuality": "HD",
        "contentRating": "General",
        "interactionCount": "100000"
      }
      `}
        </Script>
      </section>
    </LazyMotion>
  );
};

export default BannerHero;
