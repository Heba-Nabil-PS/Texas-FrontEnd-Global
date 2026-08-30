import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

export function useCaptcha(
  action: "birthday" | "career" | "contact" | "party" | "coupon",
  loadOnMount: boolean,
) {
  const [isLoading, setIsLoading] = useState(false);
  const [captcha, setCaptcha] = useState<string | null>(null);

  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleReCaptchaVerify = useCallback(
    async (cb?: (token: string) => Promise<void>) => {
      try {
        if (!executeRecaptcha) return;

        setIsLoading(true);

        const token = await executeRecaptcha(action);
        setCaptcha(token);

        if (cb) cb(token);

        return token;
      } catch (error) {
        console.log("Captcha load error", error);
      } finally {
        setIsLoading(false);
      }
    },
    [executeRecaptcha, action],
  );

  useEffect(() => {
    if (loadOnMount) handleReCaptchaVerify();
  }, [handleReCaptchaVerify, loadOnMount]);

  return {
    isLoading,
    captcha,
    setIsLoading,
    setCaptcha,
    handleReCaptchaVerify,
  };
}
