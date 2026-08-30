import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { STATIC_MODULES } from "@/constants/country-modules";
import { isModuleOn } from "@/lib";
import { getCareersData } from "@/modules/careers/services/careers.services";
import { getCountryData } from "@/modules/country/services/country.service";
import { getAdvancedContentCategoryData } from "@/modules/informative/services/advanced-content.service";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { CareerEmailView } from "@/views/careers/career-email.view";
import { CareersViewPage } from "@/views/careers/CareersViewPage";
import type { CareerPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface CareersPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata(props: CareersPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.CAREER,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function CareersPage(props: CareersPageProps) {
  const { locale  } = await props.params;

  const headerCareersResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.CAREERS,
  );
  const headerCareers = headerCareersResponse?.results;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const useCareerEmail = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.CAREER,
    ),
  );

  if (useCareerEmail) {
    const t = await getTranslations();

    const resources: CareerPageResourcesProps = {
      Home: t("Home"),
      careers: t("careers"),
      "view-details": t("view-details"),
    };

    return (
      <CareerEmailView
        locale={locale}
        resources={resources}
        headerCareers={headerCareers?.[0]}
      />
    );
  }

  const useCareerForm = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.CAREERADVANCED,
    ),
  );

  if (useCareerForm) {
    const careersResponse = await getCareersData(locale);
    const careers = careersResponse?.results || [];

    const t = await getTranslations();

    const resources: CareerPageResourcesProps = {
      Home: t("Home"),
      careers: t("careers"),
      "view-details": t("view-details"),
    };

    return (
      <CareersViewPage
        careers={careers}
        resources={resources}
        headerCareers={headerCareers?.[0]}
      />
    );
  }

  return notFound();
}
