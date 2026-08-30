export const getCountryAndLang = (locale: string) => {
  return {
    lang: locale,
  };
};
export function getDateInHours(
  dateString: string,
  locale: string = "en",
  hour12: boolean = true,
) {
  const formattedDate = new Date(dateString).toLocaleTimeString(locale, {
    hour: "numeric",
    minute: "numeric",
    hour12,
  });

  return formattedDate;
}
export const DEFAULT_MAP_ZOOM = 9;
