import { notFound } from "next/navigation";
import { getTranslations } from "next-intl/server";
import { displayInOrder, isModuleOn } from "@/lib";
import { getSingleBlog } from "@/modules/blogs/services/blog-single.service";
import { getAllBlogs } from "@/modules/blogs/services/blogs.service";
import { buildMetaData } from "@/modules/seo/seo.utils";
import { getCountryData } from "@/modules/country/services/country.service";
import { STATIC_MODULES } from "@/constants/country-modules";
import BlogDetailsView from "@/views/blogs/BlogDetailsView";
import type { InnerBlogsPageResourcesProps } from "@/types/resources";
import type { Metadata } from "next";

interface BlogSingleProps {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export async function generateMetadata(props: BlogSingleProps): Promise<Metadata> {
  const params = await props.params;
  try {
    const { locale, slug } = params;

    const blogsResponse = await getSingleBlog(locale, slug);
    const blog = blogsResponse?.results;

    if (!blog) throw new Error("No meta data found");

    return await buildMetaData({
      metaData: blog,
    });
  } catch {
    return {};
  }
}

export default async function BlogDetailsPage(props: BlogSingleProps) {
  const params = await props.params;
  const { slug, locale } = params;

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

  const allBlogsResponse = await getAllBlogs(locale);
  const allBlogsResuls = allBlogsResponse?.results;
  const allBlogs = displayInOrder(allBlogsResuls);

  const blogResponse = await getSingleBlog(locale, slug);
  const blogResult = blogResponse?.results;

  if (!blogResult) {
    return notFound();
  }

  const t = await getTranslations();

  const resources: InnerBlogsPageResourcesProps = {
    Home: t("Home"),
    Blog: t("Blog"),
    previous: t("previous"),
    next: t("next"),
  };

  return (
    <BlogDetailsView
      allBlogs={allBlogs}
      blogData={blogResult}
      slug={slug}
      resources={resources}
      locale={locale}
    />
  );
}
