import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import { getEnvConfig } from "@/env.config";
import { REVALIDATE_SEO_CACHE_TAG, SEO_CACHE_TAG } from "../constants";
import type { StaticPagesSeoResponseProps } from "../types/seo.types";

export async function getStaticPagesSeo(): Promise<
  ApiResponseWrapper<StaticPagesSeoResponseProps[]>
> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<StaticPagesSeoResponseProps[]> = await fetcher(
      `/SEO/GetAll`,
      {
        headers: {
          CountryID: env.COUNTRY_ID,
        },
        next: {
          revalidate: REVALIDATE_SEO_CACHE_TAG,
          tags: [`${SEO_CACHE_TAG}-${env.COUNTRY_ID}`],
        },
      },
    );

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}
