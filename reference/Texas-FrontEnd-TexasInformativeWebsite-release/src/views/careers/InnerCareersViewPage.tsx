"use client";

import { motion as m } from "motion/react";
import { PAGE_PATHS } from "@/constants/page-paths";
import { Button } from "@/components/ui/button";
import { NextLink } from "@/components/global/next-link";
import { SingleCareerProps } from "@/modules/careers/types/singleCreer.type";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import { domSanitize } from "@/lib/domSanitize";
import CareerForm from "./careerForm";
import type { InnerCareerResourcesProps } from "@/types/resources";

interface InnerCareersViewPageProps {
  uniqueCode: string;
  jobData: SingleCareerProps;
  locale: string;
  resources: InnerCareerResourcesProps;
}

export function InnerCareersViewPage(props: InnerCareersViewPageProps) {
  const { uniqueCode, jobData, locale, resources } = props;

  return (
    <section className="min-h-screen bg-white py-28">
      {/* Breadcrumb */}
      <div className="relative z-10 mt-6 flex justify-center px-4 md:mt-10">
        <CustomBreadCrumb
          data={[
            { name: resources["Home"], href: PAGE_PATHS.HOME },
            { name: resources["careers"], href: PAGE_PATHS.CAREER },
            {
              name: jobData.title?.toLowerCase(),
              href: `${PAGE_PATHS.CAREER}/${uniqueCode}`,
            },
          ]}
        />
      </div>

      <div className="flex flex-col items-center px-4 text-center">
        <m.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
          style={{
            fontSize: "clamp(40px, 10vw, 100px)",
            wordBreak: "break-word",
          }}
        >
          {jobData.title}
        </m.h1>
      </div>

      {/* Job Details */}
      <div className="container mx-auto py-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 md:grid-cols-4">
            {/* Job Description - Left Side */}
            <div className="md:col-span-2">
              <div className="sticky top-32">
                <h2 className="mb-3 mt-6 text-3xl font-bold capitalize">
                  {resources["about-the-job"]}
                </h2>

                <span className="mb-2 inline-block rounded-full bg-gray-100 px-3 py-1 text-lg text-gray-500">
                  {new Date(jobData.showDate).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
                {jobData.description?.trim() && (
                  <div
                    className="prose job-description max-w-none"
                    dangerouslySetInnerHTML={{
                      __html: domSanitize(jobData.description?.trim()),
                    }}
                  />
                )}

                <div className="pt-4">
                  <Button
                    asChild
                    className="rounded-full text-sm font-medium uppercase transition-colors"
                  >
                    <NextLink href={PAGE_PATHS.CAREER}>
                      {resources["back-to-careers"]}
                    </NextLink>
                  </Button>
                </div>
              </div>
            </div>

            {/* Application Form - Right Side */}
            <div className="md:col-span-2">
              <CareerForm
                locale={locale}
                uniqueCode={jobData?.uniqueCode}
                resources={resources}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
