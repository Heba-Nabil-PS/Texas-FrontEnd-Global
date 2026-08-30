// This file is SERVER-ONLY. Never import it in client components.
// It reads per-tenant values from the custom request headers injected by proxy.ts.
// Falls back to .env.local values so that local dev (no subdomain) still works.

import { TENANT_HEADERS } from "@/constants";
import { headers } from "next/headers";

// `headers()` is async in Next.js 16, so this resolver is async too.
export async function getRuntimeConfig() {
  const h = await headers();

  return {
    COUNTRY_ID:
      h.get(TENANT_HEADERS.COUNTRY_ID) ?? process.env.NEXT_PUBLIC_COUNTRY_ID!,
    PROJECT_CODE:
      h.get(TENANT_HEADERS.PROJECT_CODE) ??
      process.env.NEXT_PUBLIC_PROJECT_CODE!,
    COUNTRY_CODE:
      h.get(TENANT_HEADERS.COUNTRY_CODE) ??
      process.env.NODE_NEXT_PUBLIC_COUNTRY_CODE!,
    WEBSITE_URL:
      h.get(TENANT_HEADERS.WEBSITE_URL) ?? process.env.NEXT_PUBLIC_WEBSITE_URL!,
  };
}
