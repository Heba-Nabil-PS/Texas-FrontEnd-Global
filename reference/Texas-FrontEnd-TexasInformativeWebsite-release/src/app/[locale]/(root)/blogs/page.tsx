import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { ADVANCED_CONTENT_INSTANCES } from "@/modules/informative/informative.constants";
import { getAdvancedContentCategoryData } from "@/modules/informative/services/advanced-content.service";
import { displayInOrder, isModuleOn } from "@/lib";
import { getAllBlogs } from "@/modules/blogs/services/blogs.service";
import { getStaticPagesSeo } from "@/modules/seo/services/seo.service";
import { prepareStaticSeo } from "@/modules/seo/seo.utils";
import { SEO_CONTROL_NAMES } from "@/modules/seo/constants";
import { getCountryData } from "@/modules/country/services/country.service";
import { STATIC_MODULES } from "@/constants/country-modules";
import { BlogsPageView } from "@/views/blogs/BlogsPageView";
import type { BlogsPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface BlogsPageProps {
  params: Promise<{ locale: string }>;
}

export async function generateMetadata(props: BlogsPageProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale } = params;

    const seoResponse = await getStaticPagesSeo();
    const seoData = seoResponse?.results;

    return await prepareStaticSeo({
      controlName: SEO_CONTROL_NAMES.BLOG,
      locale,
      seoData,
    });
  } catch {
    return {};
  }
}

export default async function BlogsPage(props: BlogsPageProps) {
  const { locale  } = await props.params;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results?.find(
    (item) =>
      item.isoCode?.trim()?.toLowerCase() === locale?.trim()?.toLowerCase(),
  );

  const isPageOn = Boolean(
    isModuleOn(
      countryResults?.countryData?.countryModules,
      STATIC_MODULES.BLOG,
    ),
  );

  if (!isPageOn) {
    return notFound();
  }

  const headerBlogsResponse = await getAdvancedContentCategoryData(
    locale,
    ADVANCED_CONTENT_INSTANCES.BLOGS,
  );
  const headerBlogs = headerBlogsResponse?.results;
  const blogsData = headerBlogs![0];

  if (!blogsData) {
    return notFound();
  }

  const blogsResponse = await getAllBlogs(locale);
  const blogsResults = blogsResponse?.results;
  const blogs = displayInOrder(blogsResults);

  const t = await getTranslations();

  const resources: BlogsPageResourcesProps = {
    Home: t("Home"),
    Blog: t("Blog"),
    ReadMore: t("ReadMore"),
    "no-articles-found": t("no-articles-found"),
  };

  return (
    <BlogsPageView
      locale={locale}
      blogs={blogs}
      headerBlogs={blogsData}
      resources={resources}
    />
  );
}
