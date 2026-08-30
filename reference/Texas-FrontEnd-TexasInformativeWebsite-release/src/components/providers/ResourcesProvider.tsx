import { NextIntlClientProvider } from "next-intl";
import type { ReactNode } from "react";

export default function ResourcesProvider(props: any) {
  const { locale, timeZone, now, ...rest } = props;

  return (
    <NextIntlClientProvider
      // Define non-serializable props here
      defaultTranslationValues={{
        i: (text: ReactNode) => <i>{text}</i>,
      }}
      locale={locale}
      timeZone={timeZone}
      now={now}
      {...rest}
    />
  );
}
