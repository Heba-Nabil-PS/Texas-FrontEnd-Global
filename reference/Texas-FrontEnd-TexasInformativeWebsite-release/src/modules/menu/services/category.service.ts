import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import { getEnvConfig } from "@/env.config";
import { CategoryProps } from "../types/category.type";
import {
  CATEGORIES_CACHE_TAG,
  REVALIDATE_CATEGORIES_CACHE_TAG,
} from "../constants";

export async function getCategories(
  locale: string,
  countryId?: string,
): Promise<ApiResponseWrapper<CategoryProps[]>> {
  try {
    const env = await getEnvConfig();
    const usedCountryID = countryId || env.COUNTRY_ID;

    const res: ApiResponse<CategoryProps[]> = await fetcher(
      "/Categories/GetAll",
      {
        headers: {
          CountryID: usedCountryID,
          LanguageCode: locale,
        },
        next: {
          revalidate: REVALIDATE_CATEGORIES_CACHE_TAG,
          tags: [`${locale}-${CATEGORIES_CACHE_TAG}-${usedCountryID}`],
        },
      },
    );

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getFeaturedCategories(
  locale: string,
): Promise<ApiResponseWrapper<CategoryProps[]>> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<CategoryProps[]> = await fetcher(
      "/Categories/GetAllFeatured",
      {
        headers: {
          CountryID: env.COUNTRY_ID,
          LanguageCode: locale,
        },
        cache: "no-store",
        // next: {
        //   revalidate: REVALIDATE_CATEGORIES_CACHE_TAG,
        //   tags: [`${locale}_${CATEGORIES_CACHE_TAG}`],
        // },
      },
    );

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}
