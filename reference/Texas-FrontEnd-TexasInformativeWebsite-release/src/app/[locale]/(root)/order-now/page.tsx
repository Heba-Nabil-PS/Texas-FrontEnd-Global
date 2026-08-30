import { getTranslations } from "next-intl/server";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import {
  getAdvancedContentCategoryContentsData,
  getAdvancedContentCategoryData,
} from "@/modules/informative/services/advanced-content.service";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { OrderNowView } from "@/views/orderNow/OrderNowView";
import type { OrderNowPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";
import { getCountryData } from "@/modules/country/services/country.service";
import { isModuleOn } from "@/lib";
import { STATIC_MODULES } from "@/constants/country-modules";
import { notFound } from "next/navigation";

interface OrderPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(
  props: OrderPageProps,
): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.ORDER,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function OrderPage(props: OrderPageProps) {
  const { locale } = await props.params;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.ORDER,
    ),
  );

  if (!isPageOn) {
    return notFound();
  }

  const headerOrderNowResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.ORDERNOW,
  );
  const headerOrderNow = headerOrderNowResponse?.results?.[0];

  const findDeliverySectionResponse = headerOrderNow
    ? await getAdvancedContentCategoryContentsData(
        locale,
        headerOrderNow?.InstanceUniqueName,
        headerOrderNow?.UniqueName,
      )
    : undefined;

  const findDeliverySection = findDeliverySectionResponse?.results?.[0];

  const t = await getTranslations();

  const resources: OrderNowPageResourcesProps = {
    Home: t("Home"),
    OrderNow: t("OrderNow"),
    comingSoon: t("comingSoon"),
    onlineOrderingAndDeliveryComingSoonSoKeepAnEyeOutAndBringYourAppetite: t(
      "onlineOrderingAndDeliveryComingSoonSoKeepAnEyeOutAndBringYourAppetite",
    ),
  };

  return (
    <OrderNowView
      resources={resources}
      locale={locale}
      headerOrderNow={headerOrderNow}
      findDeliverySection={findDeliverySection}
    />
  );
}
