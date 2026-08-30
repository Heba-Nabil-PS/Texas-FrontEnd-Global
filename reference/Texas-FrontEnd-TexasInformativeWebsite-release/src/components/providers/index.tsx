"use client";

import { DataProvider } from "@/components/providers/data-provider";
import { ConfigProvider } from "./config-provider";
import type { TenantClientConfig } from "./config-provider";
import type {
  CountryConfigurationsProps,
  CountryWithLanguageProps,
} from "@/modules/country/types/country.types";

type ProvidersProps = {
  children: React.ReactNode;
  countryData: CountryWithLanguageProps;
  countryConfigResults: CountryConfigurationsProps | null;
  // Tenant-specific values resolved server-side from middleware headers
  countryId: string;
};

export function Providers(props: ProvidersProps) {
  const { children, countryData, countryConfigResults, countryId } = props;

  const tenantConfig: TenantClientConfig = {
    ...(countryConfigResults ?? ({} as CountryConfigurationsProps)),
    countryId,
  };

  return (
    <DataProvider data={countryData}>
      <ConfigProvider data={tenantConfig}>{children}</ConfigProvider>
    </DataProvider>
  );
}
