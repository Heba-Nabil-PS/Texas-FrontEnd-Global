"use client";

import Script from "next/script";
import { Toaster } from "@/components/ui/sonner";
import AccessibilityToolbarClient from "@/lib/simple-accessibility/AccessibilityToolbarClient";

interface SharedProps {
  children: React.ReactNode;
  locale: string;
  useAccessibe: boolean;
  useCustomAccessibe: boolean;
}

export function Shared(props: SharedProps) {
  const { children, locale, useAccessibe, useCustomAccessibe } = props;

  return (
    <>
      {children}

      <Toaster
        position={locale === "ar" ? "top-left" : "top-right"}
        dir={locale === "ar" ? "rtl" : "ltr"}
        closeButton
        offset={64}
        toastOptions={{
          duration: 5000,
          classNames: {
            error: "bg-white border-red-500 text-red-500",
            success: "bg-white border-green-500 text-green-500",
            closeButton:
              "text-primary top-2 ltr:left-auto rtl:right-auto ltr:-right-1 rtl:-left-1",
          },
          className: "top-10",
        }}
      />

      {useAccessibe && (
        <Script
          src="https://acsbapp.com/apps/app/dist/js/app.js"
          strategy="afterInteractive"
          onLoad={() => {
            if (typeof window !== "undefined" && (window as any).acsbJS) {
              (window as any).acsbJS.init({
                statementLink: "",
                footerHtml: "",
                hideMobile: false,
                hideTrigger: false,
                disableBgProcess: false,
                language: locale,
                position: locale === "ar" ? "right" : "left",
                leadColor: "#146ff8",
                triggerColor: "#146ff8",
                triggerRadius: "50%",
                triggerPositionX: locale === "ar" ? "right" : "left",
                triggerPositionY: "bottom",
                triggerIcon: "people",
                triggerSize: "medium",
                triggerOffsetX: 20,
                triggerOffsetY: 20,
                mobile: {
                  triggerSize: "small",
                  triggerPositionX: locale === "ar" ? "right" : "left",
                  triggerPositionY: "bottom",
                  triggerOffsetX: 10,
                  triggerOffsetY: 10,
                  triggerRadius: "50%",
                },
              });
            }
          }}
        />
      )}

      {useCustomAccessibe && (
        <AccessibilityToolbarClient buttonPosition="left" forceLang="en" />
      )}
    </>
  );
}
