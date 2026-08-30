export interface ErrorDetail {
  Message: string;
}

export interface SuccessResponse<T> {
  ResonseCode: number;
  Results: T;
  Message?: string;
}

export interface ErrorResponse {
  Message: string;
  ResonseCode: number;
  Results: undefined;
}

export type ApiResponse<T> = SuccessResponse<T> | ErrorResponse;

// Unified response format
export interface ApiResponseWrapper<T> {
  hasError: boolean;
  responseCode: number;
  results?: T;
  message?: string;
}

export class ResponseWrapper {
  static handleResponse<T>(response: ApiResponse<T>): ApiResponseWrapper<T> {
    if (response?.ResonseCode >= 200 && response?.ResonseCode < 300) {
      // Success Response
      return {
        hasError: false,
        responseCode: response?.ResonseCode,
        results: response.Results,
      };
    } else {
      // Error Response

      return {
        hasError: true,
        responseCode: response?.ResonseCode,
        message: response?.Message,
      };
    }
  }
}
