import { FIXED_ENV_VARIABLES } from "@/constants";
import { formatError } from "./format-error";

interface UploadConfig {
  body: FormData;
  headers?: Record<string, string>;
}

/**
 * Client-side multipart uploader built on XMLHttpRequest.
 *
 * iOS Safari (iPhone) fails `fetch()` when the request body is a FormData that
 * contains files — it aborts with a "Load failed" TypeError, while text-only
 * submits succeed. This is a long-standing WebKit bug; XHR's upload path is not
 * affected. So the file-upload forms (Contact, Careers) submit through this
 * instead of the fetch-based `fetcher`.
 *
 * Mirrors `fetcher`'s contract: resolves with the parsed JSON on a 2xx response,
 * rejects with `{ hasError, responseCode, message }` otherwise.
 */
// Give a hung request a finite lifetime so flaky mobile connections surface a
// timeout instead of spinning forever (default XHR timeout of 0 = no limit).
const UPLOAD_TIMEOUT_MS = 60_000;

export function uploadFetcher(
  url: string,
  { body, headers = {} }: UploadConfig,
): Promise<any> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open("POST", `${FIXED_ENV_VARIABLES.BASE_URL}${url}`);
    xhr.timeout = UPLOAD_TIMEOUT_MS;

    // Don't set Content-Type — the browser adds the multipart boundary itself.
    Object.entries(headers).forEach(([key, value]) => {
      xhr.setRequestHeader(key, value);
    });

    xhr.onload = () => {
      let data: any = null;
      try {
        data = xhr.responseText ? JSON.parse(xhr.responseText) : null;
      } catch {
        data = null;
      }

      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(data);
        return;
      }

      // Log the real server response so it's visible in the device console
      // (e.g. iPhone via remote Web Inspector); the toast stays user-friendly.
      console.error("[uploadFetcher] request failed", {
        url,
        status: xhr.status,
        statusText: xhr.statusText,
        responseText: xhr.responseText?.slice(0, 500),
      });

      reject({
        hasError: true,
        responseCode: data?.statusCode || xhr.status,
        // HTTP/2 has no reason phrase, so xhr.statusText is "" — fall back to
        // the status code rather than a contentless "unknown error".
        message:
          data?.firstError ||
          xhr.statusText ||
          `An unknown error occurred. (${xhr.status})`,
      });
    };

    // onerror = network-level failure (CORS, DNS, mixed content, blocked
    // request) — the request never completed, so there's no status to report.
    xhr.onerror = () => {
      console.error("[uploadFetcher] network error", {
        url,
        online:
          typeof navigator !== "undefined" ? navigator.onLine : undefined,
      });
      reject(formatError(new Error("An unknown error occurred.")));
    };
    xhr.ontimeout = () => {
      console.error("[uploadFetcher] request timed out", { url });
      reject(formatError(new Error("An unknown error occurred.")));
    };

    xhr.send(body);
  });
}
