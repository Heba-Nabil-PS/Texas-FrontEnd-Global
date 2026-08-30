"use client";

import { motion } from "motion/react";
import { PAGE_PATHS } from "@/constants/page-paths";
import { NextLink } from "@/components/global/next-link";
import { CategoryProps } from "@/modules/menu/types/category.type";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { NextImage } from "@/components/global/next-image";
import type { MenuPageResourcesProps } from "@/types/resources";
import type {
  // AdvancedContentCategoryDocsProps,
  AdvancedContentCategoryProps,
} from "@/modules/informative/types/advanced-content.types";
import { domSanitize } from "@/lib/domSanitize";
import { displayInOrder } from "@/lib";
// import { Button } from "@/components/ui/button";

interface MenuPageViewProps {
  menuData: CategoryProps[];
  resources: MenuPageResourcesProps;
  headerMenu: AdvancedContentCategoryProps | undefined;
  // nutritionalInformationDocs: AdvancedContentCategoryDocsProps | undefined;
}

export function MenuPageView(props: MenuPageViewProps) {
  const {
    menuData,
    resources,
    headerMenu,
    // nutritionalInformationDocs
  } = props;

  const orderedData = displayInOrder(menuData);

  return (
    <div className="min-h-screen pt-20 lg:pt-28 rtl:lg:pt-36">
      {/* Hero Section */}
      <div className="relative z-10 mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { href: PAGE_PATHS.HOME, name: resources["Home"] },
            {
              href: PAGE_PATHS.MENU,
              name: headerMenu?.Name || resources["Menu"],
            },
          ]}
        />
      </div>

      <div className="container mt-4 flex items-center justify-center text-center md:mt-8 md:h-auto md:max-w-[80vw] rtl:mt-8">
        <div className="mx-auto w-[95%] md:w-10/12 xl:w-[85%]">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {headerMenu?.DescriptionLong?.trim() && (
              <div
                className="text-center ltr:[&_sup]:!me-[5px] ltr:[&_sup]:lg:!ms-[10px]"
                dangerouslySetInnerHTML={{
                  __html: domSanitize(headerMenu.DescriptionLong?.trim()),
                }}
              />
            )}
          </motion.div>
        </div>
      </div>

      {/* Menu Categories Grid */}
      <div className="container mx-auto mb-10 mt-3 px-4">
        <div className="grid grid-cols-2 gap-x-4 gap-y-6 sm:gap-x-6 lg:grid-cols-4 lg:gap-10">
          {orderedData.map((category) => (
            <NextLink
              key={category.id}
              href={`/menu/${category.uniqueCode}`}
              className="group relative flex flex-col items-center gap-y-2 overflow-hidden rounded-2xl transition-colors duration-300"
            >
              {/* Main Item (Centered) */}
              {category.imageActual?.trim() && (
                <div className="relative aspect-square w-full max-w-xs overflow-hidden transition-transform duration-700 group-hover:scale-105">
                  <NextImage
                    src={category.imageActual}
                    alt={category.name}
                    fill
                    className="h-auto w-full object-contain"
                  />
                </div>
              )}

              {/* Hover Overlay (Hidden by default) */}
              <div className="absolute inset-0 z-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

              {/* Top-Left Content (Hidden by default) */}
              <div className="relative z-30 w-full text-center font-extrabold uppercase text-third transition-opacity duration-500 group-hover:text-primary ltr:font-texas rtl:font-cairo">
                <h2 className="text-lg font-extrabold sm:text-3xl">
                  {category.name}
                </h2>
              </div>
            </NextLink>
          ))}
        </div>

        {/* {nutritionalInformationDocs?.URL && (
          <div className="mt-10 flex items-center justify-center">
            <Button asChild>
              <NextLink
                href={nutritionalInformationDocs.URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {nutritionalInformationDocs.Name}
              </NextLink>
            </Button>
          </div>
        )} */}
      </div>
    </div>
  );
}

// Don't remove this
const serverClasses =
  "font-texas text-3xl sm:text-[5vw] font-extrabold uppercase text-primary md:leading-[5rem] xl:text-[6rem] !leading-tight rtl:!leading-normal text-third-800/80 mt-6 mx-auto max-w-3xl text-center text-base md:text-xl mb-4  text-4xl md:text-8xl !font-extrabold rtl:mt-12";
