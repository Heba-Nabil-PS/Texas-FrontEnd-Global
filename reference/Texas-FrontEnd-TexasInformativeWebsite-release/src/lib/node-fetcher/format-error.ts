export function formatError(error: Error) {
  return {
    hasError: true,
    responseCode: (error?.cause as number) || 500,
    message: error?.message || "An unknown error occurred.",
  };
}
