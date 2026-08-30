"use client";

import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

interface RecaptchaWrapperProps {
  children: React.ReactNode;
  captchaKey?: string | null;
}

export function RecaptchaWrapper(props: RecaptchaWrapperProps) {
  const { children, captchaKey } = props;

  if (!captchaKey?.trim()) return children;

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={captchaKey}
      scriptProps={{
        async: true,
        defer: true,
      }}
    >
      {children}
    </GoogleReCaptchaProvider>
  );
}
