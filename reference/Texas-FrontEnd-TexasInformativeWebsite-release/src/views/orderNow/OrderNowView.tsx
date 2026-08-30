"use client";

import { useMemo, useState } from "react";
import { notFound } from "next/navigation";
import { domSanitize } from "@/lib/domSanitize";
import { useData } from "@/components/providers/data-provider";
import { PAGE_PATHS } from "@/constants/page-paths";
import { getLocaleDirection } from "@/lib";
import { CustomBreadCrumb } from "@/components/global/custom-breadcrumb";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { groupAggregatorsByAlt } from "@/modules/country/utils/country-aggregators";
import type { OrderNowPageResourcesProps } from "@/types/resources";
import type { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";

interface OrderNowViewProps {
  resources: OrderNowPageResourcesProps;
  headerOrderNow: AdvancedContentCategoryProps | undefined;
  locale: string;
  findDeliverySection: AdvancedContentCategoryProps | undefined;
}

const normalizeSearchValue = (value: string | null | undefined) =>
  value?.trim().toLowerCase() || "";

const getCountrySelectValue = (country: {
  isoCode: string | null | undefined;
  name: string | null | undefined;
}) => `${country.isoCode || ""}:${country.name || ""}`;

const getAggregatorHref = (url: string | null | undefined) =>
  url?.replaceAll("&amp;", "&") || "#";

const ALL_COUNTRIES_VALUE = "all";

const countryMatchesValue = (
  country: {
    isoCode: string | null | undefined;
    name: string | null | undefined;
  },
  value: string,
) => {
  if (!value) return false;

  const selectedCountry = normalizeSearchValue(value);
  const countryName = normalizeSearchValue(country.name);
  const countryIsoCode = normalizeSearchValue(country.isoCode);
  const countrySelectValue = normalizeSearchValue(
    getCountrySelectValue(country),
  );

  return (
    countrySelectValue === selectedCountry ||
    countryName === selectedCountry ||
    countryIsoCode === selectedCountry
  );
};

export function OrderNowView(props: OrderNowViewProps) {
  const { resources, headerOrderNow, locale, findDeliverySection } = props;

  const {
    countryData: { countryAggregators },
  } = useData();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");

  const groupedAggregators = useMemo(
    () => groupAggregatorsByAlt(countryAggregators || []),
    [countryAggregators],
  );

  const filteredAggregators = useMemo(() => {
    const search = normalizeSearchValue(searchTerm);

    return groupedAggregators.filter((aggregator) => {
      const matchesSelectedCountry =
        !selectedRegion ||
        aggregator.countries.some((country) =>
          countryMatchesValue(country, selectedRegion),
        );

      const matchesAggregator = normalizeSearchValue(aggregator.alt).includes(
        search,
      );
      const matchesCountry = aggregator.countries.some(
        (country) =>
          normalizeSearchValue(country.name).includes(search) ||
          normalizeSearchValue(country.isoCode).includes(search),
      );
      const matchesSearch = !search || matchesAggregator || matchesCountry;

      return matchesSelectedCountry && matchesSearch;
    });
  }, [groupedAggregators, searchTerm, selectedRegion]);

  if (!countryAggregators || countryAggregators.length === 0)
    return (
      <div className="flex-grow bg-[#faf7f2] pt-24">
        {/* Breadcrumbs */}
        <div className="relative z-10 mt-6 flex justify-center md:mt-10">
          <CustomBreadCrumb
            data={[
              { href: PAGE_PATHS.HOME, name: resources["Home"] },
              { href: PAGE_PATHS.ORDER_NOW, name: resources["OrderNow"] },
            ]}
          />
        </div>

        {headerOrderNow && (
          <div className="flex flex-col items-center px-3 py-4 text-center">
            <h1
              className="font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
              style={{ fontSize: "clamp(36px, 12vw, 160px)" }}
            >
              {headerOrderNow?.Name}
            </h1>
            {headerOrderNow?.DescriptionLong?.trim() && (
              <div
                dangerouslySetInnerHTML={{
                  __html: domSanitize(headerOrderNow?.DescriptionLong?.trim()),
                }}
                className="rtl:mt-8"
              />
            )}
          </div>
        )}

        <div className="mx-auto w-full px-3 py-10 lg:w-1/2">
          <div className="w-full overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="p-6 text-center md:p-8">
              <h2 className="text-3xl font-bold">{resources["comingSoon"]}</h2>
              <p className="mt-4 text-lg text-gray-600">
                {
                  resources[
                    "onlineOrderingAndDeliveryComingSoonSoKeepAnEyeOutAndBringYourAppetite"
                  ]
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    );

  const hasMultipleCountries = countryAggregators.length > 1;

  return (
    <div className="flex-grow bg-[#faf7f2] pt-24">
      {/* Breadcrumbs */}
      <div className="mt-6 flex justify-center md:mt-10">
        <CustomBreadCrumb
          data={[
            { href: PAGE_PATHS.HOME, name: resources["Home"] },
            { href: PAGE_PATHS.ORDER_NOW, name: resources["OrderNow"] },
          ]}
        />
      </div>

      {/* Main Title */}
      {headerOrderNow && (
        <div className="flex flex-col items-center px-3 py-4 text-center">
          <h1
            className="font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
            style={{ fontSize: "clamp(36px, 12vw, 160px)" }}
          >
            {headerOrderNow?.Name}
          </h1>
          {headerOrderNow?.DescriptionLong?.trim() && (
            <div
              dangerouslySetInnerHTML={{
                __html: domSanitize(headerOrderNow?.DescriptionLong?.trim()),
              }}
              className="rtl:mt-8"
            />
          )}
        </div>
      )}

      {/* Search and Filter Section */}
      {hasMultipleCountries && (
        <div className="container mx-auto mt-4 px-4 sm:px-6 lg:px-8">
          <div className="mx-auto lg:w-1/2">
            <div className="overflow-hidden rounded-2xl bg-white shadow-xl">
              <div className="p-6 md:p-8">
                {findDeliverySection && (
                  <div className="mb-8 text-center">
                    {findDeliverySection?.Name && (
                      <h2 className="text-3xl font-extrabold uppercase text-gray-900 sm:text-4xl">
                        {findDeliverySection?.Name}
                      </h2>
                    )}

                    {findDeliverySection?.DescriptionShort?.trim() && (
                      <p className="mt-2 text-lg text-gray-600">
                        {findDeliverySection?.DescriptionShort?.trim()}
                      </p>
                    )}
                  </div>
                )}

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <div className="relative flex-grow">
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <input
                      type="search"
                      className="block !h-[50px] w-full border-b-2 border-secondary bg-white py-3 pe-3 ps-10 shadow-sm focus:border-primary focus:outline-none"
                      placeholder="Search by country or aggregator..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

                  <div className="w-full">
                    <Select
                      value={selectedRegion || ALL_COUNTRIES_VALUE}
                      onValueChange={(value) =>
                        setSelectedRegion(
                          value === ALL_COUNTRIES_VALUE ? "" : value,
                        )
                      }
                      dir={getLocaleDirection(locale)}
                    >
                      <SelectTrigger className="!h-[50px] w-full border-b-2 border-secondary px-4 py-3 placeholder-black focus:border-primary focus-visible:ring-0 focus-visible:ring-offset-0">
                        <SelectValue placeholder="Select Country" />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value={ALL_COUNTRIES_VALUE}>All</SelectItem>
                        {countryAggregators.map((item) => (
                          <SelectItem
                            key={getCountrySelectValue(item)}
                            value={getCountrySelectValue(item)}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delivery Services Grid */}
      <div className="px-4 pb-20 pt-10">
        <div className="container mx-auto">
          <div className="flex flex-wrap justify-center gap-4">
            {filteredAggregators.map((item) => (
              <a
                key={item.id}
                href={getAggregatorHref(item.url || item.mobileURL)}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex w-full items-center justify-between rounded-lg border-2 border-secondary p-3 transition-all duration-200 hover:scale-105 hover:border-primary hover:bg-secondary sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.667rem)] xl:w-[calc(25%-0.75rem)]"
              >
                <div className="flex items-center gap-2">
                  <span className="flex size-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/80 text-2xl">
                    {item.imageActual && (
                      <img
                        src={item.imageActual}
                        alt={item.alt || "aggregator"}
                        width={64}
                        height={64}
                        className="size-16 shrink-0 rounded-full object-contain"
                      />
                    )}
                  </span>
                  <div className="flex flex-col">
                    <span className="font-semibold">{item.alt}</span>
                    {hasMultipleCountries && (
                      <span className="text-third-800/70 text-xs">
                        {item.countries?.map((country, index) => (
                          <span
                            key={`${country.isoCode}-${country.name}`}
                            className={
                              countryMatchesValue(country, selectedRegion)
                                ? "font-bold text-primary group-hover:text-white"
                                : undefined
                            }
                          >
                            {index > 0 ? ", " : ""}
                            {country.name}
                          </span>
                        ))}
                      </span>
                    )}
                  </div>
                </div>
                <svg
                  className="size-4 text-primary opacity-0 transition-opacity duration-200 group-hover:opacity-100 rtl:-scale-x-100"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            ))}
          </div>

          {/* {filteredAggregators.length === 0 && (
            <p className="py-12 text-center text-lg font-semibold text-gray-600">
              No delivery services found matching your search.
            </p>
          )} */}
        </div>
      </div>
    </div>
  );
}
