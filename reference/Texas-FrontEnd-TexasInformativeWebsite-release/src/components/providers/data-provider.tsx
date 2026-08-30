"use client";

import { createContext, useContext } from "react";
import type { CountryWithLanguageProps } from "@/modules/country/types/country.types";

const DataContext = createContext<CountryWithLanguageProps>(
  {} as CountryWithLanguageProps,
);

export const useData = () => useContext<CountryWithLanguageProps>(DataContext);

type DataProviderProps = {
  children: React.ReactNode;
  data: CountryWithLanguageProps;
};

export function DataProvider(props: DataProviderProps) {
  const { children, data } = props;

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
}
