import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { getCountryData } from "@/modules/country/services/country.service";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { getAdvancedContentCategoryData } from "@/modules/informative/services/advanced-content.service";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { isModuleOn } from "@/lib";
import { STATIC_MODULES } from "@/constants/country-modules";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { PartyViewPage } from "@/views/party/PartyViewPage";
import type { PartyPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface PartyPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(
  props: PartyPageProps,
): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.PARTY_PICKUP,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function PartyPage(props: PartyPageProps) {
  const { locale } = await props.params;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.BIRTHDAY,
    ),
  );

  if (!isPageOn) {
    return notFound();
  }

  const headerPartyResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.PARTY,
  );
  const headerParty = headerPartyResponse?.results;
  const headerPartyData =
    headerParty?.find(
      (item) => item?.PageTitle?.trim()?.toLowerCase() === "main_party",
    ) || headerParty?.[0];

  const bigCrowedData = headerParty?.find(
    (item) => item?.PageTitle?.trim()?.toLowerCase() === "big_crowed_feed",
  );

  const thankyouData = headerParty?.find(
    (item) => item.PageTitle?.trim()?.toLowerCase() === "thank_you",
  );

  const t = await getTranslations();

  const resources: PartyPageResourcesProps = {
    Home: t("Home"),
    party: t("party"),
    "book-your-party": t("book-your-party"),
    bothwhitedark: t("bothwhitedark"),
    whitemeat: t("Whitemeat"),
    darkmeat: t("Darkmeat"),
    weddingparty: t("Weddingparty"),
    birthdayparty: t("Birthdayparty"),
    officeparty: t("Officeparty"),
    summerbackyardparty: t("Summerbackyardparty"),
    christmasparty: t("Christmasparty"),
    watchingtvsportswithyourfriends: t("WatchingTVSportswithyourfriends"),
    employeeappreciationlunch: t("Employeeappreciationlunch"),
    other: t("Other"),
    "name-is-required": t("name-is-required"),
    "name-must-be-at-most": t("name-must-be-at-most"),
    "characters-long": t("characters-long"),
    "name-can-only-contain-letters-or-abostrophe": t(
      "name-can-only-contain-letters-or-abostrophe",
    ),
    "phone-number-is-required": t("phone-number-is-required"),
    "phone-number-must-be-at-most": t("phone-number-must-be-at-most"),
    "email-is-required": t("email-is-required"),
    "invalid-email-address": t("invalid-email-address"),
    "please-select-location": t("please-select-location"),
    "please-select-party-type": t("please-select-party-type"),
    "date-required": t("date-required"),
    "date-and-time-must-be-in-the-future": t(
      "date-and-time-must-be-in-the-future",
    ),
    "time-required": t("time-required"),
    "invalid-time": t("invalid-time"),
    "meat-preference-required": t("meat-preference-required"),
    "number-of-chicken-pieces-required": t("number-of-chicken-pieces-required"),
    "number-of-chicken-pieces-must-be-between": t(
      "number-of-chicken-pieces-must-be-between",
    ),
    "party-time-must-be-in-the-future": t("party-time-must-be-in-the-future"),
    "successfully-submitted": t("successfully-submitted"),
    "captcha-is-required": t("captcha-is-required"),
    name: t("name"),
    "phone-number": t("phone-number"),
    Email: t("Email"),
    Whatkindofpartyareyouplanning: t("Whatkindofpartyareyouplanning"),
    "preferred-date": t("preferred-date"),
    "preferred-time": t("preferred-time"),
    "choose-location": t("choose-location"),
    MeatPreference: t("MeatPreference"),
    Numberofchickenpieces: t("Numberofchickenpieces"),
    Feedback: t("Feedback"),
    "book-now": t("book-now"),
  };

  return (
    <PartyViewPage
      locale={locale}
      headerParty={headerPartyData}
      bigCrowedData={bigCrowedData}
      thankyouData={thankyouData}
      resources={resources}
    />
  );
}
