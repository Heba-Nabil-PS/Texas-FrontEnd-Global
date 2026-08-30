# Security Audit — Texas Informative Website

> Code-level security review of the whole project, **2026-06-09**.
> Scope: application code (App Router, proxy, API routes, forms, data layer, rendering). For **dependency** (npm) vulnerabilities see the companion [dependency-issues-and-fix-plan.md](./dependency-issues-and-fix-plan.md).
> Context: public, multi-tenant marketing site (Next.js 16 / React 19). **No end-user auth or sessions** — so classic CSRF/session attacks are mostly N/A; the main attack surface is XSS via CMS content, unauthenticated side-effecting endpoints, SSRF/host trust, and missing hardening headers.

---

## Severity summary

| #   | Finding                                                         | Severity                       | Type                                  |
| --- | --------------------------------------------------------------- | ------------------------------ | ------------------------------------- |
| 1   | Unauthenticated cache-reset endpoint (`/api/application/reset`) | **High**                       | Broken access control / DoS           |
| 2   | Unsanitized HTML injection in `AppDataView`                     | ✅ **Fixed** (was Medium–High) | Stored XSS                            |
| 3   | Inline GA script interpolates `measurementId` unescaped         | **Medium**                     | Script injection                      |
| 4   | No security headers / Content-Security-Policy                   | **Medium**                     | Missing hardening / clickjacking      |
| 5   | reCAPTCHA & file-upload validation are client-side only         | **Medium**                     | Input validation (depends on backend) |
| 6   | Host-header trust & tenant isolation fragility                  | **Low–Medium**                 | SSRF-adjacent / cache poisoning       |
| 7   | `.gitignore` only ignores `.env*.local`                         | **Low**                        | Secret-exposure risk                  |
| 8   | Error responses can leak backend details                        | **Low**                        | Information disclosure                |
| 9   | DOMPurify uses default config (no link hardening)               | **Low**                        | XSS hardening                         |
| 10  | `NEXT_PUBLIC_GOOGLE_MAP_API_KEY` exposed to client              | **Info**                       | Key exposure (expected)               |
| 11  | Dependency vulns: 2 moderate remaining                          | **Low–Medium**                 | See dependency doc                    |

✅ **Good practices observed** are listed in §13.

---

## 1. 🔴 High — Unauthenticated cache-reset endpoint

**File:** [`src/app/api/application/reset/route.ts`](../src/app/api/application/reset/route.ts)

```ts
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  // …no auth check…
  await fetch(`${FIXED_ENV_VARIABLES.BASE_URL}/values`, { cache: "no-store" });
  await fetch(`${FIXED_ENV_VARIABLES.NODE_BASE_URL}/app/ClearCash`, { method: "POST", … });
  // …
  revalidateTag(`${COUNTRY_CACHE_TAG}-${countryId}`, "max");   // + 6 more tags
  return new Response(null, { status: 302, headers: { Location: "/" } });
}
```

**Impact**

- **Anyone** who knows (or guesses) the URL can purge all Next.js data-cache tags for a tenant **and** trigger the backend `ClearCash` endpoint — repeatedly. This is a cheap **DoS / cache-stampede** amplifier (each call forces full cache rebuilds + backend load).
- It's a **GET with side effects**, so it can be triggered cross-site (e.g. an `<img src="…/api/application/reset">` on any page a victim/admin visits) — i.e. CSRF-able with zero auth.

**Recommendation**

- Require a shared secret: compare a header/query token against `process.env.CACHE_RESET_SECRET` and return `401` otherwise.
- Make it `POST` (not `GET`) so it isn't triggerable by image/link prefetch.
- Rate-limit, and ideally restrict to internal callers / a webhook IP allowlist.

```ts
export async function POST(request: Request) {
  const token = request.headers.get("x-reset-token");
  if (!token || token !== process.env.CACHE_RESET_SECRET) {
    return new Response("Unauthorized", { status: 401 });
  }
  // …existing logic…
}
```

---

## 2. ✅ FIXED (was 🟠 Medium–High) — Unsanitized HTML injection (stored XSS)

> **Resolved 2026-06-09:** added `import { domSanitize }` and wrapped the content in `domSanitize(DiscoverMoreWithTheAppData?.DescriptionLong?.trim())` in `AppDataView.tsx`, making it consistent with the other ~29 sinks.

**File:** [`src/views/app/AppDataView.tsx:97-103`](../src/views/app/AppDataView.tsx#L97-L103)

```tsx
<div
  dangerouslySetInnerHTML={{
    __html: DiscoverMoreWithTheAppData?.DescriptionLong || "", // ❌ NOT sanitized
  }}
/>
```

This is the **only** one of ~30 `dangerouslySetInnerHTML` sinks that does **not** pass the content through `domSanitize()`. Every other view does (e.g. `MenuSection`, `BlogDetailsView`, `story/*`, `terms`, `privacy`, …). The content comes from backend "advanced content" (CMS) — if any CMS field is attacker-influenced (compromised admin, weak CMS input validation, or a shared content source), this renders raw `<script>`/event-handler HTML → **stored XSS** in users' browsers.

**Recommendation** — make it consistent with the rest of the app:

```tsx
import { domSanitize } from "@/lib/domSanitize";
// …
__html: domSanitize(DiscoverMoreWithTheAppData?.DescriptionLong?.trim()),
```

> Defense-in-depth: a CSP (§4) would also blunt this.

---

## 3. 🟡 Medium — Inline GA script interpolates `measurementId` unescaped

**File:** [`src/components/global/ga-loader.tsx:23-48`](../src/components/global/ga-loader.tsx#L23-L48)

```ts
const init = `
  …
  if (!window.__GA_INITED__.has('${measurementId}')) {
    gtag('config', '${measurementId}', { send_page_view: true });
  …`;
return <Script id="ga4-init" dangerouslySetInnerHTML={{ __html: init }} />;
```

`measurementId` (from `countryConfigResults.googleAnalyticsID`) is interpolated **raw** into an inline `<script>`. The `src` URL correctly uses `encodeURIComponent`, but the inline block does not. A malformed/malicious value containing `'`, `</script>`, etc. breaks out of the string literal → arbitrary JS execution. Source is backend config (semi-trusted), so risk is moderate, but it's a classic stored-config injection.

**Recommendation** — validate the format before use (GA IDs are `G-XXXXXXXXXX` / `UA-…` / `GT-…`):

```ts
if (!/^[A-Za-z0-9-]+$/.test(measurementId)) return null;
```

---

## 4. 🟡 Medium — No security headers / Content-Security-Policy

**File:** [`next.config.mjs`](../next.config.mjs) — no `headers()` block (confirmed: no CSP, `X-Frame-Options`, `Strict-Transport-Security`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`).

**Impact**

- **No clickjacking protection** — the site can be framed by any origin.
- **No CSP** — given the heavy use of `dangerouslySetInnerHTML`, a CSP is the most valuable defense-in-depth against findings #2/#3.
- No HSTS, MIME-sniffing, or referrer hardening.

**Recommendation** — add a `headers()` block. A CSP must allowlist the third parties in use (Google Analytics/Tag Manager, Google Maps, reCAPTCHA, Usercentrics CMP, the image repository hosts). Start in **report-only** mode, then enforce:

```js
async headers() {
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com https://www.google.com https://www.gstatic.com https://maps.googleapis.com https://web.cmp.usercentrics.eu",
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https:",
    "connect-src 'self' https:",
    "frame-src https://www.google.com https://*.usercentrics.eu",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join("; ");
  return [{
    source: "/:path*",
    headers: [
      { key: "Content-Security-Policy-Report-Only", value: csp }, // switch to Content-Security-Policy after testing
      { key: "X-Frame-Options", value: "DENY" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
      { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
      { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(self)" },
    ],
  }];
}
```

> Note `'unsafe-inline'` for scripts is required by the current inline GA/CMP pattern; a stricter nonce-based CSP is a larger follow-up.

---

## 5. 🟡 Medium — reCAPTCHA & file-upload validation are client-side only

**Files:** [`src/hooks/useCaptcha.ts`](../src/hooks/useCaptcha.ts), the form views, [`src/components/global/drop-zone.tsx`](../src/components/global/drop-zone.tsx), [`src/constants/index.ts`](../src/constants/index.ts) (`MAX_FILE_SIZE = 5MB`, `AVAILABE_FILE_TYPES`).

- **reCAPTCHA:** the app generates a token client-side and forwards `RecaptchaToken` to the **backend**. The Next app does **not** verify it. Forms also do client-side `if (!captcha) return` checks, which are trivially bypassable. `PartyForm` even sends a literal `"test"` token when captcha is disabled. → Spam/abuse protection is only as good as the **backend's** server-side `siteverify` check.
- **File upload (careers CV):** type/size limits are enforced by `react-dropzone` in the browser only. An attacker can POST arbitrary files/sizes directly to the backend endpoint.

**Recommendation**

- Confirm (and document) that the **backend** validates the reCAPTCHA token server-side for every form, and re-validates uploaded file **type (by content, not just extension), size, and count**. If the Next app is meant to be the gatekeeper, add a server action / route that calls Google `siteverify` before forwarding.
- Treat client-side limits as UX only, never as a security control.

---

## 6. 🟡 Low–Medium — Host-header trust & tenant isolation

**Files:** [`src/proxy.ts`](../src/proxy.ts), [`src/tenant.config.ts`](../src/tenant.config.ts), [`src/lib/get-tenant-config.ts`](../src/lib/get-tenant-config.ts)

- Tenant identity is derived from the **`Host` header**, which is client-controllable. `getTenantConfig()` maps the subdomain slug to a **static** `TENANT_MAP` (so `websiteUrl` can't be set to an arbitrary attacker host → SSRF is limited). ✅
- The proxy copies request headers and **overwrites** the 4 `x-tenant-*` keys, so client-supplied tenant headers are neutralized **on page routes**. ✅
- **But** the proxy `matcher` excludes `/api/*`, so API routes never get the injected headers. Today the API routes pass `countryId` explicitly, so they're safe — however, any **future** API route that calls a service relying on `getEnvConfig()`/`x-tenant-*` headers would read **spoofable** values. Fragile by design.
- **Cache poisoning:** if a CDN/edge caches by URL but not by `Host`, a spoofed `Host` could cause one tenant's content to be cached/served for another.

**Recommendation**

- Explicitly **strip** inbound `x-tenant-*` headers at the proxy (don't just overwrite the 4 you know about — delete the namespace) so no stale/extra tenant header can leak through.
- Ensure API routes never trust `x-tenant-*`; always derive tenant from the validated `Host` or an explicit argument.
- Add `Vary: Host` (or include host in the cache key) at the CDN for tenant-specific responses.

---

## 7. 🟡 Low — `.gitignore` only ignores `.env*.local`

**File:** [`.gitignore`](../.gitignore) → `.env*.local`

Confirmed no env files are currently committed (✅) and `.env.local` is correctly ignored. **However**, the pattern `.env*.local` does **not** match a plain `.env` or `.env.production`. If someone later creates one with secrets, it would be committed.

**Recommendation** — broaden to cover all env files while keeping example files:

```gitignore
.env
.env.*
!.env.example
```

---

## 8. 🟡 Low — Error responses can leak backend details

**Files:** [`src/app/api/country/route.ts`](../src/app/api/country/route.ts) (`return NextResponse.json(error, { status: 500 })`), [`src/lib/data-fetcher/fetcher.ts`](../src/lib/data-fetcher/fetcher.ts) (rejects with backend `message`/`statusText`).

Raw error objects (including backend status text/messages) can be returned to the client. Low impact for a public site, but avoid surfacing internals.

**Recommendation** — return a generic message + status; log details server-side only.

---

## 9. 🟡 Low — DOMPurify default config (link hardening)

**File:** [`src/lib/domSanitize.ts`](../src/lib/domSanitize.ts) → `DOMPurify.sanitize(value)` (defaults).

The default config safely strips `<script>`/event handlers (good), but allows anchors that may open with `target="_blank"` without `rel="noopener noreferrer"` (reverse-tabnabbing) and permits a broad attribute set.

**Recommendation** (optional hardening):

```ts
DOMPurify.sanitize(value, {
  ADD_ATTR: ["target", "rel"],
  // hook to force rel="noopener noreferrer" on target=_blank links
});
```

Add a DOMPurify `afterSanitizeAttributes` hook to enforce `rel` on external links.

---

## 10. ℹ️ Info — `NEXT_PUBLIC_GOOGLE_MAP_API_KEY` exposed to client

Expected (Maps JS requires a browser key). **Action:** restrict the key in Google Cloud Console by **HTTP referrer** (your domains) and by **API** (Maps JS / Places only) so a leaked key can't be abused for billing.

---

## 11. Dependency vulnerabilities (summary)

`npm audit`: **2 moderate** remaining, both the **Next.js-bundled `postcss@8.4.31`** (build-time CSS stringify XSS, low real-world risk). Down from 9 after the applied fixes. Full analysis and the optional `overrides` fix are in [dependency-issues-and-fix-plan.md](./dependency-issues-and-fix-plan.md). **Never** run `npm audit fix --force` (it downgrades Next to 9.x).

---

## 12. Prioritized remediation plan

| Priority | Action                                                               | Finding |
| -------- | -------------------------------------------------------------------- | ------- |
| **P0**   | Add auth (secret token) + switch to POST on `/api/application/reset` | #1      |
| ✅ Done  | `domSanitize()` the `AppDataView` HTML                               | #2      |
| **P1**   | Validate `measurementId` format in `ga-loader`                       | #3      |
| **P1**   | Add security headers + CSP (report-only → enforce)                   | #4      |
| **P1**   | Confirm backend reCAPTCHA `siteverify` + server-side file validation | #5      |
| **P2**   | Strip inbound `x-tenant-*`; add `Vary: Host` / host-keyed cache      | #6      |
| **P2**   | Broaden `.gitignore` env patterns                                    | #7      |
| **P2**   | Generic error responses; log details server-side                     | #8      |
| **P3**   | DOMPurify link hardening hook                                        | #9      |
| **P3**   | Referrer-restrict the Maps API key                                   | #10     |
| **P3**   | Apply `overrides.postcss` to reach 0 npm vulns                       | #11     |

---

## 13. ✅ Good practices observed

- **DOMPurify** applied to ~29/30 `dangerouslySetInnerHTML` sinks (only #2 missed).
- **No secrets committed**; `.env.local` is git-ignored; no hardcoded API keys/secrets in source.
- **`poweredByHeader: false`** (no Next.js version banner).
- **`images.remotePatterns`** (not the deprecated `images.domains`) limits the image-optimizer to 4 known hosts → constrains image-proxy SSRF.
- Tenant `websiteUrl` resolves from a **static map**, not raw user input → limits SSRF in the proxy's country-data fetch.
- React blocks `javascript:` URLs in `href`, mitigating link-based XSS/open-redirect from CMS data; `next.config` redirects are all static.
- No `typescript.ignoreBuildErrors` / `eslint.ignoreDuringBuilds` / `dangerouslyAllowSVG` footguns enabled.
- DOMPurify itself was just upgraded to `3.4.8` (patched) via the dependency remediation.

---

_Methodology: manual code review + `grep`/`npm audit`/`git ls-files` across `src/`, config, and the data/proxy layer. This is a best-effort review, not a guarantee of completeness; a dynamic test (DAST) and a backend API review are recommended to complement it — several findings (#5, reCAPTCHA/file validation) depend on backend behavior outside this repo._
