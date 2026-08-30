"use client";

import GlobalHeading from "@/components/global/GlobalHeading";
import { m } from "motion/react";
import { useState, useEffect } from "react";
import { Brands, CategoryContentType, CategoryType } from "@/types";

type Props = {
  corporateSection: CategoryType;
  corporateContent: CategoryContentType[];
};

export default function SocialResponsibilitySection({
  corporateSection,
  corporateContent,
}: Props) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 640);
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section className="pb-10 relative bg-[url('/images/bg-gray.webp')] w-full z-30 overflow-hidden">
      <m.div
        initial={{ opacity: 0, y: 100, x: 0 }}
        whileInView={{ opacity: 1, y: 0, x: 0 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="max-md:container mx-auto flex items-center flex-col justify-center"
      >
        <GlobalHeading
          heading={corporateSection?.Name}
          headingClassName="text-secondary uppercase text-center mb-5 lg:mb-10"
          subHeadingClassName="text-primary"
        />
      </m.div>
      <div className="grid grid-cols-1 container gap-10">
        {corporateContent.map((item, i) => {
          const paddingLeft = isSmallScreen ? 0 : i * 100;

          return (
            <m.div
              key={i}
              className="flex flex-col lg:flex-row justify-start items-center gap-5"
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: i * 0.4 }}
              style={{ paddingLeft }}
            >
              <img
                src={item?.ImageUrl}
                alt={item?.Name}
                className="w-[150px] h-[200px]"
              />
              <div className="text-center lg:text-start">
                <h4 className="font-bold text-primary text-lg lg:text-xl">
                  {item?.Name}
                </h4>
                <p className="text-base lg:text-start lg:text-lg text-primary font-semibold">
                  {item?.DescriptionShort}
                </p>
              </div>
            </m.div>
          );
        })}
      </div>
    </section>
  );
}
