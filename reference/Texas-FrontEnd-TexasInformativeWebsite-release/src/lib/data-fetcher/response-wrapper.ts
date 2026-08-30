export type ErrorDetail = string;

export interface SuccessResponse<T> {
  isSuccess: boolean;
  value: T;
  firstError: ErrorDetail;
  errors: ErrorDetail[];
  statusCode: number;
}

export interface ErrorResponse {
  isSuccess: boolean;
  value: null;
  firstError: ErrorDetail;
  errors: ErrorDetail[];
  statusCode: number;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Unified response format
export interface ApiResponseWrapper<T> {
  hasError: boolean;
  responseCode: number;
  results: T | null;
  message: string;
}

export class ResponseWrapper {
  static handleResponse<T>(response: ApiResponse<T>): ApiResponseWrapper<T> {
    if (response?.statusCode >= 200 && response?.statusCode < 300) {
      // Success Response
      return {
        hasError: false,
        responseCode: response?.statusCode,
        results: response.value,
        message: response.firstError || "",
      };
    } else {
      // Error Response

      return {
        hasError: true,
        responseCode: response?.statusCode,
        results: null,
        message: response?.firstError,
      };
    }
  }
}
