import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import { getEnvConfig } from "@/env.config";
import { CAREERS_CACHE_TAG, REVALIDATE_CAREERS_CACHE_TAG } from "../constants";
import type { CareersProps } from "../types/careers.type";

export async function getCareersData(
  locale: string,
  countryID?: string,
): Promise<ApiResponseWrapper<CareersProps[]>> {
  try {
    const env = await getEnvConfig();
    const usedCountryID = countryID || env.COUNTRY_ID;

    const res: ApiResponse<CareersProps[]> = await fetcher(`/Careers/GetAll`, {
      headers: {
        CountryID: usedCountryID,
        LanguageCode: locale,
      },
      next: {
        revalidate: REVALIDATE_CAREERS_CACHE_TAG,
        tags: [`${locale}-${CAREERS_CACHE_TAG}-${usedCountryID}`],
      },
    });

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}
