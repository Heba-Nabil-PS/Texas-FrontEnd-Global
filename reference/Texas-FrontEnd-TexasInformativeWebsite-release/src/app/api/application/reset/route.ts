import { revalidateTag } from "next/cache";
import {
  COUNTRY_CACHE_TAG,
  COUNTRY_CONFIG_CACHE_TAG,
  RESOURCE_CACHE_TAG,
} from "@/modules/country/constants";
import { SEO_CACHE_TAG } from "@/modules/seo/constants";
import { FIXED_ENV_VARIABLES } from "@/constants";
import { getTenantConfig } from "@/tenant.config";
import { BLOGS_CACHE_TAG } from "@/modules/blogs/constants";
import { CAREERS_CACHE_TAG } from "@/modules/careers/constants";
import { getLocalesFromCountryData } from "@/lib";
import { CATEGORIES_CACHE_TAG } from "@/modules/menu/constants";
import {
  ApiResponse,
  ResponseWrapper,
} from "@/lib/data-fetcher/response-wrapper";
import { CountryWithLanguageProps } from "@/modules/country/types/country.types";
import { fetcher } from "@/lib/data-fetcher/fetcher";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const host = request.headers.get("host") ?? "";
  const tenant = getTenantConfig(host);
  const countryId = tenant.countryId;

  try {
    const response = await fetch(`${FIXED_ENV_VARIABLES.BASE_URL}/values`, {
      cache: "no-store",
    });

    await response?.json();

    await fetch(`${FIXED_ENV_VARIABLES.NODE_BASE_URL}/app/ClearCash`, {
      method: "POST",
      cache: "no-store",
    });
  } catch {}

  const countryResponse: ApiResponse<CountryWithLanguageProps[]> =
    await fetcher(`/Countries/${countryId}`, {
      cache: "no-store",
    });

  const countryData = ResponseWrapper.handleResponse(countryResponse);

  const locales = getLocalesFromCountryData(countryData?.results);

  revalidateTag(`${COUNTRY_CACHE_TAG}-${countryId}`, "max");
  revalidateTag(`${RESOURCE_CACHE_TAG}-${countryId}`, "max");
  revalidateTag(`${COUNTRY_CONFIG_CACHE_TAG}-${countryId}`, "max");
  revalidateTag(`${SEO_CACHE_TAG}-${countryId}`, "max");
  locales?.forEach((locale) => {
    revalidateTag(`${locale}-${BLOGS_CACHE_TAG}-${countryId}`, "max");
    revalidateTag(`${locale}-${CAREERS_CACHE_TAG}-${countryId}`, "max");
    revalidateTag(`${locale}-${CATEGORIES_CACHE_TAG}-${countryId}`, "max");
  });

  // return NextResponse.json({ message: "Cache reset successfully" });

  return new Response(null, {
    status: 302,
    headers: {
      Location: "/",
    },
  });
}
