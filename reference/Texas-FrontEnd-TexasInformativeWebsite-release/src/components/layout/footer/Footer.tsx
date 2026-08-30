"use client";

import { ChevronDownIcon } from "lucide-react";
import { NextImage } from "@/components/global/next-image";
import { NextLink } from "@/components/global/next-link";
import { useData } from "@/components/providers/data-provider";
import { STATIC_MODULES } from "@/constants/country-modules";
import { PAGE_PATHS } from "@/constants/page-paths";
import { isModuleOn, isTexasVersion } from "@/lib";
import { domSanitize } from "@/lib/domSanitize";
import { SocialMediaPlatforms } from "@/components/global/social-media-platforms";
import { getUniqueFeaturedAggregators } from "@/modules/country/utils/country-aggregators";
import type { FooterResourcesProps } from "@/types/resources";
import type {
  CountryAggregatorsProps,
  CountrySocialMediasProps,
} from "@/modules/country/types/country.types";
import { FIXED_ENV_VARIABLES } from "@/constants";
import { AdvancedContentCategoryDocsProps } from "@/modules/informative/types/advanced-content.types";

type Link = {
  href: string;
  text?: string;
  icon?: React.ReactNode;
  label?: string;
  isOn: boolean;
  isExternal?: boolean;
};

type FooterColumn = {
  heading: string;
  links: Link[];
  socialLinks: CountrySocialMediasProps[];
  aggregators: CountryAggregatorsProps[];
};

interface FooterProps {
  locale: string;
  resources: FooterResourcesProps;
  nutritionalInformationDocs: AdvancedContentCategoryDocsProps | undefined;
}

export function Footer(props: FooterProps) {
  const { locale, resources, nutritionalInformationDocs } = props;

  const {
    countryData: {
      countryModules,
      countrySocialMedias,
      countryAggregators,
      isoCode,
    },
  } = useData();

  const useTermsPage = Boolean(
    isModuleOn(countryModules, STATIC_MODULES.FOOTER_TERMSANDCONDITION),
  );
  const usePrivacyPage = Boolean(
    isModuleOn(countryModules, STATIC_MODULES.FOOTER_PRIVACY),
  );
  const useHalalPage = Boolean(
    isModuleOn(countryModules, STATIC_MODULES.HALAL),
  );
  const useDelivery = Boolean(
    isModuleOn(countryModules, STATIC_MODULES.FOOTERDELIVERY),
  );
  const featuredAggregators = getUniqueFeaturedAggregators(
    countryAggregators || [],
  );
  const useLegalNotice = Boolean(
    isModuleOn(countryModules, STATIC_MODULES.LEGALNOTICE),
  );

  const showFollowUs =
    (countrySocialMedias?.length || 0) > 0 || featuredAggregators?.length > 0;

  const footerColumns: FooterColumn[] = [
    {
      heading: resources["abouttexas"],
      links: [
        {
          text: resources["ourstory"],
          href: PAGE_PATHS.STORY,
          isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.STORY)),
          isExternal: false,
        },
        {
          text: resources["Menu"],
          href: PAGE_PATHS.MENU,
          isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.MENU)),
          isExternal: false,
        },
        {
          text:
            nutritionalInformationDocs?.Name ||
            resources["Nutritional_Information"],
          href: nutritionalInformationDocs?.URL || "#",
          isOn:
            Boolean(
              isModuleOn(countryModules, STATIC_MODULES.NUTRITIONALINFORMATION),
            ) && !!nutritionalInformationDocs,
          isExternal: true,
        },
        {
          text: resources["Locations"],
          href: PAGE_PATHS.LOCATIONS,
          isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.LOCATION)),
          isExternal: false,
        },
        {
          text: resources["HALAL"]?.toLowerCase(),
          href: PAGE_PATHS.HALAL,
          isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.HALAL)),
          isExternal: false,
        },
      ]?.filter((item) => item.isOn),
      socialLinks: [],
      aggregators: [],
    },
    {
      heading: resources["discovertexas"],
      links: [
        {
          text: resources["Coupons"],
          href: PAGE_PATHS.COUPONS,
          isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.COUPON)),
          isExternal: false,
        },
        // { text: resources["rewards"], href: PAGE_PATHS.REWARDS, isOn: true },
        {
          text: resources["Catring"],
          href: PAGE_PATHS.CATRING,
          isOn: Boolean(
            isModuleOn(countryModules, STATIC_MODULES.ADVANCEDCATRING),
          ),
          isExternal: false,
        },
        {
          text: resources["Blog"],
          href: PAGE_PATHS.BLOGS,
          isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.BLOG)),
          isExternal: false,
        },
        {
          text: resources["appData"],
          href: PAGE_PATHS.APPDATA,
          isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.APPPAGE)),
          isExternal: false,
        },
      ]?.filter((item) => item.isOn),
      socialLinks: [],
      aggregators: [],
    },
    {
      heading: resources["letstalk"],
      links: [
        {
          text: resources["Contactus"],
          href: PAGE_PATHS.CONTACT,
          isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.CONTACT)),
          isExternal: false,
        },
        {
          text: resources["FAQs"],
          href: PAGE_PATHS.FAQ,
          isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.FAQ)),
          isExternal: false,
        },
        {
          text: resources["party"],
          href: PAGE_PATHS.PARTY,
          isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.BIRTHDAY)),
          isExternal: false,
        },
        {
          text: resources["birthday"],
          href: PAGE_PATHS.BIRTHDAY,
          isOn: Boolean(
            isModuleOn(countryModules, STATIC_MODULES.BIRTHDAYFORM),
          ),
          isExternal: false,
        },
      ]?.filter((item) => item.isOn),
      socialLinks: [],
      aggregators: [],
    },
    {
      heading: resources["Footer_Workwithus"],
      links: [
        {
          text: resources["franchiseopportunities"],
          href: FIXED_ENV_VARIABLES.FRANCHISE_LINK,
          isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.FRANCHISING)),
          isExternal: true,
        },
        {
          text: resources["careers"],
          href: PAGE_PATHS.CAREER,
          isOn: Boolean(
            isModuleOn(countryModules, STATIC_MODULES.CAREER) ||
            isModuleOn(countryModules, STATIC_MODULES.CAREERADVANCED),
          ),
          isExternal: false,
        },
      ]?.filter((item) => item.isOn),
      socialLinks: [],
      aggregators: [],
    },
  ]?.filter(
    (col) =>
      col.links?.length > 0 ||
      col.socialLinks?.length > 0 ||
      col?.aggregators?.length > 0,
  );

  const isTexas = isTexasVersion();
  const isCanada = isoCode?.toLowerCase() === "can";

  const logoSrc = isCanada
    ? "/images/Churchs-Logo-new.svg"
    : isTexas
      ? locale === "ar"
        ? "/images/Texas-w-ar.png"
        : "/images/Texas-w.png"
      : "/images/churchs-logo.svg";

  return (
    <footer className="bg-third px-4 pb-4 pt-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="space-y-4 md:hidden">
          {footerColumns.map((col) => (
            <details key={col.heading} className="group">
              <summary className="flex cursor-pointer items-center justify-between py-2 capitalize">
                <p className="font-texas text-lg font-bold text-white">
                  {col.heading}
                </p>
                <ChevronDownIcon className="size-5 transform text-white transition-transform duration-200 group-open:rotate-180" />
              </summary>

              {col.links?.length > 0 && (
                <div className="mt-2 space-y-2 ps-4">
                  {col.links.map((link, index) => (
                    <NextLink
                      key={index}
                      href={link.href}
                      className="flex w-fit font-texas text-base capitalize text-gray-200 transition-colors hover:text-white"
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                    >
                      {link.text}
                    </NextLink>
                  ))}
                </div>
              )}

              {col.socialLinks?.length > 0 && (
                <SocialMediaPlatforms
                  data={col.socialLinks}
                  className="my-2 gap-4 ps-4"
                  linkClassName="[&_svg]:size-6 text-white"
                />
              )}

              {col.aggregators?.length > 0 && (
                <div className="my-4">
                  <p className="mb-3 font-texas text-lg font-bold capitalize text-white">
                    {resources["OrderNow"]}
                  </p>

                  <ul className="flex flex-wrap gap-x-2 gap-y-1">
                    {col.aggregators?.map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.url || item.mobileURL || ""}
                          aria-label={item.alt || "aggregator"}
                          className="flex shrink-0 items-center justify-center transition-transform hover:scale-105"
                          title={item.alt || "aggregator"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {(item.imageThumbnail || item.imageActual) && (
                            <NextImage
                              src={
                                item.imageThumbnail || item.imageActual || ""
                              }
                              alt={item.alt || "aggregator"}
                              width={40}
                              height={40}
                              className="size-10 object-contain"
                            />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </details>
          ))}

          {showFollowUs && (
            <div>
              <p className="py-2 font-texas text-lg font-bold capitalize text-white">
                {resources["followus"]}
              </p>

              {(countrySocialMedias?.length || 0) > 0 && (
                <SocialMediaPlatforms
                  data={countrySocialMedias || []}
                  className="my-2 gap-4 ps-4"
                  linkClassName="[&_svg]:size-6 text-white"
                />
              )}

              {featuredAggregators?.length > 0 && (
                <div className="my-4">
                  <p className="mb-3 font-texas text-lg font-bold capitalize text-white">
                    {resources["OrderNow"]}
                  </p>

                  <ul className="flex flex-wrap gap-x-2 gap-y-1">
                    {featuredAggregators?.map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.url || item.mobileURL || ""}
                          aria-label={item.alt || "aggregator"}
                          className="flex shrink-0 items-center justify-center transition-transform hover:scale-105"
                          title={item.alt || "aggregator"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {(item.imageThumbnail || item.imageActual) && (
                            <NextImage
                              src={
                                item.imageThumbnail || item.imageActual || ""
                              }
                              alt={item.alt || "aggregator"}
                              width={40}
                              height={40}
                              className="size-10 object-contain"
                            />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Desktop Grid */}
        <div className="hidden flex-wrap gap-8 pb-8 md:flex">
          {footerColumns.map((col) => (
            <div className="flex-1" key={col.heading}>
              <p className="mb-3 font-texas text-lg font-bold capitalize text-white">
                {col.heading}
              </p>

              {col.links?.length > 0 && (
                <div className="space-y-2">
                  {col.links.map((link, index) => (
                    <NextLink
                      key={index}
                      href={link.href}
                      className="flex w-fit font-texas text-base capitalize text-gray-200 transition-colors hover:text-white"
                      target={link.isExternal ? "_blank" : undefined}
                      rel={link.isExternal ? "noopener noreferrer" : undefined}
                    >
                      {link.text}
                    </NextLink>
                  ))}
                </div>
              )}

              {col.socialLinks?.length > 0 && (
                <SocialMediaPlatforms
                  data={col.socialLinks}
                  className="gap-4"
                  linkClassName="[&_svg]:size-6 text-gray-200 transition-colors hover:text-white"
                />
              )}

              {col.aggregators?.length > 0 && (
                <div className="mt-4">
                  <p className="mb-3 font-texas text-lg font-bold capitalize text-white">
                    {resources["OrderNow"]}
                  </p>

                  <ul className="flex flex-wrap gap-x-2 gap-y-1">
                    {col.aggregators?.map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.url || item.mobileURL || ""}
                          aria-label={item.alt || "aggregator"}
                          className="flex shrink-0 items-center justify-center transition-transform hover:scale-105"
                          title={item.alt || "aggregator"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {(item.imageThumbnail || item.imageActual) && (
                            <NextImage
                              src={
                                item.imageThumbnail || item.imageActual || ""
                              }
                              alt={item.alt || "aggregator"}
                              width={40}
                              height={40}
                              className="size-10 object-contain"
                            />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}

          {showFollowUs && (
            <div className="flex-1">
              <p className="mb-3 font-texas text-lg font-bold capitalize text-white">
                {resources["followus"]}
              </p>

              {(countrySocialMedias?.length || 0) > 0 && (
                <SocialMediaPlatforms
                  data={countrySocialMedias || []}
                  className="gap-4"
                  linkClassName="[&_svg]:size-6 text-gray-200 transition-colors hover:text-white"
                />
              )}

              {featuredAggregators?.length > 0 && (
                <div className="mt-4">
                  <p className="mb-3 font-texas text-lg font-bold capitalize text-white">
                    {resources["OrderNow"]}
                  </p>

                  <ul className="flex flex-wrap gap-x-2 gap-y-1">
                    {featuredAggregators?.map((item) => (
                      <li key={item.id}>
                        <a
                          href={item.url || item.mobileURL || ""}
                          aria-label={item.alt || "aggregator"}
                          className="flex shrink-0 items-center justify-center transition-transform hover:scale-105"
                          title={item.alt || "aggregator"}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {(item.imageThumbnail || item.imageActual) && (
                            <NextImage
                              src={
                                item.imageThumbnail || item.imageActual || ""
                              }
                              alt={item.alt || "aggregator"}
                              width={40}
                              height={40}
                              className="size-10 object-contain"
                            />
                          )}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        <hr className="my-2 border-black/20" />

        <div className="flex flex-col items-center justify-between gap-y-4 lg:flex-row lg:gap-y-0">
          <div className="flex items-center gap-x-2 lg:flex-1">
            <NextLink
              href={PAGE_PATHS.HOME}
              className="flex items-center justify-center"
            >
              <NextImage
                src={logoSrc}
                alt="Texas Logo"
                width={65}
                height={65}
                className="size-[65px] object-contain"
              />
            </NextLink>

            {useHalalPage && (
              <NextLink
                href={PAGE_PATHS.HALAL}
                className="flex items-center justify-center"
              >
                <NextImage
                  src="/images/halal-w.png"
                  alt="Halal Logo"
                  width={65}
                  height={65}
                  className="size-[65px] object-contain"
                />
              </NextLink>
            )}

            {useDelivery && (
              <NextImage
                src={
                  locale === "ar"
                    ? "/images/delivery_rtl.png"
                    : "/images/delivery_ltr.png"
                }
                alt="Delivery Logo"
                width={160}
                height={65}
                className="h-[65px] w-auto object-contain"
              />
            )}
          </div>

          {/* Legal links */}
          {(useTermsPage || usePrivacyPage || useLegalNotice) && (
            <nav className="flex items-center gap-4 text-sm text-gray-300 lg:flex-1">
              {useTermsPage && (
                <NextLink
                  href={PAGE_PATHS.TERMS}
                  className="font-texas capitalize transition-colors hover:text-white hover:underline"
                >
                  {resources["Terms_Conditions"]}
                </NextLink>
              )}
              {useTermsPage && usePrivacyPage && (
                <span aria-hidden="true" className="text-gray-500">
                  |
                </span>
              )}

              {usePrivacyPage && (
                <NextLink
                  href={PAGE_PATHS.PRIVACY}
                  className="font-texas capitalize transition-colors hover:text-white hover:underline"
                >
                  {resources["PrivacyPolicy"]}
                </NextLink>
              )}

              {useLegalNotice && (
                <>
                  <span aria-hidden="true" className="text-gray-500">
                    |
                  </span>

                  <NextLink
                    href={PAGE_PATHS.LEGAL_NOTICE}
                    className="font-texas capitalize transition-colors hover:text-white hover:underline"
                  >
                    {resources["legalNotice"]}
                  </NextLink>
                </>
              )}
            </nav>
          )}

          {/* rights */}
          <p
            className="text-center text-sm text-gray-300 sm:text-end lg:flex-1 ltr:whitespace-pre"
            style={{ unicodeBidi: "isolate" }}
          >
            &copy;
            <span
              dangerouslySetInnerHTML={{
                __html: domSanitize(resources["Footer_rights"]),
              }}
            />
            <a
              href="https://psdigital.me"
              target="_blank"
              rel="noopener"
              className="ms-1"
            >
              PSdigital
            </a>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
