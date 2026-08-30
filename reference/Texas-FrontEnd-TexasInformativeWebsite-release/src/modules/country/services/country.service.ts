import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import {
  CountryConfigurationsProps,
  CountryWithLanguageProps,
} from "../types/country.types";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import { getEnvConfig } from "@/env.config";
import {
  COUNTRY_CACHE_TAG,
  COUNTRY_CONFIG_CACHE_TAG,
  REVALIDATE_COUNTRY_CACHE_TAG,
  REVALIDATE_COUNTRY_CONFIG_CACHE_TAG,
} from "../constants";

export async function getCountryData(
  countryID?: string,
): Promise<ApiResponseWrapper<CountryWithLanguageProps[]>> {
  try {
    const env = await getEnvConfig();
    const usedCountryID = countryID || env.COUNTRY_ID;

    const res: ApiResponse<CountryWithLanguageProps[]> = await fetcher(
      `/Countries/${usedCountryID}`,
      {
        next: {
          revalidate: REVALIDATE_COUNTRY_CACHE_TAG,
          tags: [`${COUNTRY_CACHE_TAG}-${usedCountryID}`],
        },
      },
    );

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getCountryConfigurations(): Promise<
  ApiResponseWrapper<CountryConfigurationsProps>
> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<CountryConfigurationsProps> = await fetcher(
      `/Countries/Configuration/${env.COUNTRY_ID}`,
      {
        next: {
          revalidate: REVALIDATE_COUNTRY_CONFIG_CACHE_TAG,
          tags: [`${COUNTRY_CONFIG_CACHE_TAG}-${env.COUNTRY_ID}`],
        },
      },
    );

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}
