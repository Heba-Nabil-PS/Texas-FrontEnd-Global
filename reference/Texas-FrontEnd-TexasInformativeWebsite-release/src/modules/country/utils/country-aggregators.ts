import type { CountryAggregatorsProps } from "../types/country.types";

type Country = {
  isoCode: string;
  name: string;
};

type InputItem = {
  isoCode: string;
  name: string;
  aggregators: CountryAggregatorsProps[];
};

type OutputAggregator = CountryAggregatorsProps & {
  countries: Country[];
};

export function getUniqueFeaturedAggregators(
  data: InputItem[],
): CountryAggregatorsProps[] {
  const map = new Map<string, CountryAggregatorsProps>();

  for (const country of data) {
    for (const aggregator of country.aggregators) {
      if (!aggregator.featured) continue;

      const key = aggregator.alt?.trim()?.toLowerCase() || `${aggregator.id}`;

      if (!map.has(key)) {
        map.set(key, aggregator);
      }
    }
  }

  return Array.from(map.values());
}

export function groupAggregatorsByAlt(data: InputItem[]): OutputAggregator[] {
  const map = new Map<string, OutputAggregator>();

  for (const country of data) {
    for (const aggregator of country.aggregators) {
      const key = aggregator.alt?.trim()?.toLowerCase() || `${aggregator.id}`;

      if (!map.has(key)) {
        map.set(key, {
          ...aggregator,
          countries: [
            {
              isoCode: country.isoCode,
              name: country.name,
            },
          ],
        });
      } else {
        const existing = map.get(key)!;

        // Prefer the featured aggregator as the representative for this group.
        if (aggregator.featured && !existing.featured) {
          map.set(key, {
            ...aggregator,
            countries: existing.countries,
          });
        }

        const countryExists = existing.countries.some(
          (c) =>
            c.isoCode?.toLowerCase() === country.isoCode?.toLowerCase() &&
            c.name?.toLowerCase() === country.name?.toLowerCase(),
        );

        if (!countryExists) {
          existing.countries.push({
            isoCode: country.isoCode,
            name: country.name,
          });
        }
      }
    }
  }

  return Array.from(map.values());
}
