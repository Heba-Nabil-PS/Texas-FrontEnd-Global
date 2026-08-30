import { formatError } from "./format-error";
import { FIXED_ENV_VARIABLES } from "@/constants";

export async function nodeFetcher(url: string, config: RequestInit = {}) {
  try {
    const response = await fetch(
      `${FIXED_ENV_VARIABLES.NODE_BASE_URL}${url}`,
      config,
    );

    const data = await response.json();

    if (!response?.ok) {
      const error = {
        hasError: true,
        responseCode: data?.ResponseCode || response?.status,
        message:
          data?.ResonseTitle ||
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
