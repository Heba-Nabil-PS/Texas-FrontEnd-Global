# Next.js 14 → 16.2.6 Upgrade Plan

> **Project:** `texas-nextjs` (Texas Informative Website)
> **Current:** Next.js `^14.2.35`, React `^18`
> **Target:** Next.js `16.2.6`, React `19.x`
> **Type:** Major upgrade crossing **two** major versions (14 → 15 → 16). All Next.js 15 _and_ 16 breaking changes apply.
> **Last reviewed:** 2026-06-08

---

## 0. Progress log

### 2026-06-08 — Phase 1–2 done (packages installed), plan revised against bundled docs

**Installed** (verified in `node_modules`), per [§4](#4-package-upgrade-matrix):

| Package                                       | Installed | Notes                                                                                                                                                                    |
| --------------------------------------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `next`                                        | `16.2.6`  | pinned exact                                                                                                                                                             |
| `react` / `react-dom`                         | `19.2.7`  |                                                                                                                                                                          |
| `@types/react` / `@types/react-dom`           | `19.x`    |                                                                                                                                                                          |
| `next-intl`                                   | `4.13.0`  | code migration pending (§6)                                                                                                                                              |
| `motion`                                      | `12.40.0` | replaces `framer-motion`; `framer-motion@12.40.0` remains as a **transitive** dep of `motion`, so existing `from "framer-motion"` imports still resolve during migration |
| `embla-carousel-react`                        | `8.6.0`   | only package that _required_ a bump for React 19 peer range                                                                                                              |
| `eslint`                                      | `^9`      | `eslint-config-next@16.2.6` requires `eslint >=9`                                                                                                                        |
| `eslint-config-next`                          | `16.2.6`  | matches `next`                                                                                                                                                           |
| Radix, RHF (7.78), etc.                       | latest    | see matrix                                                                                                                                                               |
| Added `engines.node >=20.9.0` + `.nvmrc` (20) |           |                                                                                                                                                                          |

> Install emitted transient `ERESOLVE` peer warnings (saw `react@18.3.1` mid-resolution) but resolved correctly to React 19; `npm audit` reports 9 vulnerabilities (1 low / 6 moderate / 2 high) — review separately, do **not** `audit fix --force` blindly. No code changes made yet.

**New breaking changes found in the bundled docs (`node_modules/next/dist/docs/.../version-16.md`) that were added to this plan:**

- 🔴 **`revalidateTag` now requires a 2nd `cacheLife` arg** — see [§5a](#5a-breaking-change-revalidatetag-now-requires-a-cachelife-argument). 7 call sites in the reset route will be **TypeScript errors**.
- 🟡 **`next/image` config defaults changed** (`qualities` → `[75]`, `minimumCacheTTL` 60s → 4h, `imageSizes` drops 16, new local-IP/redirect limits) — see [§11a](#11a-nextimage-config-default-changes-behavioral).
- ✅ **Use `next typegen` + `PageProps`/`LayoutProps`/`RouteContext` helpers** to type async params (cleaner than hand-written `Promise<…>`) — folded into [§5](#5-breaking-change-1--async-params--searchparams-24-files).
- 🟡 **Scroll-behavior override removed** — `scroll-smooth` is set on `body` in `globals.css`; if smooth-scroll-on-nav is desired, add `data-scroll-behavior="smooth"` to `<html>`. Low priority.
- ✅ **Confirmed ABSENT** (no action): AMP, `serverRuntimeConfig`/`publicRuntimeConfig`/`getConfig`, `experimental.dynamicIO`, `experimental_ppr`, `unstable_rootParams`, `unstable_cache`, parallel routes (`@slot` → no `default.js` needed), `next/legacy/image`, `images.domains`, custom webpack, `quality=` props.

**Next steps:** Phase 3 (async params via `next typegen`) → Phase 4 (next-intl v4) → Phase 5 (proxy) → §5a revalidateTag → Phase 6 (motion imports) → Phase 7 (ESLint) → build/QA.

### 2026-06-08 — Phases 3–7 done, build green ✅

All code-migration phases complete. **`tsc --noEmit` = 0 errors**, **`next build` (Turbopack) succeeds** (all routes render, `ƒ Proxy (Middleware)` recognised), **`eslint .` runs** on the new flat config.

What was done:

- **Async params (Phase 3):** ran `@next/codemod next-async-request-api` (25 files) + manual fixes the codemod missed: arrow-function page components (`const X = async (props) => { const { params:{locale} } = props }` → `await props.params`), and `layout.tsx` nested destructure. The codemod left **unsafe `UnsafeUnwrappedHeaders` casts** on non-async functions (`robots.ts`, `get-tenant-config.ts`) — those would throw at runtime, so they were made properly `async`.
- **Headers cascade (discovered during Phase 3):** `headers()` is async ⇒ `getRuntimeConfig()` made async ⇒ the synchronous `ENV_CONFIG` **Proxy** could no longer work. Replaced it with `getEnvConfig()` (async, memoised via React `cache`) and updated **all 14 service files** + `buildMetaData`/`prepareStaticSeo` (made async) + their ~22 metadata callers (`return await …`).
- **next-intl v4 (Phase 4):** `getRequestConfig` → `requestLocale` (awaited) + returns `locale`; `createSharedPathnamesNavigation()` → `createNavigation()`; `NextIntlClientProvider` given `locale`.
- **proxy (Phase 5):** `git mv src/middleware.ts src/proxy.ts`, function `middleware` → `proxy`. `createMiddleware` from `next-intl/middleware` unchanged.
- **revalidateTag (§5a):** added `"max"` cacheLife arg to all 7 calls.
- **motion (Phase 6):** removed `framer-motion` (now transitive via `motion`); rewrote imports `"framer-motion"` → `"motion/react"` in **41 files**. Stricter `motion` v12 types required annotating variant objects as `Variants` (`@/lib/anime.ts`, both `DownloadAppSection*`).
- **ESLint (Phase 7):** deleted `.eslintrc.json`, added `eslint.config.mjs` (flat config spreading `eslint-config-next/core-web-vitals`), `eslint@^9`, `"lint": "eslint ."`.
- **react-hook-form 7.78:** `PartyForm` (ZodEffects schema) needed the explicit 3rd `useForm` generic.
- **Turbopack CSS:** removed the invalid Tailwind class `placeholder:first-letter:capitalize` (compiled to `::first-letter::placeholder`, a silent no-op that Turbopack's parser rejects) from `input.tsx` + `LocationsView.tsx`. Set `turbopack.root` in `next.config.mjs` to silence the stray-lockfile root warning.
- `next build` auto-updated `tsconfig.json` (`jsx: "react-jsx"`, added `.next/dev/types`).

**Known non-blocking — pre-existing lint issues** surfaced by Next 16's stricter `eslint-config-next` (NOT upgrade regressions; `next build` no longer runs lint): 8 errors / 37 warnings, incl. conditional hooks in `CouponsPageView` (`notFound()` before hooks), missing `key` in `RewardsViewPage`, unescaped apostrophes in `BlogSection`, a React-Compiler `preserve-manual-memoization` advisory in `LocationsView`, and ~32 `no-img-element` warnings. Recommend fixing in a separate PR.

**Still requires manual QA** (cannot be verified by build alone): per-tenant × per-locale runtime — locale routing via proxy, tenant header resolution, i18n messages, RTL, forms+reCAPTCHA, animations, maps. See [§13](#13-qa--acceptance-matrix).

---

## 1. Executive summary

This is a **high-impact** upgrade. Although the codebase is modern (App Router, `remotePatterns`, modern `next/font`, no custom webpack, no `next/router`), three breaking changes touch a large number of files:

1. **Async Request APIs** — `params` / `searchParams` are now `Promise`s and must be `await`ed. **24 files** currently access them synchronously and will break.
2. **next-intl v3 → v4** — required for Next 16. Changes to `getRequestConfig`, navigation APIs, and the provider.
3. **`middleware.ts` → `proxy.ts`** — the file and exported function must be renamed; Edge runtime is gone (Node.js only).

Plus the platform jump: **React 18 → 19**, **Node ≥ 20.9**, **`next lint` removed**, **Turbopack is the default bundler**, and `framer-motion` should move to the `motion` package for React 19 support.

**Estimated effort:** ~1–2 focused days for code changes + thorough QA across all locales/tenants. Most of the `params` work is mechanical and codemod-assisted.

**Risk level by area:**

| Area                                     | Risk             | Why                                                                       |
| ---------------------------------------- | ---------------- | ------------------------------------------------------------------------- |
| Async `params`/`searchParams` (24 files) | 🔴 High (volume) | Mechanical but widespread; misses cause runtime errors                    |
| next-intl v3 → v4                        | 🔴 High          | i18n is core; locale routing + messages must keep working for all tenants |
| `middleware.ts` → `proxy.ts`             | 🟠 Medium        | Tenant resolution + locale routing live here                              |
| React 18 → 19 + deps                     | 🟠 Medium        | Peer-dep churn; `framer-motion` used in 35+ files                         |
| `next lint` removal / ESLint             | 🟡 Low           | Tooling only                                                              |
| Turbopack default                        | 🟢 Low           | No custom webpack config present                                          |
| `next/image`, fonts, API routes          | 🟢 Low           | Already modern/compliant                                                  |

---

## 2. Prerequisites

- [ ] **Node.js ≥ 20.9.0** (Node 18 is dropped in Next 16). Local dev currently runs Node v25 — fine. **Pin the runtime** so CI/hosting match:
  - Add to `package.json`:
    ```json
    "engines": { "node": ">=20.9.0" }
    ```
  - Update the Vercel/host project setting and any CI image to Node 20.x LTS (or 22.x LTS).
  - Optionally add an `.nvmrc` with `20`.
- [ ] **TypeScript ≥ 5.1.0** — currently `^5`, almost certainly fine; confirm `npx tsc -v` ≥ 5.1.
- [ ] Clean working tree + a dedicated branch: `feat/upgrade-next-16`.
- [ ] Green baseline: `npm run build` succeeds on Next 14 before starting.

---

## 3. Recommended sequencing

Do it in this order so each step is independently verifiable:

```
Phase 0  Branch + baseline build (Next 14)
Phase 1  Node/TS prereqs + engines field
Phase 2  Bump Next/React/types + run official codemods
Phase 3  Migrate async params/searchParams (24 files)
Phase 4  next-intl v3 → v4 migration
Phase 5  middleware.ts → proxy.ts
Phase 6  React 19 peer deps (framer-motion → motion, Radix, RHF, etc.)
Phase 7  Tooling: next lint removal → ESLint flat config
Phase 8  Turbopack build verification
Phase 9  Full QA matrix + rollback readiness
```

A large portion of Phases 2–5 is automated by the official codemod:

```bash
npx @next/codemod@canary upgrade latest
# or target the exact version
npx @next/codemod@canary upgrade 16.2.6
```

Run the codemod, then **manually review every change** — especially i18n and middleware, which the codemod handles only partially.

---

## 4. Package upgrade matrix

> Pin exact versions at upgrade time with `npm outdated`. Versions below are the intended _targets_; verify the latest patch when you run it.

### 4.1 Core framework (must change)

| Package              | Current    | Target           | Notes                                                                    |
| -------------------- | ---------- | ---------------- | ------------------------------------------------------------------------ |
| `next`               | `^14.2.35` | `16.2.6`         | Pin exact per request.                                                   |
| `react`              | `^18`      | `^19`            | Required by Next 16.                                                     |
| `react-dom`          | `^18`      | `^19`            | Match `react`.                                                           |
| `@types/react`       | `^18`      | `^19`            |                                                                          |
| `@types/react-dom`   | `^18`      | `^19`            |                                                                          |
| `@types/node`        | `^20`      | `^20` (or `^22`) | Match Node runtime.                                                      |
| `eslint-config-next` | `^16.1.1`  | `16.2.6`         | Align with `next` version (currently mismatched at 16 while Next is 14). |

### 4.2 i18n (must change)

| Package     | Current   | Target | Notes                             |
| ----------- | --------- | ------ | --------------------------------- |
| `next-intl` | `^3.19.0` | `^4`   | **Required** for Next 16. See §6. |

### 4.3 Animation (recommended for React 19)

| Package         | Current    | Target                      | Notes                                                                                                                       |
| --------------- | ---------- | --------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| `framer-motion` | `^11.18.2` | replace with `motion` `^12` | `framer-motion` is now `motion`; import from `motion/react`. React 19 support landed in v12. Used in **35+ files**. See §8. |

### 4.4 React 19 peer-dep refresh (bump to latest)

These are React peer-dependent and should be bumped to their latest versions that declare React 19 support. Verify each with `npm outdated` / its changelog:

| Package                           | Current    | Action                                                              |
| --------------------------------- | ---------- | ------------------------------------------------------------------- |
| `@radix-ui/react-dialog`          | `^1.1.1`   | bump to latest (React 19 support)                                   |
| `@radix-ui/react-label`           | `^2.1.7`   | bump to latest                                                      |
| `@radix-ui/react-navigation-menu` | `^1.2.14`  | bump to latest                                                      |
| `@radix-ui/react-radio-group`     | `^1.3.8`   | bump to latest                                                      |
| `@radix-ui/react-select`          | `^2.2.6`   | bump to latest                                                      |
| `@radix-ui/react-slot`            | `^1.1.0`   | bump to latest                                                      |
| `radix-ui`                        | `^1.4.3`   | bump to latest (consolidate; see note)                              |
| `next-themes`                     | `^0.4.4`   | ✓ already React 19-ready; bump to latest patch                      |
| `react-hook-form`                 | `^7.52.1`  | bump to `^7.54+` (React 19 support)                                 |
| `@hookform/resolvers`             | `^3.9.0`   | keep `^3` latest (works with RHF 7)                                 |
| `sonner`                          | `^1.7.4`   | bump to latest (`^2` supports React 19)                             |
| `lucide-react`                    | `^0.412.0` | bump to latest                                                      |
| `react-icons`                     | `^5.5.0`   | latest `^5` (fine)                                                  |
| `@vis.gl/react-google-maps`       | `^1.1.0`   | bump to latest (React 19)                                           |
| `embla-carousel-react`            | `^8.1.8`   | bump to latest `^8`                                                 |
| `embla-carousel-wheel-gestures`   | `^8.0.1`   | match embla                                                         |
| `react-intersection-observer`     | `^9.13.0`  | bump to latest (React 19)                                           |
| `react-countup`                   | `^6.5.3`   | latest `^6`                                                         |
| `react-dropzone`                  | `^14.3.8`  | latest `^14`                                                        |
| `react-google-recaptcha-v3`       | `^1.11.0`  | verify React 19 peer; **watch this one** (less actively maintained) |
| `yet-another-react-lightbox`      | `^3.28.0`  | bump to latest `^3` (React 19)                                      |

> **Note on `radix-ui` + individual `@radix-ui/*`:** the project mixes the umbrella `radix-ui` package with individual `@radix-ui/react-*` packages. This is allowed but can cause duplicate installs/version drift. Consider standardizing on one approach during this upgrade (low priority, but cleaner).

### 4.5 Framework-agnostic (no change needed)

`class-variance-authority`, `clsx`, `tailwind-merge`, `tailwindcss-animate`, `date-fns`, `zod`, `isomorphic-dompurify`, `libphonenumber-js`, `sharp` — not React/Next coupled. Bump opportunistically, not required.

### 4.6 Styling toolchain (no forced change)

Next 16 does **not** force Tailwind v4. Keep `tailwindcss ^3.4`, `postcss`, `prettier-plugin-tailwindcss` as-is. (A separate Tailwind 3 → 4 migration can be planned independently later.)

### 4.7 Linting (see §9)

| Package              | Current   | Action                        |
| -------------------- | --------- | ----------------------------- |
| `eslint`             | `^8`      | upgrade to `^9` (flat config) |
| `eslint-config-next` | `^16.1.1` | pin to `16.2.6`               |

---

## 5. Breaking change #1 — Async `params` / `searchParams` (24 files)

**What changed:** In Next 15 these became `Promise`-based with a sync-compat shim; in **Next 16 the sync shim is removed**. Accessing `params.locale` without `await` now throws/returns wrong data.

**Affected files (all currently access `params` synchronously):**

```
src/app/[locale]/layout.tsx
src/app/[locale]/not-found.tsx
src/app/[locale]/(root)/page.tsx
src/app/[locale]/(root)/app/page.tsx
src/app/[locale]/(root)/birthday/page.tsx
src/app/[locale]/(root)/blogs/page.tsx
src/app/[locale]/(root)/blogs/[slug]/page.tsx
src/app/[locale]/(root)/careers/page.tsx
src/app/[locale]/(root)/careers/[InnerCareers]/page.tsx
src/app/[locale]/(root)/contact/page.tsx
src/app/[locale]/(root)/coupons/page.tsx
src/app/[locale]/(root)/faq/page.tsx
src/app/[locale]/(root)/halal/page.tsx
src/app/[locale]/(root)/locations/page.tsx
src/app/[locale]/(root)/menu/page.tsx
src/app/[locale]/(root)/menu/[category]/page.tsx
src/app/[locale]/(root)/menu/[category]/[menu-item]/page.tsx
src/app/[locale]/(root)/order-now/page.tsx
src/app/[locale]/(root)/party/page.tsx
src/app/[locale]/(root)/privacy/page.tsx
src/app/[locale]/(root)/rewards/page.tsx
src/app/[locale]/(root)/story/page.tsx
src/app/[locale]/(root)/terms/page.tsx
src/app/[locale]/[...rest]/page.tsx
```

(`src/app/[locale]/(root)/catering/_page.tsx` is prefixed with `_` so it is **not** a route — ignore.)

**Migration pattern.** Type `params`/`searchParams` as `Promise<…>` and `await` them.

Before — `src/app/[locale]/layout.tsx`:

```tsx
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, "params">) {
  const { locale } = params;            // ❌ sync access
  ...
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children, params: { locale } } = props;   // ❌ sync access
  ...
}
```

After:

```tsx
interface LocaleLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;   // ✅ Promise
}

export async function generateMetadata({ params }: Pick<LocaleLayoutProps, "params">) {
  const { locale } = await params;       // ✅ await
  ...
}

export default async function LocaleLayout(props: LocaleLayoutProps) {
  const { children } = props;
  const { locale } = await props.params; // ✅ await
  ...
}
```

Before — `src/app/[locale]/(root)/menu/[category]/page.tsx`:

```tsx
interface CategoryPageProps {
  params: { category: string; locale: string };
}
export async function generateMetadata({ params }: CategoryPageProps) {
  const { locale, category } = params; // ❌
}
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, locale } = params; // ❌
}
```

After:

```tsx
interface CategoryPageProps {
  params: Promise<{ category: string; locale: string }>;
}
export async function generateMetadata({ params }: CategoryPageProps) {
  const { locale, category } = await params; // ✅
}
export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category, locale } = await params; // ✅
}
```

**Recommended typing approach — `next typegen` (per bundled docs).** Instead of hand-writing `Promise<{…}>` types, generate the global `PageProps` / `LayoutProps` / `RouteContext` helpers and use them. This gives type-safe params keyed by route:

```bash
npx next typegen
```

```tsx
// page.tsx for route src/app/[locale]/(root)/menu/[category]
export default async function CategoryPage(
  props: PageProps<"/[locale]/menu/[category]">,
) {
  const { locale, category } = await props.params; // fully typed
}
// layout.tsx
export default async function LocaleLayout(props: LayoutProps<"/[locale]">) {
  const { locale } = await props.params;
}
```

Either approach works; the explicit `Promise<{…}>` interfaces shown above are fine if you prefer not to depend on generated types.

**Automate it:** the codemod covers most of these —

```bash
npx @next/codemod@canary next-async-request-api .
```

Then grep to confirm nothing was missed:

```bash
# any remaining sync param typings:
grep -rn "params: {" src/app
# any remaining sync param destructuring without await:
grep -rn "= props.params" src/app
grep -rn "} = params" src/app
```

**Also check** (none found today, but verify after codemod): `cookies()`, `headers()`, `draftMode()` from `next/headers` — these now require `await` too. The current code does not call them in pages/layouts (tenant headers are read via a helper, `getRuntimeConfig()` — confirm that helper's internal `headers()` usage, if any, is awaited).

---

## 6. Breaking change #2 — next-intl v3 → v4

next-intl **v4** is required for Next 16. Three coupled changes:

### 6.1 `getRequestConfig` — `locale` → `requestLocale`, and must return `locale`

`src/i18n/index.ts` today:

```ts
export default getRequestConfig(async ({ locale }) => {   // ❌ v3 signature
  const locales = getLocalesFromCountryData(countryResults);
  if (!locales.includes(locale)) notFound();
  ...
  return { messages };                                     // ❌ no locale returned
});
```

v4 form:

```ts
export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale; // ✅ await the promise

  const countryResponse = await getCountryData();
  const locales = getLocalesFromCountryData(countryResponse?.results);

  if (!locale || !locales.includes(locale)) {
    // fall back or notFound() per desired behavior
    notFound();
  }

  const resourcesResponse = await getResources();
  const resources = resourcesResponse?.results;
  if (!resources) return { locale, messages: {} };

  const messages = await convertResourcesToMessages(resources, locale);

  return { locale, messages }; // ✅ locale is now mandatory
});
```

> The plugin is wired as `createNextIntlPlugin("./src/i18n")` in `next.config.mjs`, which resolves to `src/i18n/index.ts`. v4's default convention is `./src/i18n/request.ts`, but since the path is explicit, the current location keeps working. (Optional: rename to `request.ts` to match docs.)

### 6.2 Navigation API — `createSharedPathnamesNavigation` removed

`src/i18n/navigation.ts` today:

```ts
import { createSharedPathnamesNavigation } from "next-intl/navigation"; // ❌ removed in v4
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation();
```

v4 replacement (`createNavigation`):

```ts
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing"; // or pass config inline

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

Because this project derives locales dynamically per-tenant (from country data) rather than from a static `routing` object, you have two options:

- **Option A (minimal):** call `createNavigation()` with no/locale-agnostic config if your usage doesn't depend on a static locale list. Verify `Link`/`useRouter`/`usePathname` consumers still behave (used in `DesktopHeader.tsx`, `LocaleSwithcer.tsx`, `main-layout.tsx`, `FindTexas.tsx`, `CategoryItemView.tsx`).
- **Option B (recommended long-term):** introduce a `defineRouting`/`routing.ts`. Given locales are dynamic, this may require adapting how middleware + navigation share the locale list. Budget extra time if going this route.

### 6.3 `NextIntlClientProvider`

Already present in `src/app/[locale]/layout.tsx` (`<NextIntlClientProvider messages={messages}>`). In v4, ensure the provider also has access to `locale` (it can infer from request, but passing it explicitly is safest):

```tsx
<NextIntlClientProvider locale={locale} messages={messages}>
```

### 6.4 Server APIs in use — verify signatures

- `getMessages()`, `getTranslations()` (layout + 14 pages), `getLocale()` (`not-found.tsx`) — these remain in v4 but should be re-verified against the [v4 migration guide](https://next-intl.dev) as they may now need to be called within an awaited request scope.

**Read the official guide before doing this phase:** next-intl v4 migration + the Next.js 16 proxy note.

---

## 5a. Breaking change — `revalidateTag` now requires a `cacheLife` argument

Next 16 deprecates the single-argument form of `revalidateTag`; the one-arg call now **produces a TypeScript error**. Each call must pass a `cacheLife` profile (e.g. `'max'`).

**Affected file:** `src/app/api/application/reset/route.ts` — **7 call sites** (lines 50–57):

```ts
// ❌ Next 16 — TS error (missing cacheLife)
revalidateTag(`${COUNTRY_CACHE_TAG}-${countryId}`);
revalidateTag(`${RESOURCE_CACHE_TAG}-${countryId}`);
revalidateTag(`${COUNTRY_CONFIG_CACHE_TAG}-${countryId}`);
revalidateTag(`${SEO_CACHE_TAG}-${countryId}`);
locales?.forEach((locale) => {
  revalidateTag(`${locale}-${BLOGS_CACHE_TAG}-${countryId}`);
  revalidateTag(`${locale}-${CAREERS_CACHE_TAG}-${countryId}`);
  revalidateTag(`${locale}-${CATEGORIES_CACHE_TAG}-${countryId}`);
});
```

Fix — add the `'max'` profile (stale-while-revalidate):

```ts
revalidateTag(`${COUNTRY_CACHE_TAG}-${countryId}`, "max");
// …same for all 7 calls
```

- This is an admin-triggered cache-reset endpoint (`export const dynamic = "force-dynamic"`), so `'max'` is appropriate.
- `updateTag` (read-your-writes, immediate) is **Server-Actions-only** and cannot be used in this route handler, so `revalidateTag(tag, 'max')` is the correct choice here.
- Also relevant (Next 15): `fetch` is no longer cached by default. The data services opt into caching via `next: { tags }` passed through `fetcher(url, config)` ([`src/lib/data-fetcher/fetcher.ts`](../src/lib/data-fetcher/fetcher.ts) forwards `RequestInit`). Verify each service still sets its tags/revalidate so the reset endpoint's tag invalidation keeps working. Note: `cacheLife`/`cacheTag` are now stable — drop any `unstable_` prefixes (none found today).

---

## 7. Breaking change #3 — `middleware.ts` → `proxy.ts`

Next 16 renames the convention. `src/middleware.ts` must become **`src/proxy.ts`** with the exported function renamed `middleware` → `proxy`.

Current (`src/middleware.ts`):

```ts
export default async function middleware(request: NextRequest) { ... }
export const config = { matcher: [ ... ] };
```

After (`src/proxy.ts`):

```ts
export default async function proxy(request: NextRequest) { ... }   // renamed
export const config = { matcher: [ ... ] };                          // unchanged
```

Notes specific to this file:

- It already runs Node-only work (a per-request `fetch` to `/api/country`, tenant header injection). Proxy runs on the **Node.js runtime**, so this is fine — but confirm there are no `export const runtime = "edge"` assumptions anywhere (none found).
- `createIntlMiddleware` from `next-intl/middleware` is still the correct import inside `proxy.ts` (the function name didn't change, only the file).
- Codemod: `npx @next/codemod@canary middleware-to-proxy .`
- The combination that breaks next-intl locale routing in Next 16 is: the file rename **+** next-intl v4 provider/`locale` return. Do §6 and §7 together and test locale routing as one unit.

> **Performance note (pre-existing, worth flagging):** the proxy does a network `fetch` of country data on **every** matched request. That cost remains after the upgrade. Consider caching it (e.g. `unstable_cache`/in-memory TTL) as a follow-up — out of scope for the upgrade itself.

---

## 8. React 19 + animation library

### 8.1 framer-motion → motion

React 19 support requires `motion` v12 (the renamed `framer-motion`). Used in **35+ files** (e.g. `lazy-motion-wrapper.tsx`, most `src/views/**` pages, `BannerHero.tsx`).

- Replace dependency: remove `framer-motion`, add `motion`.
- Update imports: `from "framer-motion"` → `from "motion/react"`.
  ```bash
  grep -rln "framer-motion" src
  # then replace import specifier "framer-motion" -> "motion/react"
  ```
- The public API (`motion.div`, `useScroll`, `useTransform`, `AnimatePresence`, etc.) is unchanged; this is mostly an import-path swap. Pay attention to `lazy-motion-wrapper.tsx` (LazyMotion/`m` usage) — verify feature bundles still import correctly.

> If you prefer the smallest diff, recent `framer-motion` v12 also works and re-exports from `motion`; but the canonical path for React 19 is the `motion` package. Pick one and be consistent.

### 8.2 React 19 codemods / gotchas

- Run `npx @next/codemod@canary upgrade latest` which also applies React 19 codemods, or `npx codemod@latest react/19/migration-recipe`.
- `useFormState` → `useActionState`: **none found** in this codebase ✓.
- `ref` as a prop / `forwardRef` deprecation: not required to change immediately; Radix/UI libs handle their own.
- Verify any `any`-typed refs and `useRef()` calls compile under `@types/react@19` (the ref types tightened). `recaptcha-wrapper.tsx` and `home/contact/ContactForm.tsx` use `any` recaptcha refs — should still compile.

---

## 9. Tooling — `next lint` removed

Next 16 removes the `next lint` command, so the `"lint": "next lint"` script will fail.

- Migrate to ESLint directly with flat config (ESLint 9):
  - Upgrade `eslint` to `^9`, keep `eslint-config-next` pinned to `16.2.6`.
  - Replace `.eslintrc.json` (`{ "extends": "next/core-web-vitals" }`) with `eslint.config.mjs` (flat config) importing the Next config.
  - Update script:
    ```json
    "lint": "eslint ."
    ```
  - Codemod available: `npx @next/codemod@canary next-lint-to-eslint-cli .`
- Confirm `prettier` + `prettier-plugin-tailwindcss` still run independently (unaffected).

---

## 10. Turbopack (default bundler in 16)

- Next 16 uses **Turbopack by default** for `next dev` and `next build`.
- **No custom webpack config exists** in `next.config.mjs`, so there's nothing to migrate and no build-fail guard triggered. ✅
- The `next-intl` plugin (`createNextIntlPlugin`) is Turbopack-compatible.
- If any unforeseen Turbopack issue appears at build time, the temporary escape hatch is to opt back to webpack for a build (`next build --webpack`) while investigating — but treat that as a stopgap, not the goal.

---

## 11a. `next/image` config default changes (behavioral)

Next 16 changed several `images` defaults. No `<Image quality={…}>` props exist in the codebase and config already uses `remotePatterns`, so **no build break** — but two behavioral changes are worth a conscious decision in `next.config.mjs`:

| Default                          | Old           | New (16)                           | Impact here                                                                                                                                                                          |
| -------------------------------- | ------------- | ---------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `images.qualities`               | all allowed   | `[75]` only                        | All images already render at the default quality 75 (no explicit `quality` props) → **no visual change**. Add `images.qualities: [50, 75, 100]` only if you later need other levels. |
| `images.minimumCacheTTL`         | 60s           | 14400s (4h)                        | Optimized remote images (the 4 `paradigmegypt.com` hosts) cache longer by default. Usually desirable; set back to `60` only if images must refresh faster.                           |
| `images.imageSizes`              | includes `16` | `16` removed                       | Smaller `srcset`; no action unless 16px images are needed.                                                                                                                           |
| `images.maximumRedirects`        | unlimited     | `3`                                | Fine unless an image host chains >3 redirects.                                                                                                                                       |
| `images.dangerouslyAllowLocalIP` | n/a           | blocked by default                 | Only matters for local-IP image sources (none).                                                                                                                                      |
| local images w/ query string     | allowed       | need `images.localPatterns.search` | No local query-string image sources found.                                                                                                                                           |

**Recommendation:** leave defaults as-is (no visual regression expected); revisit `minimumCacheTTL` only if content teams report stale images.

---

## 11. Items confirmed SAFE (no change needed)

- **`next/image`**: already uses `images.remotePatterns` (no deprecated `images.domains`, no `next/legacy/image`). ✅
- **Fonts**: modern `next/font/local` + `next/font/google` in `src/lib/fonts.ts`. ✅
- **API routes** (`src/app/api/country/route.ts`, `src/app/api/application/reset/route.ts`): use `NextRequest`/`NextResponse`, `revalidateTag`, `export const dynamic = "force-dynamic"` — all valid in 16. Re-verify caching expectations (GET route handlers are not cached by default since 15). ✅ with verification.
- **No `next/router` (pages router) imports**; navigation goes through `@/i18n/navigation`. ✅
- **No `experimental` flags / no `runtime = "edge"` exports**. ✅
- **`generateStaticParams`**: none present (pages render dynamically). ✅

---

## 12. Step-by-step execution checklist

```bash
# Phase 0 — baseline
git checkout -b feat/upgrade-next-16
npm run build            # must pass on Next 14 first

# Phase 1 — prereqs
node -v                  # >= 20.9
# add "engines.node" >= 20.9.0 to package.json; add .nvmrc

# Phase 2 — core bump + codemods
npx @next/codemod@canary upgrade 16.2.6
# (installs next@16.2.6, react@19, react-dom@19, @types/* ; applies codemods)
npm i -D eslint-config-next@16.2.6

# Phase 3 — async request APIs (verify codemod output)
npx @next/codemod@canary next-async-request-api .
grep -rn "params: {" src/app          # expect: none
grep -rn "} = params" src/app          # expect: none (all awaited)

# Phase 4 — next-intl v4
npm i next-intl@^4
#  -> edit src/i18n/index.ts (requestLocale + return locale)
#  -> edit src/i18n/navigation.ts (createNavigation)
#  -> add locale to NextIntlClientProvider

# Phase 5 — middleware -> proxy
npx @next/codemod@canary middleware-to-proxy .
#  -> confirm src/proxy.ts exports `proxy`, matcher intact

# Phase 6 — React 19 deps
npm rm framer-motion && npm i motion
# replace import "framer-motion" -> "motion/react" across src
# bump Radix, react-hook-form, sonner, lucide-react, embla, etc. to latest

# Phase 7 — lint
npm i -D eslint@^9
npx @next/codemod@canary next-lint-to-eslint-cli .
#  -> eslint.config.mjs ; update "lint" script to "eslint ."

# Phase 8 — build/typecheck
npx tsc --noEmit
npm run lint
npm run build            # Turbopack build

# Phase 9 — run + QA
npm run dev
```

---

## 13. QA / acceptance matrix

Test **per tenant (Texas + Church's)** and **per locale (incl. an RTL `ar` locale)**:

- [ ] Home + every top-level page renders (the 17 static + 4 dynamic routes).
- [ ] Dynamic routes resolve params: `menu/[category]`, `menu/[category]/[menu-item]`, `blogs/[slug]`, `careers/[InnerCareers]`, and the `[...rest]` catch-all.
- [ ] `generateMetadata` produces correct titles/SEO/favicons (uses `params`).
- [ ] **i18n**: messages load, language switcher works, locale prefix routing (`localePrefix` "always" vs "never" per tenant locale count), `notFound()` for unknown locale.
- [ ] **Middleware/proxy**: tenant resolution via Host header, `x-tenant-*` headers reach server components (`getRuntimeConfig()`), `/Menu` → `/menu` redirect, `next.config` redirects (`/contact-us` → `/contact`, etc.).
- [ ] RTL layout (`dir`, Cairo font on `ar`) intact — see the existing `MenuSection` horizontal-scroll behavior.
- [ ] Forms submit (Careers, Birthday, Contact, Party, Coupons, Home Contact) incl. reCAPTCHA + the loading overlay.
- [ ] Animations render (motion package) — banners, sliders, reveals.
- [ ] Images load from all 4 `remotePatterns` hosts; `sharp` optimization works in build.
- [ ] API routes: `/api/country`, `/api/application/reset` (revalidation).
- [ ] Google Maps (`@vis.gl/react-google-maps`), lightbox, carousels.
- [ ] Production build (`next build`) + `next start` smoke test, not just dev.
- [ ] Lighthouse/Core Web Vitals sanity (React Compiler in 16 may change render behavior — optional to enable).

---

## 14. Rollback plan

- All work on `feat/upgrade-next-16`; **do not** merge until the full QA matrix passes on a preview deploy.
- Keep `package-lock.json` from the Next 14 baseline committed on `main`; rollback = revert the branch / redeploy previous build.
- Because hosting Node version changes (≥20.9), confirm the **previous** deployment still builds on the old Node if you must roll back — pin the old Node version in the rollback runbook.
- Tag the last known-good Next 14 release before merging.

---

## 15. Open questions / follow-ups (not blocking)

1. **Dynamic locales + next-intl v4 `routing`** — decide Option A vs B in §6.2; may need a small refactor of how the locale list is shared between proxy and navigation.
2. **`react-google-recaptcha-v3`** React 19 peer support — verify; have a fallback (e.g. fork/alternative) ready if it errors.
3. **Proxy per-request `fetch`** caching (perf) — separate ticket.
4. **React Compiler** (stable in 16) — opt-in later for auto-memoization; not part of this upgrade.
5. **Tailwind v3 → v4** — separate, independent migration.
6. **`radix-ui` umbrella vs individual packages** — consolidate to avoid version drift.

---

## References

- [Next.js — Upgrading: Version 16](https://nextjs.org/docs/app/guides/upgrading/version-16)
- [Next.js 16 release blog](https://nextjs.org/blog/next-16)
- [Next.js — Upgrading: Version 15](https://nextjs.org/docs/app/guides/upgrading/version-15)
- [Next.js — Renaming Middleware to Proxy](https://nextjs.org/docs/messages/middleware-to-proxy)
- [Next.js — Codemods](https://nextjs.org/docs/app/guides/upgrading/codemods)
- [next-intl — Proxy / middleware](https://next-intl.dev/docs/routing/middleware)
- [next-intl v4 + Next.js 16 setup guide](https://www.buildwithmatija.com/blog/nextjs-internationalization-guide-next-intl-2025)
- [Fixing next-intl in Next.js 16 (rename middleware → proxy)](https://www.buildwithmatija.com/blog/next-intl-nextjs-16-proxy-fix)
- [Motion / Framer Motion React upgrade guide](https://motion.dev/docs/react-upgrade-guide)
