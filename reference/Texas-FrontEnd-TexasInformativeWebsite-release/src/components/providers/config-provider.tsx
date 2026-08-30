"use client";

import { createContext, useContext } from "react";
import type { CountryConfigurationsProps } from "@/modules/country/types/country.types";

// Tenant-specific values surfaced to client components via useConfig().
// These are resolved server-side (in the locale layout) and passed as props.
export type TenantClientConfig = CountryConfigurationsProps & {
  countryId: string;
};

const ConfigContext = createContext<TenantClientConfig>(
  {} as TenantClientConfig,
);

export const useConfig = () => useContext<TenantClientConfig>(ConfigContext);

type ConfigProviderProps = {
  children: React.ReactNode;
  data: TenantClientConfig | null;
};

export function ConfigProvider(props: ConfigProviderProps) {
  const { children } = props;

  const data = props?.data || ({} as TenantClientConfig);

  return (
    <ConfigContext.Provider value={data}>{children}</ConfigContext.Provider>
  );
}
