import { notFound } from "next/navigation";
import { getMessages, getTranslations } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import {
  getCountryConfigurations,
  getCountryData,
} from "@/modules/country/services/country.service";
import {
  getAdvancedContentCategoryData,
  getAdvancedContentCategoryMediaData,
  getCategoryDocs,
} from "@/modules/informative/services/advanced-content.service";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { cn } from "@/lib/utils";
import { cairo, mainFont } from "@/lib/fonts";
import { STATIC_MODULES } from "@/constants/country-modules";
import {
  getLocaleDirection,
  getLocalesFromCountryData,
  isModuleOn,
} from "@/lib";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { buildMetaData } from "@/modules/seo/seo.utils";
import { Shared } from "@/components/global/shared";
import { MainLayout } from "@/components/layout/main-layout";
import { Providers } from "@/components/providers";
import { RecaptchaWrapper } from "@/components/global/recaptcha-wrapper";
import { GALoader } from "@/components/global/ga-loader";
import { getRuntimeConfig } from "@/lib/get-tenant-config";
import type {
  FooterResourcesProps,
  HeaderResourcesProps,
} from "@/types/resources";
import "@/styles/globals.css";
import { FIXED_ENV_VARIABLES } from "@/constants";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  props: Pick<LocaleLayoutProps, "params">,
) {
  const params = await props.params;
  const { locale } = params;

  try {
    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    const data = seoData?.find(
      (item) =>
        item.controlName?.trim()?.toLowerCase() ===
        SEO_CONTROL_NAMES.MAIN_LAYOUT?.trim()?.toLowerCase(),
    );

    const localeData = data?.seoData?.find(
      (item) =>
        item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
    );

    if (!localeData) {
      throw new Error("No meta data found");
    }

    return {
      ...(await buildMetaData({ metaData: localeData, isMainLayout: true })),
      icons: {
        icon: `/images/${FIXED_ENV_VARIABLES.FLAVOR?.toLowerCase()}/favicon.ico`,
      },
    };
  } catch (error) {
    return {
      title: {
        template: "Texas Chicken %s",
        default: "Texas Chicken",
      },
      icons: {
        icon: `/images/${FIXED_ENV_VARIABLES.FLAVOR?.toLowerCase()}/favicon.ico`,
      },
    };
  }
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children } = props;
  const { locale } = await props.params;

  // Resolve per-tenant values injected by proxy as x-tenant-* headers.
  const { COUNTRY_ID: countryId } = await getRuntimeConfig();

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results;

  const locales = getLocalesFromCountryData(countryResults);

  if (!locales.includes(locale)) {
    return notFound();
  }

  const messages = await getMessages();

  const countryData = countryResults?.find(
    (country) => country.isoCode === locale,
  );

  if (!countryData) {
    return notFound();
  }

  const locationsSectionCategoryResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.LOCATIONSECTION,
  );
  const locationsSectionCategoryData =
    locationsSectionCategoryResponse?.results?.[0];

  const locationsSectionMediaResponse =
    await getAdvancedContentCategoryMediaData(
      locale,
      locationsSectionCategoryData?.InstanceUniqueName || "",
      locationsSectionCategoryData?.UniqueName || "",
    );

  const nutritionalInformationCategoryResponse =
    await getAdvancedContentCategoryData(
      locale,
      ADVANCED_CONTENT_INSTANCES.NUTRITIONAL_INFORMATION,
    );
  const nutritionalInformationCategory =
    nutritionalInformationCategoryResponse?.results?.[0];
  const nutritionalInformationMediaResponse = await getCategoryDocs(
    locale,
    nutritionalInformationCategory?.InstanceUniqueName || "",
    nutritionalInformationCategory?.UniqueName || "",
  );
  const nutritionalInformationDocs =
    nutritionalInformationMediaResponse?.results?.[0];

  const mapBg = locationsSectionMediaResponse?.results?.find(
    (media) => media.Featured,
  );

  const t = await getTranslations();

  const headerResources: HeaderResourcesProps = {
    Contactus: t("Contactus"),
    Coupons: t("Coupons"),
    Locations: t("Locations"),
    Menu: t("Menu"),
    ourstory: t("ourstory"),
    OrderNow: t("OrderNow"),
    Vouchers: t("Vouchers"),
  };

  const footerResources: FooterResourcesProps = {
    abouttexas: t("abouttexas"),
    discovertexas: t("discovertexas"),
    letstalk: t("letstalk"),
    Footer_Workwithus: t("Footer_Workwithus"),
    followus: t("followus"),
    franchiseopportunities: t("franchiseopportunities"),
    careers: t("careers"),
    HALAL: t("HALAL"),
    ourstory: t("ourstory"),
    Menu: t("Menu"),
    Coupons: t("Coupons"),
    rewards: t("rewards"),
    Catring: t("Catring"),
    Blog: t("Blog"),
    party: t("party"),
    birthday: t("birthday"),
    Contactus: t("Contactus"),
    FAQs: t("FAQs"),
    Terms_Conditions: t("Terms_Conditions"),
    PrivacyPolicy: t("PrivacyPolicy"),
    Footer_rights: t.raw("Footer_rights"),
    appData: t("appData"),
    Locations: t("Locations"),
    OrderNow: t("OrderNow"),
    Nutritional_Information: t("Nutritional_Information"),
    legalNotice: t("legalNotice"),
  };

  const countryConfigResponse = await getCountryConfigurations();
  const countryConfigResults = countryConfigResponse?.results;

  const useAccessibe = Boolean(
    isModuleOn(
      countryData?.countryData?.countryModules,
      STATIC_MODULES.ACCESSIBILITY,
    ),
  );
  const useCustomAccessibe = Boolean(
    isModuleOn(
      countryData?.countryData?.countryModules,
      STATIC_MODULES.ACCESSIBILITYCUSTOMPLUGIN,
    ),
  );

  const CMB_SETTINGS_ID = countryConfigResults?.cmP_Code;
  const applyCMP = Boolean(CMB_SETTINGS_ID);

  const googleAnalyticsId = countryConfigResults?.googleAnalyticsID;

  const localesWithNames =
    countryResults?.map((item) => ({
      isoCode: item.isoCode,
      languageName: item.languageName,
    })) || [];

  return (
    <html
      lang={locale}
      dir={countryData?.direction?.toLowerCase() || getLocaleDirection(locale)}
      className={cn(
        "light w-full",
        locale === "ar" ? cairo.variable : mainFont.variable,
      )}
      style={{
        fontSize: locale === "ar" ? "13px" : "16px",
      }}
    >
      {applyCMP && (
        <head>
          <script
            id="usercentrics-cmp"
            src="https://web.cmp.usercentrics.eu/ui/loader.js"
            data-settings-id={CMB_SETTINGS_ID}
            data-language={locale}
            async
          ></script>
        </head>
      )}

      <body>
        {googleAnalyticsId && (
          <GALoader measurementId={googleAnalyticsId} applyCMP={applyCMP} />
        )}

        <NextIntlClientProvider locale={locale} messages={messages}>
          <Providers
            countryData={countryData}
            countryConfigResults={countryConfigResults}
            countryId={countryId}
          >
            <RecaptchaWrapper
              captchaKey={countryConfigResults?.captchaClientKey}
            >
              <Shared
                locale={locale}
                useAccessibe={useAccessibe}
                useCustomAccessibe={useCustomAccessibe}
              >
                <MainLayout
                  locale={locale}
                  locales={localesWithNames}
                  locationsSectionData={locationsSectionCategoryData}
                  mapBg={mapBg}
                  headerResources={headerResources}
                  footerResources={footerResources}
                  applyCMP={applyCMP}
                  nutritionalInformationDocs={nutritionalInformationDocs}
                >
                  {children}
                </MainLayout>
              </Shared>
            </RecaptchaWrapper>
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
