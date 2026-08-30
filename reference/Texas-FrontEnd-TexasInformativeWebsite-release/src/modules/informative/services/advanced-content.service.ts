import { getEnvConfig } from "@/env.config";
import type {
  AdvancedContentCategoryDocsProps,
  AdvancedContentCategoryMediaProps,
  AdvancedContentCategoryProps,
  CategorySingleContentProps,
} from "../types/advanced-content.types";
import { nodeFetcher } from "@/lib/node-fetcher/fetcher";
import {
  ApiResponse,
  ApiResponseWrapper,
  ResponseWrapper,
} from "@/lib/node-fetcher/response-wrapper";

export async function getAdvancedContentCategoryData(
  locale: string,
  instanceName: string,
): Promise<ApiResponseWrapper<AdvancedContentCategoryProps[]>> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<AdvancedContentCategoryProps[]> = await nodeFetcher(
      `/${env.PROJECT_CODE}/AdvancedContent/${env.COUNTRY_CODE}/${instanceName}/${locale}/Category`,
      {
        cache: "no-store",
      },
    );

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getAdvancedContentCategoryContentsData(
  locale: string,
  instanceName: string,
  categoryUniqueName: string,
): Promise<ApiResponseWrapper<AdvancedContentCategoryProps[]>> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<AdvancedContentCategoryProps[]> = await nodeFetcher(
      `/${env.PROJECT_CODE}/AdvancedContent/${env.COUNTRY_CODE}/${instanceName}/${locale}/Category/${categoryUniqueName}/Content`,
      {
        cache: "no-store",
      },
    );

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getAdvancedContentCategoryMediaData(
  locale: string,
  instanceName: string,
  categoryUniqueName: string,
): Promise<ApiResponseWrapper<AdvancedContentCategoryMediaProps[]>> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<AdvancedContentCategoryMediaProps[]> =
      await nodeFetcher(
        `/${env.PROJECT_CODE}/AdvancedContent/${env.COUNTRY_CODE}/${instanceName}/${locale}/Category/${categoryUniqueName}/Media`,
        {
          cache: "no-store",
        },
      );

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getCategoryDocs(
  locale: string,
  instanceName: string,
  categoryUniqueName: string,
): Promise<ApiResponseWrapper<AdvancedContentCategoryDocsProps[]>> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<AdvancedContentCategoryDocsProps[]> =
      await nodeFetcher(
        `/${env.PROJECT_CODE}/AdvancedContent/${env.COUNTRY_CODE}/${instanceName}/${locale}/Category/${categoryUniqueName}/Document`,
        {
          cache: "no-store",
        },
      );

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}

export async function getCategorySingleContentData(
  locale: string,
  instanceName: string,
  categoryUniqueName: string,
): Promise<ApiResponseWrapper<CategorySingleContentProps>> {
  try {
    const env = await getEnvConfig();
    const res: ApiResponse<CategorySingleContentProps> = await nodeFetcher(
      `/${env.PROJECT_CODE}/AdvancedContent/${env.COUNTRY_CODE}/${instanceName}/${locale}/Content/${categoryUniqueName}`,
      {
        cache: "no-store",
      },
    );

    const data = ResponseWrapper.handleResponse(res);

    return data;
  } catch (error: any) {
    return error;
  }
}
