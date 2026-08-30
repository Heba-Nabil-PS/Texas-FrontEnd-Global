import { useEffect } from "react";
import { NextImage } from "./next-image";
import { Button } from "../ui/button";
import Marquee from "./marquee";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

interface ErrorViewProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export function ErrorView({ error, reset }: ErrorViewProps) {
  const t = useTranslations();

  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error.message);
  }, [error]);

  return (
    <section className="flex h-full min-h-screen flex-col items-center justify-center bg-[#faf7f2] pt-16 md:pt-24">
      <div className="relative">
        <div className="flex justify-center">
          <NextImage
            className="absolute -top-10 z-10 max-md:max-w-80"
            src={"/images/error-1.png"}
            alt={"404"}
            width={450}
            height={450}
            priority
          />
        </div>

        <div className="mt-4 w-full overflow-hidden">
          <Marquee pauseOnHover className="py-4 [--duration:15s] [--gap:3rem]">
            <h1
              className="h-full text-center font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
              style={{
                fontSize: "clamp(48px, 16vw, 160px)",
                wordSpacing: "2rem",
              }}
            >
              {t("somethingwentwrong")}
            </h1>
          </Marquee>
        </div>

        <div className="relative z-20 mt-28 flex flex-col justify-center px-4 md:mt-40 md:px-0">
          <div className="relative">
            <p className="mx-auto max-w-xl text-center text-xl leading-relaxed text-gray-600 md:text-4xl">
              {t("errordescription")}
            </p>

            <Button
              asChild
              className="mx-auto mt-8 flex w-full max-w-[280px] cursor-pointer items-center justify-center border-none bg-primary px-6 py-3 font-texas text-sm font-bold uppercase text-white hover:bg-secondary sm:w-fit sm:px-8 sm:py-2 sm:text-base"
            >
              <Link href="/">{t("BacktoHome")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
