import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import { getEnvConfig } from "@/env.config";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import { BlogSingleProps } from "../types/blog-single";

export async function getSingleBlog(
  locale: string,
  uniqueCode: string,
): Promise<ApiResponseWrapper<BlogSingleProps>> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<BlogSingleProps> = await fetcher(
      `/Blogs/Get/${decodeURIComponent(uniqueCode)}`,
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
