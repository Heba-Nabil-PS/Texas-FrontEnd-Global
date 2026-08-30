# Texas Chicken — Informative Website

A multi-country, multi-language Next.js informative website for Texas Chicken. A **single deployment** serves all country subdomains on both the test and live environments.

---

## Getting Started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the result.

---

## Environment Variables

### Fixed (same across all subdomains and environments)

Set these on the deployment server:

```env
NEXT_PUBLIC_FLAVOR="TEXAS"
NEXT_PUBLIC_LANDING_LINK="https://texaschicken.com"
```

### Local Dev Fallbacks (`.env.local` only)

Used when running on `localhost` where there is no subdomain to resolve:

```env
NEXT_PUBLIC_BASE_URL=https://txinformative-apis-test.paradigmegypt.com:9007/api
NODE_BASE_URL=https://txInformative-nodeapis-test.paradigmegypt.com:9007/api
NEXT_PUBLIC_COUNTRY_ID=4
NEXT_PUBLIC_PROJECT_CODE=Iraq
NODE_NEXT_PUBLIC_COUNTRY_CODE=IQ
NEXT_PUBLIC_WEBSITE_URL=http://localhost:3000
```

> **On the deployed server, these fallback vars are not needed.** All per-country values (`BASE_URL`, `NODE_BASE_URL`, `COUNTRY_ID`, `PROJECT_CODE`, `COUNTRY_CODE`, `WEBSITE_URL`) are resolved at runtime from `src/tenant.config.ts` based on the incoming subdomain.

---

## Multi-Tenant Subdomain Architecture

This project serves multiple country subdomains from a single deployment:

| Environment | Example URLs                                           |
| ----------- | ------------------------------------------------------ |
| Test        | `malaysia.paradigmegypt.com`, `iraq.paradigmegypt.com` |
| Live        | `malaysia.texaschicken.com`, `iraq.texaschicken.com`   |

### How It Works

1. **`src/middleware.ts`** — On every request, reads the `Host` header and calls `getTenantConfig()` to resolve the correct per-tenant values. These are forwarded as `x-tenant-*` custom request headers to all server components and API routes.

2. **`src/tenant.config.ts`** — Static lookup table mapping subdomain slugs (e.g. `malaysia`, `iraq`) to their `{ test, live }` config objects containing `countryId`, `projectCode`, `countryCode`, `baseUrl`, `nodeBaseUrl`, and `websiteUrl`.

3. **`src/lib/get-tenant-config.ts`** _(server-only)_ — Reads `x-tenant-*` headers via `next/headers()` and exposes them as a typed config object. Falls back to `.env.local` values on localhost.

4. **`src/env.config.ts`** — `ENV_CONFIG` is a JavaScript `Proxy` that calls `getRuntimeConfig()` on every property read. All existing server-side `ENV_CONFIG.XYZ` usages in services and fetchers resolve dynamically per request with zero changes needed.

5. **`src/components/providers/config-provider.tsx`** — Exposes `countryId` and `baseUrl` via `useConfig()` for client components that cannot use `next/headers()`.

### Server vs Client Rules

| Context                                 | How to get tenant values                             |
| --------------------------------------- | ---------------------------------------------------- |
| Server components, services, API routes | `ENV_CONFIG.XYZ` (uses Proxy → `getRuntimeConfig()`) |
| Client components (`"use client"`)      | `useConfig().countryId` / `useConfig().baseUrl`      |

> ⚠️ **Never import `ENV_CONFIG` in client components.** It calls `next/headers()` internally which is server-only and will throw at runtime.

---

## Adding a New Country (Tenant)

Open `src/tenant.config.ts` and add one entry to `TENANT_MAP`:

```ts
// Syntax: buildConfig(slug, countryId, projectCode, countryCode)
ksa: buildConfig("ksa", "7", "KSA", "SA"),
```

The slug must match the subdomain prefix exactly:

- `ksa.paradigmegypt.com` → slug `ksa`
- `ksa.texaschicken.com` → slug `ksa`

If the live API URLs differ per country, use the full object form:

```ts
ksa: {
  test: { countryId: "7", projectCode: "KSA", countryCode: "SA", baseUrl: "...", nodeBaseUrl: "...", websiteUrl: "https://ksa.paradigmegypt.com" },
  live: { countryId: "7", projectCode: "KSA", countryCode: "SA", baseUrl: "...", nodeBaseUrl: "...", websiteUrl: "https://ksa.texaschicken.com" },
},
```

---

## Key Architecture Files

| File                                           | Role                                                     |
| ---------------------------------------------- | -------------------------------------------------------- |
| `src/tenant.config.ts`                         | Tenant map + `getTenantConfig(host)` resolver            |
| `src/lib/get-tenant-config.ts`                 | Server-only header reader (fallback to `.env.local`)     |
| `src/env.config.ts`                            | Proxy-based `ENV_CONFIG` for zero-diff server-side usage |
| `src/middleware.ts`                            | Injects `x-tenant-*` headers + handles i18n routing      |
| `src/components/providers/config-provider.tsx` | Exposes `countryId` + `baseUrl` to client components     |
| `src/lib/data-fetcher/fetcher.ts`              | Accepts optional `baseUrl` for client-side form submits  |

---

## Cache Revalidation

To clear server caches after a CMS content update, call:

```
GET /api/application/reset
```

This revalidates all Next.js cache tags (`country`, `country_config`, `resources`, `seo`) and triggers a Node.js cache clear.

---

## Tech Stack

- [Next.js 14](https://nextjs.org/) (App Router)
- [next-intl](https://next-intl-docs.vercel.app/) — Internationalization
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/) — UI components
- [React Hook Form](https://react-hook-form.com/) + [Zod](https://zod.dev/) — Form validation
