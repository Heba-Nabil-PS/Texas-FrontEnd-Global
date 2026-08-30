// ============================================================
// Multi-Tenant Subdomain Configuration
// ============================================================
// Each key is the subdomain slug (the part before the first dot).
// e.g. "malaysia" resolves for both:
//   malaysia.paradigmegypt.com  (test)
//   malaysia.texaschicken.com   (live)
// The getTenantConfig() function picks test vs live by the root domain.
// ============================================================

import { isTexasVersion } from "./lib";

export type TenantConfig = {
  countryId: string;
  projectCode: string;
  countryCode: string;
  websiteUrl: string;
};

type EnvConfig = { test: TenantConfig; live: TenantConfig };

const buildConfig = (
  slug: string,
  countryId: string,
  projectCode: string,
  countryCode: string,
): EnvConfig => ({
  test: {
    countryId,
    projectCode,
    countryCode,
    websiteUrl: `https://${slug}.paradigmegypt.com:9014`,
  },
  live: {
    countryId,
    projectCode,
    countryCode,
    websiteUrl: `https://${slug}.${isTexasVersion() ? "texaschicken.com" : "churchstexaschicken.com"}`,
  },
});

// ---------------------------------------------------------------------------
// Add or update tenant entries here as new countries are onboarded.
// ---------------------------------------------------------------------------
export const TENANT_MAP: Record<string, EnvConfig> = {
  iraq: buildConfig("iraq", "4", "Iraq", "IRQ"),
  singapore: buildConfig("singapore", "10", "Singapore", "SGP"),
  newzealand: buildConfig("newzealand", "11", "NewZealand", "NZL"),
  malaysia: buildConfig("malaysia", "13", "Malaysia", "MYS"),
  indonesia: buildConfig("indonesia", "18", "Indonesia", "IDN"),
  germany: buildConfig("germany", "22", "Germany", "DEU"),
  //----------Churchs
  virginislands: buildConfig("virginislands", "11", "VirginIslands", "VIR"),
  canada: buildConfig("canada", "12", "Canada", "CAN"),
};

// ---------------------------------------------------------------------------
// Default fallback used on localhost / unknown subdomains.
// Falls back to .env.local values so local dev remains unchanged.
// ---------------------------------------------------------------------------
const DEFAULT_TENANT: TenantConfig = {
  countryId:
    process.env.NEXT_PUBLIC_COUNTRY_ID ??
    process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_ID ??
    "13",
  projectCode:
    process.env.NEXT_PUBLIC_PROJECT_CODE ??
    process.env.NEXT_PUBLIC_DEFAULT_PROJECT_CODE ??
    "Malaysia",
  countryCode:
    process.env.NODE_NEXT_PUBLIC_COUNTRY_CODE ??
    process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE ??
    "eg",
  websiteUrl: process.env.NEXT_PUBLIC_WEBSITE_URL ?? "http://localhost:3000",
};

// Root domains — used to distinguish test vs live at runtime.
const TEST_ROOT_DOMAIN = "paradigmegypt.com";
const LIVE_ROOT_DOMAIN = isTexasVersion()
  ? "texaschicken.com"
  : "churchstexaschicken.com";

/**
 * Resolves tenant configuration from the incoming HTTP Host header.
 *
 * @param host - e.g. "malaysia.paradigmegypt.com" | "iraq.texaschicken.com"
 * @returns The matching TenantConfig, or DEFAULT_TENANT for localhost / unknown slugs.
 */
export function getTenantConfig(host: string): TenantConfig {
  // Strip port if present (e.g. localhost:3000 → localhost)
  const cleanHost = host?.toLowerCase()?.split(":")[0];
  const parts = cleanHost?.split(".");

  // Only subdomains have more than 2 segments (slug.rootdomain.tld)
  if (parts?.length < 3) return DEFAULT_TENANT;

  const [slug, ...rest] = parts;
  const rootDomain = rest.join(".");

  const refinedSlug = slug?.replace("securityjwt", "")?.split("-")?.[0];

  const envConfig = TENANT_MAP[refinedSlug];
  if (!envConfig) return DEFAULT_TENANT;

  if (
    rootDomain === LIVE_ROOT_DOMAIN ||
    rootDomain.endsWith(`.${LIVE_ROOT_DOMAIN}`)
  ) {
    return envConfig.live;
  }

  if (
    rootDomain === TEST_ROOT_DOMAIN ||
    rootDomain.endsWith(`.${TEST_ROOT_DOMAIN}`)
  ) {
    return envConfig.test;
  }

  // Unknown root domain — return test config as safe fallback
  return envConfig.test;
}
