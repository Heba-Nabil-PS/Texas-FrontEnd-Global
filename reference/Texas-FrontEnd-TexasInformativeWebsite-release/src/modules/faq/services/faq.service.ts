import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import { getEnvConfig } from "@/env.config";
import { FaqProps } from "../types/faq.type";

export async function getFaqsData(
  locale: string,
): Promise<ApiResponseWrapper<FaqProps[]>> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<FaqProps[]> = await fetcher(`/FAQs/GetAll`, {
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
