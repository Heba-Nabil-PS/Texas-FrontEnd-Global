"use client";

import { useState, useEffect } from "react";
import { useData } from "@/components/providers/data-provider";
import { useConfig } from "@/components/providers/config-provider";
import { cn } from "@/lib/utils";
import { usePathname } from "@/i18n/navigation";
import { STATIC_MODULES } from "@/constants/country-modules";
import { PAGE_PATHS } from "@/constants/page-paths";
import {
  getLocaleDirection,
  isModuleOn,
  isNavLinkActive,
  isTexasVersion,
} from "@/lib";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation";
import { NavItemType } from "@/types";
import { NextLink } from "@/components/global/next-link";
import { NextImage } from "@/components/global/next-image";
import { LocaleSwitcher } from "./LocaleSwithcer";
import { GlobalIcon } from "@/components/icons/global-icon";
import { MobileHeader } from "./MobileHeader";
import type { HeaderResourcesProps } from "@/types/resources";

interface DesktopHeaderProps {
  locale: string;
  locales: { isoCode: string; languageName: string }[];
  resources: HeaderResourcesProps;
}

export function DesktopHeader(props: DesktopHeaderProps) {
  const { locale, locales, resources } = props;

  const {
    countryData: { countryModules, isoCode },
  } = useData();
  const { orderExternalLink, voucherExternalLink } = useConfig();

  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState<boolean>(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navBarItems: NavItemType[] = [
    {
      id: 1,
      name: resources["ourstory"],
      url: PAGE_PATHS.STORY,
      isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.STORY)),
      isExternal: false,
    },
    {
      id: 2,
      name: resources["Menu"],
      url: PAGE_PATHS.MENU,
      isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.MENU)),
      isExternal: false,
    },
    {
      id: 3,
      name: resources["Coupons"],
      url: PAGE_PATHS.COUPONS,
      isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.COUPON)),
      isExternal: false,
    },
    {
      id: 4,
      name: resources["Locations"],
      url: PAGE_PATHS.LOCATIONS,
      isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.LOCATION)),
      isExternal: false,
    },
    {
      id: 5,
      name: resources["Contactus"],
      url: PAGE_PATHS.CONTACT,
      isOn: Boolean(isModuleOn(countryModules, STATIC_MODULES.CONTACT)),
      isExternal: false,
    },
    {
      id: 6,
      name: resources["Vouchers"],
      url: voucherExternalLink || "",
      isOn: Boolean(voucherExternalLink),
      isExternal: true,
    },
  ]?.filter((item) => item.isOn);

  const useLandingLink = Boolean(
    isModuleOn(
      countryModules,
      isTexasVersion()
        ? STATIC_MODULES.LANDINGTEXASLINK
        : STATIC_MODULES.LANDINGCHURCHSLINK,
    ),
  );

  const useOrderInternalLink = Boolean(
      isModuleOn(countryModules, STATIC_MODULES.ORDER),
    ),
    useOrderExternalLink = Boolean(orderExternalLink);

  const isTexas = isTexasVersion();
  const isCanada = isoCode?.toLowerCase() === "can";

  const logoSrc = isCanada
    ? "/images/Churchs-Logo-new.svg"
    : isTexas
      ? locale === "ar"
        ? "/images/Texas-w-ar.png"
        : "/images/Texas-w.png"
      : "/images/churchs-logo.svg";

  return (
    <div
      className={cn(
        "fixed inset-x-0 top-2 z-50 w-full bg-contain bg-center bg-no-repeat transition-all duration-300 lg:min-h-[112px] lg:bg-[url('/images/nav-bg.png')]",
        isScrolled && "py-1 max-lg:top-0 max-lg:bg-white max-lg:shadow-md",
      )}
    >
      <div className="container relative flex items-center justify-between lg:justify-center lg:pe-0">
        <NavigationMenu
          className="max-lg:hidden"
          dir={getLocaleDirection(locale)}
        >
          <NavigationMenuList className="flex w-full items-center justify-between gap-24">
            {/* Centered logo */}
            <div className="flex items-center justify-center">
              <NextLink
                href={PAGE_PATHS.HOME}
                className={cn(
                  "flex size-[112px] items-center justify-center gap-2 rounded-full bg-black",
                  locale === "ar" && "p-3",
                )}
              >
                <NextImage
                  src={logoSrc}
                  alt="texas logo"
                  width={200}
                  height={60}
                  className="size-full object-contain"
                />
              </NextLink>
            </div>

            {/* Right links */}
            <div className="flex items-center gap-2">
              {navBarItems.map((item, i) => (
                <NavigationMenuItem key={i}>
                  <NavigationMenuLink
                    className={cn(
                      "hover_links flex items-center gap-2 px-2 font-texas text-xl font-bold",
                      isNavLinkActive(item.url, pathname) && "activeLink",
                    )}
                    asChild
                    target={item.isExternal ? "_blank" : "_self"}
                    rel={item.isExternal ? "noopener noreferrer" : ""}
                  >
                    <NextLink href={item.url}>{item.name}</NextLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              {(useLandingLink || locales?.length > 1) && (
                <div className="flex items-center gap-2 md:ps-16">
                  {locales && locales?.length === 2 && (
                    <NavigationMenuItem>
                      <LocaleSwitcher locale={locale} locales={locales} />
                    </NavigationMenuItem>
                  )}

                  {useLandingLink && (
                    <NavigationMenuItem>
                      <NextLink
                        className="flex items-center gap-2 ps-2 font-texas text-base font-bold text-primary"
                        href={PAGE_PATHS.LANDING_LINK}
                        target="_blank"
                        aria-label="global texas chicken"
                      >
                        <div className="rounded-full bg-white/40 p-1 transition-colors hover:border-third">
                          <GlobalIcon className="size-6 fill-primary transition-colors hover:fill-third" />
                        </div>
                      </NextLink>
                    </NavigationMenuItem>
                  )}
                </div>
              )}
            </div>
          </NavigationMenuList>
        </NavigationMenu>

        {(useOrderInternalLink || useOrderExternalLink) && (
          <NextLink
            className={cn(
              "hover:scale-10 absolute end-2.5 top-4 z-10 ms-8 flex size-[80px] items-center justify-center rounded-full bg-[url('/images/order-bg.png')] bg-cover bg-center bg-no-repeat text-center font-texas text-lg font-bold text-white shadow-lg transition-transform max-lg:hidden",
              { "text-secondary": isScrolled },
            )}
            href={
              useOrderInternalLink
                ? PAGE_PATHS.ORDER_NOW
                : orderExternalLink || "#"
            }
            aria-label={resources["OrderNow"]}
            target={useOrderExternalLink ? "_blank" : "_self"}
            rel={useOrderExternalLink ? "noopener noreferrer" : ""}
          >
            <span className="max-w-16 leading-5">{resources["OrderNow"]}</span>
            <span className="absolute inset-0 block">
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary opacity-50 duration-1000"></span>
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary opacity-25 delay-300 duration-1000"></span>
              <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary opacity-10 delay-700 duration-1000"></span>
            </span>
          </NextLink>
        )}

        <MobileHeader
          locale={locale}
          locales={locales}
          pathname={pathname}
          navBarItems={navBarItems}
          useLandingLink={useLandingLink}
          useOrderInternalLink={useOrderInternalLink}
          useOrderExternalLink={useOrderExternalLink}
          OrderExternalLink={orderExternalLink}
          resources={{ OrderNow: resources["OrderNow"] }}
          logoSrc={logoSrc}
        />
      </div>
    </div>
  );
}

export const dynamicClasses =
  "max-lg:top-0 max-lg:bg-white max-lg:shadow-md py-1";
