import { getEnvConfig } from "@/env.config";
import type {
  SEOContentProps,
  StaticPagesSeoResponseProps,
} from "./types/seo.types";

interface BuildMetaDataProps {
  metaData: SEOContentProps;
  isMainLayout?: boolean;
}

export async function buildMetaData(params: BuildMetaDataProps) {
  const { metaData, isMainLayout } = params;

  const env = await getEnvConfig();
  const websiteUrl = new URL(env.WEBSITE_URL);

  return {
    title: isMainLayout
      ? {
          template: `${metaData?.pageTitle} %s`,
          default: metaData?.pageTitle,
        }
      : metaData?.pageTitle,
    description: metaData?.pageDescription || "",
    keywords: metaData?.pageKeywords || "",
    openGraph: {
      title: metaData?.ogTitle || "",
      description: metaData?.ogDescription || "",
      type: "website",
      images: metaData?.ogImage
        ? [{ url: metaData.ogImage || "", width: 60, height: 60 }]
        : undefined,
    },
    twitter: {
      title: metaData?.twitterTitle || metaData.pageTitle || "",
      description:
        metaData?.twitterDescription || metaData?.pageDescription || "",
      images: metaData?.twitterImage || metaData?.ogImage || "",
    },
    metadataBase: websiteUrl || "",
  };
}

interface PrepareStaticSeoProps {
  controlName: string;
  locale: string;
  seoData: StaticPagesSeoResponseProps[] | null;
}

export async function prepareStaticSeo(params: PrepareStaticSeoProps) {
  const { controlName, locale, seoData } = params;

  if (!controlName || !locale || !seoData) {
    throw new Error("Missing required parameters");
  }

  const data = seoData.find(
    (item) =>
      item.controlName?.trim()?.toLowerCase() ===
      controlName?.trim()?.toLowerCase(),
  );

  if (!data) {
    throw new Error("No meta data found");
  }

  const localeData = data.seoData.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  if (!localeData) {
    throw new Error("No meta data found");
  }

  return await buildMetaData({ metaData: localeData });
}
