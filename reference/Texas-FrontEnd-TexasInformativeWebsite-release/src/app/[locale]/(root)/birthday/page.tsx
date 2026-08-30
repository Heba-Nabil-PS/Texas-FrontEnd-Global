import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { getAdvancedContentCategoryData } from "@/modules/informative/services/advanced-content.service";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { getCountryData } from "@/modules/country/services/country.service";
import { isModuleOn } from "@/lib";
import { STATIC_MODULES } from "@/constants/country-modules";
import { BirthdayViewPage } from "@/views/birthday/BirthdayViewPage";
import type { BirthdayPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface BirthdayPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: BirthdayPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.BIRTHDAY_PARTY_FORM,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function BirthdayPage(props: BirthdayPageProps) {
  const { locale  } = await props.params;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.BIRTHDAYFORM,
    ),
  );

  if (!isPageOn) {
    return notFound();
  }

  const headerBirthdayResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.BIRTHDAY,
  );
  const headerBirthday = headerBirthdayResponse?.results;

  const headerBirthdayData = headerBirthday![0];

  if (!headerBirthdayData) {
    return notFound();
  }

  const t = await getTranslations();

  const resources: BirthdayPageResourcesProps = {
    Home: t("Home"),
    birthday: t("birthday"),
    "book-your-birthday-party": t("book-your-birthday-party"),
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
    "please-select-state": t("please-select-state"),
    "age-required": t("age-required"),
    "age-must-be-between": t("age-must-be-between"),
    "date-required": t("date-required"),
    "date-and-time-must-be-in-the-future": t(
      "date-and-time-must-be-in-the-future",
    ),
    "gender-required": t("gender-required"),
    "number-invitees-required": t("number-invitees-required"),
    "number-invitees-must-between": t("number-invitees-must-between"),
    "captcha-is-required": t("captcha-is-required"),
    "successfully-submitted": t("successfully-submitted"),
    name: t("name"),
    Email: t("Email"),
    "phone-number": t("phone-number"),
    age: t("age"),
    "preferred-date": t("preferred-date"),
    Male: t("Male"),
    Female: t("Female"),
    "select-gender": t("select-gender"),
    "select-city": t("select-city"),
    NumberOfInvitees: t("NumberOfInvitees"),
    "book-now": t("book-now"),
  };

  return (
    <BirthdayViewPage
      locale={locale}
      resources={resources}
      headerBirthday={headerBirthdayData}
    />
  );
}
