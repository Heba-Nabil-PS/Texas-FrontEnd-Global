import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import CateringViewPage from "@/views/catering/CateringViewPage";
import type { Metadata } from "next";

interface CateringPageProps {
  params: Promise<{
    locale: string;
  }>;
}

export async function generateMetadata({
  params,
}: CateringPageProps): Promise<Metadata> {
  try {
    const { locale } = await params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.CATERING,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function CateringPage() {
  return <CateringViewPage />;
}
