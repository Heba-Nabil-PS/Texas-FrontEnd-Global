"use client";

import { domAnimation, LazyMotion } from "motion/react";
import { MailIcon } from "lucide-react";
import { PAGE_PATHS } from "@/constants/page-paths";
import { ContactForm } from "./ContactForm";
import { NextImage } from "@/components/global/next-image";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import type { ContactPageResourcesProps } from "@/types/resources";
import type { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import { domSanitize } from "@/lib/domSanitize";

interface ContactViewPageProps {
  locale: string;
  resources: ContactPageResourcesProps;
  headercontact: AdvancedContentCategoryProps | undefined;
}

export function ContactViewPage(props: ContactViewPageProps) {
  const { locale, resources, headercontact } = props;

  return (
    <LazyMotion features={domAnimation}>
      <section className="relative pt-8 md:pt-24">
        {headercontact?.ImageUrl && (
          <NextImage
            src={headercontact?.ImageUrl}
            alt={headercontact?.ImageAlt || headercontact?.Name}
            fill
            className="-z-10 object-cover"
          />
        )}
        {locale === "ar" && headercontact?.ImageUrl && (
          <div className="absolute inset-0 -z-10 bg-black/50" />
        )}
        <div className="container mx-auto px-4 py-12">
          {/* Page Header */}
          <div className="mb-6 text-center sm:mb-12">
            <div className="relative z-10">
              <CustomBreadCrumb
                wrapperClassName="flex items-center justify-center my-6"
                linksClassName="text-white"
                separatorClassName="text-white"
                data={[
                  { name: resources["Home"], href: PAGE_PATHS.HOME },
                  {
                    name: headercontact?.Name || resources["contact"],
                    href: PAGE_PATHS.CONTACT,
                  },
                ]}
              />
            </div>

            <h1 className="font-texas text-4xl font-extrabold uppercase text-primary sm:mb-4 md:text-8xl">
              {headercontact?.Name}
            </h1>
          </div>

          <div className="grid items-start gap-y-6 md:grid-cols-2 lg:gap-12">
            {/* Contact Information */}
            <div className="top-36 space-y-8 md:sticky">
              <div className="rounded-xl md:p-8">
                <h2 className="mb-6 hidden text-4xl font-extrabold uppercase text-primary md:block md:text-6xl ltr:font-texas rtl:font-cairo">
                  {headercontact?.DescriptionShort}
                </h2>

                {/* Contact Item - Address */}
                <div className="mb-6 flex items-start gap-4">
                  {headercontact?.DescriptionLong?.trim() && (
                    <div
                      dangerouslySetInnerHTML={{
                        __html: domSanitize(
                          headercontact?.DescriptionLong?.trim(),
                        ),
                      }}
                    />
                  )}
                </div>

                {/* Contact Item - Email */}
                {headercontact?.Link1 && (
                  <div className="flex items-start gap-4">
                    <div className="rounded-full bg-primary/10 p-2">
                      <MailIcon className="size-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {headercontact?.Source1}
                      </h3>
                      <a
                        href={`mailto:${headercontact?.Link1}`}
                        className="text-white hover:underline"
                      >
                        {headercontact?.Link1}
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Contact Form */}
            <div className="rounded-3xl bg-third/90 p-8 shadow-lg">
              <h2 className="mb-6 text-2xl font-bold text-secondary">
                {headercontact?.Source2}
              </h2>

              <ContactForm locale={locale} resources={resources} />
            </div>
          </div>
        </div>
      </section>
    </LazyMotion>
  );
}
