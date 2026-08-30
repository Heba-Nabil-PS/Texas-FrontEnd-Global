"use client";

import { useState } from "react";
import { MenuIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { PAGE_PATHS } from "@/constants/page-paths";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { NextLink } from "@/components/global/next-link";
import { LocaleSwitcher } from "./LocaleSwithcer";
import { GlobalOutlineIcon } from "@/components/icons/global-outline-icon";
import { NextImage } from "@/components/global/next-image";
import { isNavLinkActive } from "@/lib";
import type { NavItemType } from "@/types";

interface MobileHeaderProps {
  pathname: string;
  locale: string;
  locales: { isoCode: string; languageName: string }[];
  resources: { OrderNow: string };
  navBarItems: NavItemType[];
  useLandingLink: boolean;
  useOrderInternalLink: boolean;
  useOrderExternalLink: boolean;
  OrderExternalLink: string | null;
  logoSrc: string;
}

export function MobileHeader(props: MobileHeaderProps) {
  const {
    pathname,
    locale,
    locales,
    resources,
    navBarItems,
    useLandingLink,
    useOrderInternalLink,
    useOrderExternalLink,
    OrderExternalLink,
    logoSrc,
  } = props;

  const [isOpen, setIsOpen] = useState<boolean>();
  const handleOpen = (state: boolean) => {
    setIsOpen(state);
  };

  return (
    <div className="flex w-full items-center justify-between lg:hidden">
      <NextLink
        href={PAGE_PATHS.HOME}
        className={cn(
          "flex size-[70px] items-center justify-center rounded-full bg-black",
          locale === "ar" && "p-2",
        )}
      >
        <NextImage
          src={logoSrc}
          alt="texas logo"
          width={64}
          height={60}
          className="size-full object-contain"
        />
      </NextLink>

      <Sheet open={isOpen} onOpenChange={handleOpen}>
        <SheetTrigger asChild>
          <button className="z-[99] flex size-10 cursor-pointer items-center justify-center rounded-[15px] bg-secondary leading-7 text-black transition-all duration-500 ease-in-out">
            <MenuIcon className="size-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </button>
        </SheetTrigger>

        <SheetContent side={locale === "ar" ? "left" : "right"}>
          <SheetTitle className="sr-only">Mobile Navigation</SheetTitle>
          <SheetDescription className="sr-only">
            Mobile Navigation
          </SheetDescription>

          <div className="light_background flex flex-col items-start gap-6 py-6">
            <nav className="mt-10 grid gap-4">
              {navBarItems?.map((item: NavItemType) => (
                <div key={item?.id} className="w-full">
                  <NextLink
                    onClick={() => handleOpen(false)}
                    href={item?.url}
                    className={cn(
                      "flex items-center gap-2 font-texas text-lg capitalize",
                      isNavLinkActive(item.url, pathname) && "activeLink",
                    )}
                    target={item.isExternal ? "_blank" : "_self"}
                    rel={item.isExternal ? "noopener noreferrer" : ""}
                  >
                    {item?.name}
                  </NextLink>
                </div>
              ))}

              <div className="flex flex-col gap-4">
                {locales && locales?.length === 2 && (
                  <LocaleSwitcher
                    locale={locale}
                    locales={locales}
                    cb={() => handleOpen(false)}
                  />
                )}

                {useLandingLink && (
                  <NextLink
                    className="flex w-fit font-texas text-xl font-bold text-primary"
                    href={PAGE_PATHS.LANDING_LINK}
                    target="_blank"
                    aria-label="global texas chicken"
                    onClick={() => handleOpen(false)}
                  >
                    <GlobalOutlineIcon className="fill-primary" />
                  </NextLink>
                )}

                {(useOrderInternalLink || useOrderExternalLink) && (
                  <Button
                    className="border-none bg-primary font-texas font-bold uppercase text-white hover:bg-secondary"
                    aria-label={resources["OrderNow"]}
                    asChild
                  >
                    <NextLink
                      href={
                        useOrderInternalLink
                          ? PAGE_PATHS.ORDER_NOW
                          : OrderExternalLink || "#"
                      }
                      target={useOrderExternalLink ? "_blank" : "_self"}
                      rel={useOrderExternalLink ? "noopener noreferrer" : ""}
                      onClick={() => handleOpen(false)}
                    >
                      {resources["OrderNow"]}
                    </NextLink>
                  </Button>
                )}
              </div>
            </nav>
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
