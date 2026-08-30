import { createNavigation } from "next-intl/navigation";

// next-intl v4: `createSharedPathnamesNavigation` was merged into
// `createNavigation`. Called without a routing config (shared pathnames),
// matching the previous behaviour where locales are resolved dynamically by
// the proxy rather than from a static routing object.
export const { Link, redirect, usePathname, useRouter } = createNavigation();
