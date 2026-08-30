import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import { getEnvConfig } from "@/env.config";
import { BlogProps } from "../types/blogs.type";
import { BLOGS_CACHE_TAG, REVALIDATE_BLOGS_CACHE_TAG } from "../constants";

export async function getAllBlogs(
  locale: string,
  countryID?: string,
): Promise<ApiResponseWrapper<BlogProps[]>> {
  try {
    const env = await getEnvConfig();
    const usedCountryID = countryID || env.COUNTRY_ID;

    const res: ApiResponse<BlogProps[]> = await fetcher("/Blogs/GetAll", {
      headers: {
        CountryID: usedCountryID,
        LanguageCode: locale,
      },
      next: {
        revalidate: REVALIDATE_BLOGS_CACHE_TAG,
        tags: [`${locale}-${BLOGS_CACHE_TAG}-${usedCountryID}`],
      },
    });

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}
