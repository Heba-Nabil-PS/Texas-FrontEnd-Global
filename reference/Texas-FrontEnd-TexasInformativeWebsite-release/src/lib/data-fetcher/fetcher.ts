import { FIXED_ENV_VARIABLES } from "@/constants";
import { formatError } from "./format-error";

export async function fetcher(url: string, config: RequestInit = {}) {
  try {
    const response = await fetch(
      `${FIXED_ENV_VARIABLES.BASE_URL}${url}`,
      config,
    );

    const data = await response.json();

    if (!response?.ok) {
      const error = {
        hasError: true,
        responseCode: data?.statusCode || response?.status,
        message:
          data?.firstError ||
          response?.statusText ||
          "An unknown error occurred.",
      };

      return Promise.reject(error);
    }

    return data;
  } catch (error) {
    const customError = formatError(error as Error);

    return Promise.reject(customError);
  }
}
