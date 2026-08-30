import { cache } from "react";
import { getRuntimeConfig } from "@/lib/get-tenant-config";

// getEnvConfig() resolves the per-tenant values at request-time from the custom
// headers injected by proxy.ts. It is async because Next.js 16's `headers()` is
// async. Wrapped in React `cache` so repeated calls within the same request are
// de-duplicated.
//
// ⚠️  SERVER-SIDE ONLY — do not import this in client components.
//     Client components should use the `useConfig()` hook from config-provider
//     to access tenant values passed down from the server layout.
//
// Usage (inside an async server function):
//   const env = await getEnvConfig();
//   env.COUNTRY_ID
export const getEnvConfig = cache(async () => getRuntimeConfig());
