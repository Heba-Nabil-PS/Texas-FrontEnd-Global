"use client";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";
import { AdvancedContentCategoryProps } from "@/modules/informative/types/advanced-content.types";
import { useTranslations } from "next-intl";

interface NotFoundProps {
  notFoundData: AdvancedContentCategoryProps | undefined;
}

const NotFound = ({ notFoundData }: NotFoundProps) => {
  const t = useTranslations();

  return (
    <section className="flex h-full min-h-[60vh] flex-col items-center justify-center bg-[#faf7f2] pb-16 pt-36">
      <div className="relative z-20 mt-4 flex flex-col justify-center px-4 md:px-0">
        <h1
          className="h-full text-center font-texas font-black uppercase leading-none tracking-tight text-primary drop-shadow-sm"
          style={{ fontSize: "clamp(48px, 16vw, 160px)" }}
        >
          {notFoundData?.Name || "Page Not Found"}
        </h1>

        <p className="mx-auto max-w-xl text-center text-xl leading-relaxed text-gray-600 md:text-4xl">
          {t("404description")}
        </p>

        <Button
          asChild
          className="mx-auto mt-8 flex w-full max-w-[280px] cursor-pointer items-center justify-center border-none bg-primary px-6 py-3 font-texas text-sm font-bold uppercase text-white hover:bg-secondary sm:w-fit sm:px-8 sm:py-2 sm:text-base"
        >
          <Link href="/">{t("BacktoHome")}</Link>
        </Button>
      </div>
    </section>
  );
};

export default NotFound;
