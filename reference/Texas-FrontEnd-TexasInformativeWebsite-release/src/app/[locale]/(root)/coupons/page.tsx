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
import { CouponsView } from "@/views/coupons/CouponsPageView";
import type { CouponsPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface CouponsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: CouponsPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.COUPON,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function CouponsPage(props: CouponsPageProps) {
  const { locale  } = await props.params;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.COUPON,
    ),
  );

  if (!isPageOn) {
    return notFound();
  }

  const headercouponsResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.COUPONS,
  );
  const headercoupons = headercouponsResponse?.results;

  const t = await getTranslations();

  const resources: CouponsPageResourcesProps = {
    Home: t("Home"),
    Coupons: t("Coupons"),
    download: t("download"),
    "name-is-required": t("name-is-required"),
    "name-must-be-at-most": t("name-must-be-at-most"),
    "name-can-only-contain-letters-or-abostrophe": t(
      "name-can-only-contain-letters-or-abostrophe",
    ),
    "email-is-required": t("email-is-required"),
    "invalid-email-address": t("invalid-email-address"),
    "phone-number-is-required": t("phone-number-is-required"),
    "phone-number-must-be-at-most": t("phone-number-must-be-at-most"),
    "characters-long": t("characters-long"),
    downloadCoupon: t("downloadCoupon"),
    pleaseFillInYourInformationToDownloadTheCoupon: t(
      "pleaseFillInYourInformationToDownloadTheCoupon",
    ),
    Close: t("Close"),
    cancel: t("cancel"),
    "captcha-is-required": t("captcha-is-required"),
    "successfully-submitted": t("successfully-submitted"),
  };

  return (
    <CouponsView
      headercoupons={headercoupons?.[0]}
      resources={resources}
      locale={locale}
    />
  );
}
