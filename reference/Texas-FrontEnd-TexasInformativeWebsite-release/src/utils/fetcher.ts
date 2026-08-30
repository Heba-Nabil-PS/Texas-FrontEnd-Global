import ErrorHandler from "./errorHandler";

export async function fetcher(url: string, config: RequestInit = {}) {
  const fixedConfig: RequestInit = {
    cache: "no-store" as RequestCache,
  };

  const newConfig = Object.assign(fixedConfig, config);

  const response = await fetch(url, newConfig);

  const data = await response?.json();

  if (data?.ResonseCode !== 200)
    throw new ErrorHandler(
      data?.ResonseTitle,
      data?.ResonseMessage,
      data?.ResonseCode
    );

  return data?.Results;
}
