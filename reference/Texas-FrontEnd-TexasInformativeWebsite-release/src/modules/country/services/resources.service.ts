import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import { fetcher } from "@/lib/data-fetcher/fetcher";
import { getEnvConfig } from "@/env.config";
import {
  RESOURCE_CACHE_TAG,
  REVALIDATE_RESOURCE_CACHE_TAG,
} from "../constants";
import type { ResourceProps } from "../types/resources.types";

export async function getResources(): Promise<
  ApiResponseWrapper<ResourceProps[]>
> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<ResourceProps[]> = await fetcher(`/Resources`, {
      headers: {
        CountryID: env.COUNTRY_ID,
      },
      next: {
        revalidate: REVALIDATE_RESOURCE_CACHE_TAG,
        tags: [`${RESOURCE_CACHE_TAG}-${env.COUNTRY_ID}`],
      },
    });

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function convertResourcesToMessages(
  resources: ResourceProps[] = [],
  locale: string,
) {
  if (resources?.length === 0) return {};

  const localeResources = resources?.filter((item) => item.language === locale);

  const messages = localeResources?.reduce((obj, item) => {
    return {
      ...obj,
      [item.name]: item.value,
    };
  }, {});

  return messages;
}
