# Dependency Issues & Fix Plan

> Generated from `npm audit`, `npm outdated`, `npm fund`, and `npm ls` — first run **2026-06-09**, **re-verified 2026-06-09** (post Next.js 16 upgrade — see [nextjs-16-upgrade-plan.md](./nextjs-16-upgrade-plan.md)).

---

## ⏱️ Status (latest rerun — 2026-06-09)

**Vulnerabilities: 9 → 2** ✅  · the safe `npm audit fix` **and** the within-major updates have been applied.

| | Then | Now |
|---|---|---|
| `npm audit` | 9 (1 low · 6 mod · 2 high) | **2 moderate** |
| Outstanding vulns | dompurify, minimatch, picomatch, ws, yaml, brace-expansion, postcss(×2), @tootallnate/once | **only Next-bundled `postcss@8.4.31`** |
| Duplicate `zod` (3 + 4) | present (dev-only) | **resolved** — single `zod@3.25.76` |

What changed since the first report:
- ✅ `npm audit fix` applied — **dompurify 3.3.1 → 3.4.8** (the app-facing XSS fix), plus minimatch, picomatch, ws, yaml, brace-expansion, @tootallnate/once, nanoid.
- ✅ Within-major updates applied — `postcss 8.4.39 → 8.5.15` (direct), `tailwindcss → 3.4.19`, `tailwind-merge → 2.6.1`, `date-fns → 4.4.0`, `class-variance-authority → 0.7.1`, `zod → 3.25.76`, `prettier → 3.8.3`, `prettier-plugin-tailwindcss → 0.7.4`, `isomorphic-dompurify → 2.36.0`, `react-icons → 5.6.0`, `libphonenumber-js → 1.13.6`, `@types/node → 20.19.42`, `typescript → 5.9.3`.
- ✅ `zod` deduped to a single `3.25.76` (the old dev-only `zod@4` from `eslint-plugin-react-hooks` is gone).
- ⏳ Still pinned at `next@16.2.6` / `eslint-config-next@16.2.6` (patch `16.2.7` available — see §2; note it does **not** fix the postcss issue).

---

## 1. Remaining security vulnerabilities (`npm audit` → 2 moderate)

Both remaining advisories are the **same root**: the `postcss` that **Next.js bundles internally**.

```
postcss  <8.5.10   (moderate, GHSA-qx2v-qp2m-jg93 — XSS via unescaped </style> in CSS stringify)
  node_modules/next/node_modules/postcss     ← postcss@8.4.31, pinned by Next
  next  depends on vulnerable postcss
```

`npm ls postcss` confirms our **direct** `postcss` is already fixed (`8.5.15`); only Next's internal copy is `8.4.31`.

```
+-- next@16.2.6
| `-- postcss@8.4.31          ← the only offender
+-- postcss@8.5.15            ← ours, patched ✅
`-- tailwindcss@3.4.19 → postcss@8.5.15 (deduped) ✅
```

### Why it isn't auto-fixed
- `npm audit fix --force` "fixes" it by installing **`next@9.3.3`** — a 7-major downgrade. **Never run it.**
- **Bumping Next does NOT help (verified):** `next@16.2.6` **and** the latest patch **`next@16.2.7` both pin `postcss@8.4.31`**. So the §2 Next bump is still worth taking for other reasons, but it will **not** clear this advisory.

### Real-world risk: low
The advisory is XSS in PostCSS's CSS **stringify** output, which runs at **build time** over our own first-party CSS — not attacker-controlled input. No runtime exposure to end users.

### How to actually reach 0 vulnerabilities (optional)
Force Next's bundled `postcss` up to the patched line with an npm **override** in `package.json` (postcss 8.4 → 8.5 is a safe minor):

```jsonc
{
  "overrides": {
    "postcss": "^8.5.15"
  }
}
```
then:
```bash
npm install
npm audit         # expect: 0 vulnerabilities
npm run build     # verify Turbopack/PostCSS still build cleanly
```
> Caveat: this overrides a transitive version Next ships with. 8.5.x is backward-compatible with 8.4.x, so risk is minimal — but **gate it on a successful `npm run build`**. If anything misbehaves, remove the override; the underlying risk is low/build-time. Otherwise, simply wait for a Next.js release that bumps its bundled postcss and drop the override then.

---

## 2. Remaining safe updates — within current major

Most within-major updates are already applied (see Status). What's left:

| Package | Current | Target | Notes |
|---|---|---|---|
| next | 16.2.6 | 16.2.7 | patch (pinned exact, so `npm update` won't move it). **Does NOT fix §1** but still a worthwhile patch. |
| eslint-config-next | 16.2.6 | 16.2.7 | keep in lockstep with `next`. |
| prettier-plugin-tailwindcss | 0.7.4 | 0.8.0 | `0.x` minor — low risk; verify formatting unchanged. |

```bash
npm i next@16.2.7 -E
npm i -D eslint-config-next@16.2.7 -E
npm i -D prettier-plugin-tailwindcss@0.8.0
npm run build && npx tsc --noEmit && npm run lint
```

Everything else from `npm outdated` is now **major-only** → §3.

---

## 3. Major upgrades — deferred (each its own PR)

Intentionally held during the Next 16 migration; current pinned majors are React-19-compatible. Tackle individually, with testing:

| Package | Current | Latest | Why deferred / risk |
|---|---|---|---|
| tailwindcss | 3.4.19 | **4.3.0** | v4 is a config/engine rewrite (CSS-first config). Largest — do last / standalone. See Next's `tailwind-v3-css.md`. |
| eslint | 9.39.4 | **10.4.1** | v10 drops legacy `.eslintrc` entirely; we're on flat config so feasible — verify `eslint-config-next` peer (`>=9`) accepts 10. |
| @hookform/resolvers | 3.10.0 | **5.4.0** | v4/v5 resolver API + Standard Schema changes; retest all forms (esp. `PartyForm` ZodEffects). |
| zod | 3.25.76 | **4.4.3** | v4 major rewrite; pair with resolvers v5. Review app schemas. |
| sonner | 1.7.4 | **2.0.7** | v2 default/API changes; retest toasts. |
| lucide-react | 0.577.0 | **1.17.0** | 0→1 major; verify icon names still exported (`Download`, etc.). |
| react-dropzone | 14.4.1 | **15.0.0** | retest careers CV upload `Dropzone`. |
| react-intersection-observer | 9.16.0 | **10.0.3** | retest `useInView` scroll-reveal usages. |
| typescript | 5.9.3 | **6.0.3** | TS 6 — verify build + types; Next needs ≥5.1. |
| tailwind-merge | 2.6.1 | **3.6.0** | v3 major; pairs naturally with the tailwindcss v4 migration. |
| @types/node | 20.19.42 | **25.9.2** | keep matched to the deployed Node major (currently 20). |

> Sequencing: **zod 4 + @hookform/resolvers 5** together; **eslint 10** alone; **tailwindcss 4 + tailwind-merge 3** together and last.

---

## 4. Non-issues (no action)

- **`zod` duplicate — RESOLVED.** Previously `zod@4` was pulled (dev-only) by `eslint-plugin-react-hooks`; after updates everything deduped to a single **`zod@3.25.76`** (confirmed via `npm ls zod`).
- **`framer-motion@12.40.0` in the tree:** now a **transitive** dep of `motion@12` (which we migrated to). Not a direct dependency; nothing to remove.
- **`npm fund` — packages requesting funding:** informational only. Notable maintainers if sponsorship is ever considered: next-intl (`@amannn`), react-hook-form, zod (`colinhacks`), sharp/libvips, eslint, postcss, prettier, typescript-eslint, tailwind-merge (`dcastil`).

---

## 5. Recommended next steps

```bash
# A) (Optional) reach 0 vulns — add overrides.postcss "^8.5.15" to package.json, then:
npm install && npm audit && npm run build

# B) Take the Next patch + tooling minor (does not fix §1, but good hygiene)
npm i next@16.2.7 -E && npm i -D eslint-config-next@16.2.7 -E
npm i -D prettier-plugin-tailwindcss@0.8.0
npm run build && npx tsc --noEmit && npm run lint

# C) Major upgrades (§3) — separate, individually-tested PRs later
```

**Never** run `npm audit fix --force` — it will attempt `next@9.3.3`.

---

## Appendix — counts at time of this rerun
- `npm audit`: **2 moderate** (both = Next-bundled `postcss@8.4.31`); was 9.
- `npm ls postcss`: direct `8.5.15` ✅, Next-internal `8.4.31` ⚠️.
- `npm ls zod`: single `3.25.76` ✅ (dedupe confirmed).
- `npm outdated`: 15 behind latest → **3 within-major** remaining (next, eslint-config-next, prettier-plugin-tailwindcss), rest major-only.
- `next@16.2.7` (latest) still bundles `postcss@8.4.31` (verified via `npm view`).
