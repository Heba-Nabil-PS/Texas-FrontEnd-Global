import {
  BannerType,
  CategoryContentType,
  CategoryDocumentType,
  PageMetadata,
} from "@/types";
import { fetcher } from "@/utils/fetcher";

export async function getPageSeo(
  locale: string,
  pageName: string
): Promise<PageMetadata> {
  const data = await fetcher(
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/SEO/${locale}/${pageName}/Index`
  );

  return data;
}
export async function getProjectData() {
  const data = await fetcher(
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Retrieve`,
    {
      // cache: "force-cache",
      // next: { tags: [cacheTags.DATA_CACHE_TAG] },
    }
  );

  return data;
}
export async function getBanners(
  bannerInstance: string,
  locale: string
): Promise<BannerType[]> {
  const data = await fetcher(
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/Banner/${process.env.COUNTRY_CODE}/${bannerInstance}/${locale}/`
  );

  return data;
}
export async function getCategories(pageCode: string, locale: string) {
  const data = await fetcher(
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/${pageCode}/${locale}/Category`
  );

  return data;
}
export async function getSingleCategory(
  pageCode: string,
  categoryCode: string,
  locale: string
) {
  const url = `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/${pageCode}/${locale}/Category/${categoryCode}`;
  const data = await fetcher(url);
  return data;
}

export async function getChildCategories(
  pageCode: string,
  categoryCode: string,
  locale: string
) {
  const data = await fetcher(
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/${pageCode}/${locale}/ChildCategory/${categoryCode}`
  );

  return data;
}
export async function getCategoryContent(
  pageCode: string,
  categoryCode: string,
  locale: string
): Promise<CategoryContentType[]> {
  const data = await fetcher(
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/${pageCode}/${locale}/Category/${categoryCode}/Content`
  );

  return data;
}

export async function getCategoryDocuments(
  pageCode: string,
  categoryCode: string,
  locale: string
): Promise<CategoryDocumentType[]> {
  const data = await fetcher(
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/${pageCode}/${locale}/Category/${categoryCode}/Document`
  );

  return data;
}
export async function getSingleContent(
  pageCode: string,
  contentCode: string,
  locale: string
) {
  const data = await fetcher(
    `${process.env.API_URL}/API/${process.env.PROJECT_CODE}/AdvancedContent/${process.env.COUNTRY_CODE}/${pageCode}/${locale}/Content/${contentCode}`
  );

  return data;
}
