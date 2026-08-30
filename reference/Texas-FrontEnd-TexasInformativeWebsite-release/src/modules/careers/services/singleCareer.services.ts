import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import { getEnvConfig } from "@/env.config";
import { SingleCareerProps } from "../types/singleCreer.type";

export async function getSingleCareerData(
  uniqueCode: string,
  locale: string,
): Promise<ApiResponseWrapper<SingleCareerProps>> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<SingleCareerProps> = await fetcher(
      `/Careers/Get/${decodeURIComponent(uniqueCode)}`,
      {
        headers: {
          CountryID: env.COUNTRY_ID,
          LanguageCode: locale,
        },
        cache: "no-store",
      },
    );

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}
