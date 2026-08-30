import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import { BannerProps } from "../types/banners.types";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import { getEnvConfig } from "@/env.config";

export async function getBannersData(
  locale: string,
): Promise<ApiResponseWrapper<BannerProps[]>> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<BannerProps[]> = await fetcher(`/Banners/GetAll`, {
      headers: {
        CountryID: env.COUNTRY_ID,
        LanguageCode: locale,
      },
      cache: "no-store",
    });

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}
