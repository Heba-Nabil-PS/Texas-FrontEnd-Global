"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { domSanitize } from "@/lib/domSanitize";
import { PAGE_PATHS } from "@/constants/page-paths";
import { NextImage } from "@/components/global/next-image";
import { NextLink } from "@/components/global/next-link";
import { Button } from "@/components/ui/button";
import { CategoryProps } from "@/modules/menu/types/category.type";
import type { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";

interface MenuSectionProps {
  data: CategoryProps[];
  locale: string;
  exploreMenuData: AdvancedContentCategoryProps;
}
// Mobile Menu Component
const MobileMenu = (props: MenuSectionProps) => {
  const { data, exploreMenuData } = props;

  return (
    <div className="px-4 pb-8 lg:hidden">
      <div className="w-full p-6 text-center">
        {exploreMenuData?.DescriptionLong?.trim() && (
          <div
            className="font-texas text-5xl font-extrabold uppercase text-secondary lg:text-9xl"
            dangerouslySetInnerHTML={{
              __html: domSanitize(exploreMenuData?.DescriptionLong?.trim()),
            }}
          />
        )}
        {exploreMenuData?.DescriptionShort?.trim() && (
          <p className="sr-only pt-8 text-center">
            {exploreMenuData?.DescriptionShort?.trim()}
          </p>
        )}
      </div>

      {/* Remaining items in 2-column grid */}
      <div className="grid grid-cols-2 gap-4">
        {data.map((item) => (
          <NextLink
            href={`${PAGE_PATHS.MENU}/${item.uniqueCode}`}
            key={`mobile-${item.uniqueCode}`}
            className="group relative aspect-square"
          >
            {(item.homePageImage?.trim() || item.imageActual?.trim()) && (
              <NextImage
                src={item.homePageImage?.trim() || item.imageActual?.trim()}
                alt={item.alt || item.name}
                width={500}
                height={400}
                className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
              />
            )}
            {item.name?.trim() && (
              <div className="p-2">
                <h3
                  role="heading"
                  className="text-center text-sm font-bold uppercase text-black ltr:font-texas"
                >
                  {item.name}
                </h3>
              </div>
            )}
          </NextLink>
        ))}
      </div>
    </div>
  );
};

const MenuSection = (props: MenuSectionProps) => {
  const { data, locale, exploreMenuData } = props;

  const scrollContainerRef = useRef<HTMLDivElement>(null); // Ref for the tall scroll container
  const stickySectionRef = useRef<HTMLElement>(null); // Ref for the sticky section (viewport height)
  const contentRef = useRef<HTMLDivElement>(null); // Ref for the horizontal content div
  const [contentWidth, setContentWidth] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [stickySectionHeight, setStickySectionHeight] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and resize
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is Tailwind's 'md' breakpoint
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    const handleResize = () => {
      const track = contentRef.current;
      const sticky = stickySectionRef.current;
      if (!track || !sticky) return;

      // Measure the full content width independent of text direction.
      // `scrollWidth` is unreliable for RTL content that overflows to the left
      // (browsers report it ~clientWidth), which would zero-out the horizontal
      // scroll in Arabic. Derive the width from the children's bounding boxes
      // instead — this is independent of direction and of any applied translate.
      let measured = track.scrollWidth;
      const children = Array.from(track.children) as HTMLElement[];
      if (children.length) {
        let min = Infinity;
        let max = -Infinity;
        for (const child of children) {
          const rect = child.getBoundingClientRect();
          min = Math.min(min, rect.left);
          max = Math.max(max, rect.right);
        }
        const styles = window.getComputedStyle(track);
        const padX =
          parseFloat(styles.paddingLeft || "0") +
          parseFloat(styles.paddingRight || "0");
        measured = Math.max(measured, max - min + padX);
      }

      setContentWidth(measured);
      setContainerWidth(sticky.clientWidth);
      // Measure the actual height of the sticky section after rendering, including padding
      setStickySectionHeight(sticky.offsetHeight);
    };

    // Run after layout (and once fonts/images settle) so measurements are accurate
    handleResize();
    const raf = requestAnimationFrame(handleResize);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("resize", checkIfMobile);
    };
  }, [data, locale]);

  // Track scroll progress of the tall scroll container
  const { scrollYProgress } = useScroll({
    target: scrollContainerRef,
    offset: ["start start", "end end"], // Map scroll from when the container starts entering to when it finishes leaving
  });

  // Calculate the horizontal scroll distance needed
  const xTransform = useTransform(
    scrollYProgress,
    [0, 1],
    [
      0,
      locale === "ar"
        ? contentWidth - containerWidth
        : -(contentWidth - containerWidth),
    ],
  );

  const scrollContainerHeight =
    contentWidth - containerWidth + stickySectionHeight;

  return (
    <>
      {/* Mobile Menu - Only visible on mobile */}
      <MobileMenu
        data={data}
        locale={locale}
        exploreMenuData={exploreMenuData}
      />

      {/* Desktop Menu - Hidden on mobile */}
      <div
        className="max-lg:hidden"
        ref={scrollContainerRef}
        style={{
          height: `${
            scrollContainerHeight > stickySectionHeight
              ? scrollContainerHeight
              : stickySectionHeight
          }px`,
        }}
      >
        {/* This section sticks to the top of the viewport and its height accommodates content */}
        <section
          ref={stickySectionRef}
          className="sticky top-0 flex w-full flex-col items-center justify-center overflow-x-clip px-0 py-20"
        >
          {/* Flavors List - Horizontal Scroll Container */}
          {/* This div contains the horizontally scrolling items */}
          <div className="w-full">
            <motion.div
              ref={contentRef}
              className="flex flex-row items-center gap-x-6 px-4"
              style={{ x: xTransform }}
            >
              <div>
                {exploreMenuData?.DescriptionLong?.trim() && (
                  <div
                    className="font-texas text-5xl font-extrabold uppercase text-secondary lg:text-9xl"
                    dangerouslySetInnerHTML={{
                      __html: domSanitize(
                        exploreMenuData?.DescriptionLong?.trim(),
                      ),
                    }}
                  />
                )}
                {exploreMenuData?.DescriptionShort?.trim() && (
                  <p className="sr-only pt-8 text-center">
                    {exploreMenuData?.DescriptionShort?.trim()}
                  </p>
                )}
              </div>
              {data.map((item) => (
                <div
                  key={item.id}
                  className="relative w-[300px] flex-none md:w-[500px]"
                >
                  <NextLink
                    href={`${PAGE_PATHS.MENU}/${item.uniqueCode}`}
                    className="group relative z-10 flex flex-col items-center justify-center"
                  >
                    {(item.homePageImage?.trim() ||
                      item.imageActual?.trim()) && (
                      <NextImage
                        src={
                          item.homePageImage?.trim() || item.imageActual?.trim()
                        }
                        alt={item.alt || item.name}
                        width={1000}
                        height={900}
                        className="mb-4 w-full object-cover transition-all group-hover:scale-105"
                      />
                    )}

                    {/* Displaying the category label */}
                    {item.name?.trim() && (
                      <h3
                        role="heading"
                        className="mb-2 flex min-h-[2em] items-start justify-center text-center font-texas text-3xl font-extrabold uppercase leading-none text-black transition-all group-hover:text-secondary md:text-4xl"
                      >
                        {item.name}
                      </h3>
                    )}
                  </NextLink>

                  {/* Floating Images - add as needed based on category */}
                </div>
              ))}
            </motion.div>
          </div>

          {exploreMenuData?.Source1?.trim() && (
            <div className="flex-1">
              <Button
                asChild
                className="mt-2 w-full border-none bg-primary px-6 py-2 font-texas text-sm font-bold uppercase text-white hover:bg-secondary sm:mt-8 sm:w-auto sm:text-base"
              >
                <NextLink
                  href={exploreMenuData?.Link1?.trim() || PAGE_PATHS.MENU}
                >
                  {exploreMenuData?.Source1?.trim()}
                </NextLink>
              </Button>
            </div>
          )}
        </section>
      </div>
    </>
  );
};

export default MenuSection;

// Don't remove this line
const serverClasses =
  "align-top text-2xl text-primary bg-primary px-3 p-3 text-white";
