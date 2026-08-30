import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";
import { getTenantConfig } from "./tenant.config";
import {
  getDefaultLocaleFromCountryData,
  getLocalesFromCountryData,
} from "./lib";
import { REDIRECT_STATUS, TENANT_HEADERS } from "./constants";
import type { ApiResponseWrapper } from "./lib/data-fetcher/response-wrapper";
import type { CountryWithLanguageProps } from "./modules/country/types/country.types";

// ---------------------------------------------------------------------------
// Tenant resolution: read the Host header and look up the matching config.
// The resolved values are forwarded as x-tenant-* request headers so that
// all server components and API routes can access them via next/headers().
// ---------------------------------------------------------------------------
function buildTenantHeaders(request: NextRequest): Headers {
  const host = request.headers.get("host") ?? "";
  const tenant = getTenantConfig(host);

  const mutated = new Headers(request.headers);
  mutated.set(TENANT_HEADERS.COUNTRY_ID, tenant.countryId);
  mutated.set(TENANT_HEADERS.PROJECT_CODE, tenant.projectCode);
  mutated.set(TENANT_HEADERS.COUNTRY_CODE, tenant.countryCode);
  mutated.set(TENANT_HEADERS.WEBSITE_URL, tenant.websiteUrl);

  return mutated;
}

const fetchCountryData = async (websiteUrl: string) => {
  try {
    const res = await fetch(`${websiteUrl}/api/country`);
    return await res?.json();
  } catch (error: any) {
    return error;
  }
};

export default async function proxy(request: NextRequest) {
  // 1. Resolve tenant and clone request with injected headers.
  const tenantHeaders = buildTenantHeaders(request);
  const host = request.headers.get("host") ?? "";
  const tenant = getTenantConfig(host);

  const mutatedRequest = new NextRequest(request.url, {
    headers: tenantHeaders,
    method: request.method,
    body: request.body,
    referrer: request.referrer,
    signal: request.signal,
  });

  // 2. Fetch country data using the tenant-specific websiteUrl.
  const countryData: ApiResponseWrapper<CountryWithLanguageProps[]> =
    await fetchCountryData(tenant.websiteUrl);

  const locales = getLocalesFromCountryData(countryData?.results);
  const default_locale = getDefaultLocaleFromCountryData(countryData?.results);

  // 3. Run intl middleware on the mutated request so locale routing is applied.
  const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: default_locale,
    localePrefix: locales?.length > 1 ? "always" : "never",
  });

  const response = intlMiddleware(mutatedRequest);

  // 4. Forward x-tenant-* headers onto the response headers as well.
  //    Next.js propagates response headers from middleware to server components.
  response.headers.delete("Server");
  response.headers.set(TENANT_HEADERS.COUNTRY_ID, tenant.countryId);
  response.headers.set(TENANT_HEADERS.PROJECT_CODE, tenant.projectCode);
  response.headers.set(TENANT_HEADERS.COUNTRY_CODE, tenant.countryCode);
  response.headers.set(TENANT_HEADERS.WEBSITE_URL, tenant.websiteUrl);

  // 5. Matched path redirects.
  if (request.nextUrl.pathname.startsWith("/Menu")) {
    return NextResponse.redirect(
      new URL("/menu", request.nextUrl),
      REDIRECT_STATUS.PERMANENT,
    );
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!api|trpc|_next|_vercel|static|.*\\..*|_next|favicon.ico|robots.txt|sitemap.xml|manifest.webmanifest|.well-known).*)",
  ],
};
