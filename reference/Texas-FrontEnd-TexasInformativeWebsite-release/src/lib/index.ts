import { FIXED_ENV_VARIABLES } from "@/constants";
import type {
  CountryModulesProps,
  CountryWithLanguageProps,
} from "@/modules/country/types/country.types";

export const getLocaleDirection = (locale: string) => {
  if (!locale) return "ltr";

  return locale === "ar" ? "rtl" : "ltr";
};

/**
 * Whether a nav link should be highlighted for the current route. Active on the
 * exact path and any nested sub-path — e.g. "/menu" matches "/menu" and
 * "/menu/test", but not "/menial". `pathname` is expected to be locale-stripped
 * (as returned by next-intl's `usePathname`). External/absolute URLs are never
 * treated as active, and "/" only matches the home route exactly.
 */
export const isNavLinkActive = (url?: string, pathname?: string): boolean => {
  if (!url || !pathname || /^https?:\/\//i.test(url)) return false;

  const normalize = (path: string) => path.replace(/\/+$/, "") || "/";

  const target = normalize(url);
  const current = normalize(pathname);

  if (target === "/") return current === "/";

  return current === target || current.startsWith(`${target}/`);
};

export const getLocalesFromCountryData = (
  data?: CountryWithLanguageProps[] | null,
) => {
  if (!data) return ["en"];

  return data?.map((lang) => lang.isoCode?.trim()?.toLowerCase()) || ["en"];
};

export const getDefaultLocaleFromCountryData = (
  data: CountryWithLanguageProps[] | null,
) => {
  if (!data) return "en";

  return (
    data
      ?.find((lang) => lang.prima)
      ?.isoCode?.trim()
      ?.toLowerCase() || "en"
  );
};

export function displayInOrder<
  T extends {
    displayOrder?: number;
    order?: number;
    Order?: number;
    DisplayOrder?: number;
  },
>(
  data: T[] | undefined | null,
  sortBy: "displayOrder" | "order" | "Order" | "DisplayOrder" = "displayOrder",
): T[] {
  if (!data || !Array.isArray(data)) return [];

  return data ? data.sort((a, b) => Number(a[sortBy]) - Number(b[sortBy])) : [];
}

// Remove ><*$# Whitespaces from inputs
export function sanitizeInputs(
  inputs: { [keyTerm: string]: any },
  exceptions: string[] = [],
): { [keyTerm: string]: any } {
  return Object.entries(inputs).reduce(
    (sanitizedInputs: { [keyTerm: string]: any }, [keyTerm, value]) => {
      if (exceptions.includes(keyTerm)) {
        sanitizedInputs[keyTerm] = value;
      } else {
        if (typeof keyTerm === "string") {
          sanitizedInputs[keyTerm] = value.trim().replace(/[<>*$#]/g, "");
        } else {
          sanitizedInputs[keyTerm] = value;
        }
      }
      return sanitizedInputs;
    },
    {} as { [keyTerm: string]: any },
  );
}

// Check is Module Active
export function isModuleOn(
  modules?: CountryModulesProps[],
  moduleName?: string,
) {
  if (!modules || !moduleName?.trim()) return true;

  return !!modules?.find(
    (item) =>
      item.name?.trim().toLowerCase() === moduleName?.trim().toLowerCase(),
  );
}

// Get Location Difference
export function calcDistanceBetweenTwoPoints(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const R = 6371; // Radius of the Earth in kilometers
  const dLat = ((lat2 - lat1) * Math.PI) / 180; // Convert degrees to radians
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const distance = R * c; // Distance in kilometers

  return distance;
}

// Check version flavor whether its Texas or Churchs
export function isTexasVersion() {
  return FIXED_ENV_VARIABLES.FLAVOR?.trim().toLowerCase() === "texas";
}

export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
) {
  const distance = calcDistanceBetweenTwoPoints(lat1, lon1, lat2, lon2); // Distance in kilometers

  return distance.toFixed(2);
}
