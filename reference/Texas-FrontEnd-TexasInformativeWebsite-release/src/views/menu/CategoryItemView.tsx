"use client";

import { useEffect, useState } from "react";
import { motion as m } from "motion/react";
import { usePathname } from "@/i18n/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import { NextLink } from "@/components/global/next-link";
import { CategoryItemProps } from "@/modules/menu/types/category-item";
import { CategoryProps } from "@/modules/menu/types/category.type";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { NextImage } from "@/components/global/next-image";
import { domSanitize } from "@/lib/domSanitize";
import { PAGE_PATHS } from "@/constants/page-paths";
import { getLocaleDirection } from "@/lib";
import type { MenuPageResourcesProps } from "@/types/resources";

interface CategoryItemViewProps {
  categories: CategoryProps[];
  currentCategory: CategoryProps;
  categoryData: CategoryItemProps[];
  locale: string;
  resources: MenuPageResourcesProps;
  categorySlug: string;
}

export function CategoryItemView(props: CategoryItemViewProps) {
  const {
    categories,
    currentCategory,
    categoryData,
    locale,
    resources,
    categorySlug,
  } = props;

  const pathname = usePathname()?.toLowerCase() || "";

  const [api, setApi] = useState<CarouselApi>();
  // Center the tabs only when they all fit; once the track overflows, keep them
  // start-aligned so dragging/scrolling can still reach every item.
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    if (!api) return;

    const update = () =>
      setIsOverflowing(api.canScrollPrev() || api.canScrollNext());

    update();
    api.on("reInit", update);
    api.on("select", update);

    return () => {
      api.off("reInit", update);
      api.off("select", update);
    };
  }, [api]);

  // Toggling justify-center changes the track layout, so Embla must re-measure
  // its scroll snaps — otherwise the last item can become unreachable by drag.
  useEffect(() => {
    api?.reInit();
  }, [api, isOverflowing]);

  // Smoothly glide the active tab into view when the route (active category)
  // changes. We also re-apply this on every Embla re-measure ("reInit"):
  // toggling isOverflowing calls api.reInit() and late-loading category images
  // resize the slides — both reset Embla's scroll position back to startIndex,
  // which would otherwise leave the active tab out of view.
  useEffect(() => {
    if (!api) return;

    const scrollToActive = () => {
      const activeIndex = categories.findIndex(
        (cat) => categorySlug === cat.uniqueCode?.trim()?.toLowerCase(),
      );

      if (activeIndex >= 0) api.scrollTo(activeIndex);
    };

    scrollToActive();
    api.on("reInit", scrollToActive);

    return () => {
      api.off("reInit", scrollToActive);
    };
  }, [api, categorySlug, categories, isOverflowing]);

  return (
    <div className="pt-16 md:pt-24">
      <div className="relative z-20 mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { href: PAGE_PATHS.HOME, name: resources["Home"] },
            { href: PAGE_PATHS.MENU, name: resources["Menu"] },
            {
              name: currentCategory.name,
              href: `${PAGE_PATHS.MENU}/${currentCategory.uniqueCode}`,
            },
          ]}
        />
      </div>

      {currentCategory.name?.trim() && (
        <div className="relative z-10 flex flex-col items-center pt-4 text-center">
          <m.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm ltr:font-texas rtl:mb-4 rtl:md:!text-8xl"
            style={{ fontSize: "clamp(32px, 10vw, 140px)" }}
          >
            {currentCategory.name}
          </m.h1>
        </div>
      )}

      {/* Sticky Tabs with Carousel */}
      {categories && categories?.length > 0 && (
        <div className="z-50 py-4">
          <div className="container mx-auto px-2">
            <div className="mx-auto w-full max-w-3xl">
              <Carousel
                setApi={setApi}
                opts={{
                  dragFree: true,
                  direction: getLocaleDirection(locale),
                  // containScroll: "trimSnaps",
                  startIndex:
                    categories.findIndex((cat) =>
                      pathname.includes(cat.uniqueCode?.trim()?.toLowerCase()),
                    ) || 0,
                }}
                className="w-full overflow-hidden rounded-full border border-primary bg-white py-1"
              >
                <CarouselContent
                  className={`ml-1 ${isOverflowing ? "" : "justify-center"}`}
                >
                  {categories.map((category) => {
                    const isActive =
                      categorySlug ===
                      category.uniqueCode?.trim()?.toLowerCase();

                    // const isActive = pathname.includes(
                    //   category.uniqueCode?.trim()?.toLowerCase(),
                    // );
                    return (
                      <CarouselItem
                        key={category.id}
                        className={`basis-auto ps-1 ${isActive ? "active-tab" : ""}`}
                        data-active={isActive}
                      >
                        <NextLink
                          href={`/menu/${category.uniqueCode}`}
                          className={`flex items-center gap-2 rounded-full px-3 py-1 transition-all duration-300 ${
                            isActive
                              ? "bg-primary text-white shadow-md"
                              : "text-primary hover:bg-primary/10"
                          } min-w-[80px] whitespace-nowrap`}
                        >
                          {category?.imageActual?.trim() && (
                            <div
                              className={`mb-1 flex h-8 w-8 items-center justify-center rounded-full ${
                                isActive ? "text-white" : "text-primary"
                              }`}
                            >
                              <NextImage
                                src={category.imageActual}
                                alt={category.alt || category.name}
                                width={32}
                                height={32}
                                className="h-full w-full object-contain"
                              />
                            </div>
                          )}
                          <span className="text-base font-bold capitalize rtl:text-xs">
                            {category.name?.toLowerCase()}
                          </span>
                        </NextLink>
                      </CarouselItem>
                    );
                  })}
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {categoryData && categoryData?.length > 0 && (
        <div className="grid grid-cols-1 gap-0.5 bg-white sm:grid-cols-2 lg:grid-cols-3">
          {categoryData.map((item) => (
            <NextLink
              href={`/menu/${currentCategory.uniqueCode}`}
              key={item.id}
              className="group relative overflow-hidden cursor-auto"
            >
              {/* Background overlay that expands from center */}
              {/* <div className="absolute inset-0 z-0 origin-center scale-0 rounded-full bg-[#e86824] transition-transform duration-700 group-hover:scale-[4]" /> */}

              {/* Content container */}
              <div className="relative z-10 flex h-full flex-col bg-white p-6 transition-colors duration-300 group-hover:bg-transparent">
                {/* Rest of your content remains the same */}
                {item.imageActual?.trim() && (
                  <div className="mb-2 h-72 overflow-hidden">
                    <NextImage
                      src={item.imageActual?.trim()}
                      alt={item.alt || item.name}
                      width={500}
                      height={500}
                      className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-90"
                    />
                  </div>
                )}

                {/* Title (Always Visible) */}
                <div className="mb-2 flex flex-col items-center justify-center space-x-1">
                  <h2 className="text-center text-2xl font-extrabold uppercase text-third group-hover:text-primary ltr:font-texas rtl:font-cairo rtl:text-xl">
                    {item.name?.trim().split("(")[0].trim()}
                  </h2>
                  <span className="block text-sm font-semibold text-primary group-hover:text-primary">
                    {item.name.split("(").slice(1).join("").replace(")", "")}
                  </span>
                  <div className="flex items-center justify-center space-x-1">
                    {item.calories?.trim() && (
                      <div>
                        <p className="flex">
                          <span>
                            <svg
                              viewBox="0 0 512 512"
                              fill="currentColor"
                              xmlns="http://www.w3.org/2000/svg"
                              aria-hidden="true"
                            >
                              <path d="M448 64h-25.98C438.44 92.28 448 125.01 448 160c0 105.87-86.13 192-192 192S64 265.87 64 160c0-34.99 9.56-67.72 25.98-96H64C28.71 64 0 92.71 0 128v320c0 35.29 28.71 64 64 64h384c35.29 0 64-28.71 64-64V128c0-35.29-28.71-64-64-64zM256 320c88.37 0 160-71.63 160-160S344.37 0 256 0 96 71.63 96 160s71.63 160 160 160zm-.3-151.94l33.58-78.36c3.5-8.17 12.94-11.92 21.03-8.41 8.12 3.48 11.88 12.89 8.41 21l-33.67 78.55C291.73 188 296 197.45 296 208c0 22.09-17.91 40-40 40s-40-17.91-40-40c0-21.98 17.76-39.77 39.7-39.94z"></path>
                            </svg>
                          </span>
                          <span>
                            <strong>Kcal:</strong> {item.calories?.trim()}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Description (Hidden by default, shows on hover) */}
                {item.description?.trim() && (
                  <div className="flex flex-1 flex-col justify-end transition-opacity duration-300 md:opacity-0 md:group-hover:opacity-100">
                    <div
                      className="mb-4 text-center text-base text-third group-hover:text-third rtl:text-sm"
                      dangerouslySetInnerHTML={{
                        __html: domSanitize(item.description?.trim()),
                      }}
                    />
                  </div>
                )}

                {/* Border Elements */}
                <div className="pointer-events-none absolute inset-0 border border-white" />
              </div>
            </NextLink>
          ))}
        </div>
      )}
    </div>
  );
}
