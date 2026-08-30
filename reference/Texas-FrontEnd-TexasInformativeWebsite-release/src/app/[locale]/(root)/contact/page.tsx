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
import { ContactViewPage } from "@/views/Contact/ContactViewPage";
import type { ContactPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface ContactPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(
  props: ContactPageProps,
): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.CONTACT,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function ContactPage(props: ContactPageProps) {
  const { locale } = await props.params;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.CONTACT,
    ),
  );

  if (!isPageOn) {
    return notFound();
  }

  const headercontactResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.CONTACT,
  );
  const headercontact = headercontactResponse?.results;

  const t = await getTranslations();

  const resources: ContactPageResourcesProps = {
    Home: t("Home"),
    Contactus: t("Contactus"),
    contact: t("contact"),
    "send-us-a-message": t("send-us-a-message"),
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
    "please-select-inquiry-type": t("please-select-inquiry-type"),
    "date-required": t("date-required"),
    "date-must-current-past-date": t("date-must-current-past-date"),
    "time-required": t("time-required"),
    "invalid-time": t("invalid-time"),
    "subject-must-be-between": t("subject-must-be-between"),
    and: t("and"),
    "message-is-required": t("message-is-required"),
    "captcha-is-required": t("captcha-is-required"),
    "successfully-submitted": t("successfully-submitted"),
    name: t("name"),
    "phone-number": t("phone-number"),
    Email: t("Email"),
    state: t("state"),
    "nearest-location": t("nearest-location"),
    TypeofInquiry: t("TypeofInquiry"),
    "preferred-date": t("preferred-date"),
    "preferred-time": t("preferred-time"),
    placeholder_Subject: t("placeholder_Subject"),
    placeholder_Message: t("placeholder_Message"),
    Submit: t("Submit"),
    "file-size-exceeds-the-limit-of-5mb": t(
      "file-size-exceeds-the-limit-of-5mb",
    ),
    "invalid-file-type-only-are-allowed": t(
      "invalid-file-type-only-are-allowed",
    ),
    "you-can-only-upload-maximum": t("you-can-only-upload-maximum"),
    files: t("files"),
    "total-files-size-exceeds-the-limit": t(
      "total-files-size-exceeds-the-limit",
    ),
    "upload-files": t("upload-files"),
    "drag-and-drop": t("drag-and-drop"),
    "max-files-total": t("max-files-total"),
    "time-of-incident": t("time-of-incident"),
  };

  return (
    <ContactViewPage
      locale={locale}
      headercontact={headercontact?.[0]}
      resources={resources}
    />
  );
}
