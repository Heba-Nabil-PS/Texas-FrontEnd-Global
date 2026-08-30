import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import { getEnvConfig } from "@/env.config";
import { CategoryItemProps } from "../types/category-item";

export async function getMenuItem(
  locale: string,
  categoryUniqueCode: string,
  itemUniqueCode: string,
): Promise<ApiResponseWrapper<CategoryItemProps>> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<CategoryItemProps> = await fetcher(
      `/Products/GetByUniqueCode?categoryUniqueCode=${decodeURIComponent(categoryUniqueCode)}&productUniqueCode=${decodeURIComponent(itemUniqueCode)}`,
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
