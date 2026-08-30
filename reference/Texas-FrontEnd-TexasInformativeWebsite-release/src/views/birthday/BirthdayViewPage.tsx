"use client";

import { motion as m } from "motion/react";
import { PAGE_PATHS } from "@/constants/page-paths";
import { NextImage } from "@/components/global/next-image";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { BirthdayForm } from "./BirthdayForm";
import type { BirthdayPageResourcesProps } from "@/types/resources";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import { domSanitize } from "@/lib/domSanitize";

interface BirthdayViewPageProps {
  locale: string;
  resources: BirthdayPageResourcesProps;
  headerBirthday: AdvancedContentCategoryProps | undefined;
}

export function BirthdayViewPage(props: BirthdayViewPageProps) {
  const { locale, resources, headerBirthday } = props;

  return (
    <div className="min-h-screen bg-white pt-16 md:pt-28">
      <div className="mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { href: PAGE_PATHS.HOME, name: resources["Home"] },
            { href: PAGE_PATHS.BIRTHDAY, name: resources["birthday"] },
          ]}
        />
      </div>

      <div className="flex flex-col items-center text-center">
        <m.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
          style={{ fontSize: "clamp(48px, 16vw, 160px)" }}
        >
          {headerBirthday?.Name}
        </m.h1>
        {headerBirthday?.DescriptionLong?.trim() && (
          <div
            dangerouslySetInnerHTML={{
              __html: domSanitize(headerBirthday.DescriptionLong?.trim()),
            }}
          />
        )}
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid items-center gap-12 md:grid-cols-2">
          {/* Left Side - Image */}
          {headerBirthday?.ImageUrl && (
            <div className="relative h-96 overflow-hidden rounded-xl md:h-[500px]">
              <NextImage
                src={headerBirthday?.ImageUrl || ""}
                alt={headerBirthday?.ImageAlt || "Birthday Party Celebration"}
                fill
                className="object-cover"
              />
            </div>
          )}

          {/* Right Side - Form */}
          <div className="rounded-xl bg-white p-6 shadow-lg md:p-8">
            <h2 className="mb-6 text-2xl font-bold text-gray-800 md:text-3xl">
              {headerBirthday?.Source1}
            </h2>

            <BirthdayForm locale={locale} resources={resources} />
          </div>
        </div>
      </div>
    </div>
  );
}
