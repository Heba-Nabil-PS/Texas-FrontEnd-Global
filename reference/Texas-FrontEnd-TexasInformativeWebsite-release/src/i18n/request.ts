import { getRequestConfig } from "next-intl/server";
import { getCountryData } from "@/modules/country/services/country.service";
import {
  getDefaultLocaleFromCountryData,
  getLocalesFromCountryData,
} from "@/lib";
import {
  convertResourcesToMessages,
  getResources,
} from "@/modules/country/services/resources.service";

export default getRequestConfig(async ({ requestLocale }) => {
  // next-intl v4: the callback receives `requestLocale` (a Promise) instead of
  // `locale`, and the returned config must include `locale`.
  const requested = await requestLocale;

  const countryResponse = await getCountryData();
  const countryResults = countryResponse?.results;

  const locales = getLocalesFromCountryData(countryResults);
  const defaultLocale =
    getDefaultLocaleFromCountryData(countryResults) ?? locales[0] ?? requested;

  // The [locale] segment acts as a catch-all, so an invalid/undefined value is
  // coerced to a valid locale instead of throwing.
  const locale =
    requested && locales.includes(requested) ? requested : defaultLocale;

  const resourcesResponse = await getResources();
  const resources = resourcesResponse?.results;

  if (!resources) return { locale, messages: {} };

  const messages = await convertResourcesToMessages(resources, locale);

  return { locale, messages };
});
