"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

const AccessibilityToolbar = dynamic(() => import("./AccessibilityTool"), {
  ssr: false,
});

export default function AccessibilityToolbarClient(props) {
  const t = useTranslations();

  const accessibilityResources = {
    "enable-accessibility": t("enable-accessibility"),
    "exit-accessibility-mode": t("exit-accessibility-mode"),
    "keyboard-navigation": t("keyboard-navigation"),
    "block-animations": t("block-animations"),
    "accessibility-statement": t("accessibility-statement"),
    "report-an-accessibility-problem": t("report-an-accessibility-problem"),
    "reset-settings": t("reset-settings"),
    "image-without-text": t("image-without-text"),
    "color-contrast": t("color-contrast"),
    "uncolored-display": t.rich("uncolored-display", { br: <br /> }),
    "bright-contrast": t.rich("bright-contrast", { br: <br /> }),
    "dark-mode": t.rich("dark-mode", { br: <br /> }),
    "text-size": t("text-size"),
    "increase-text": t.rich("increase-text", { br: <br /> }),
    "decrease-text": t.rich("decrease-text", { br: <br /> }),
    "readable-text": t.rich("readable-text", { br: <br /> }),
    "text-spacing": t.rich("text-spacing", { br: <br /> }),
    "line-height": t.rich("line-height", { br: <br /> }),
    "text-align": t.rich("text-align", { br: <br /> }),
    "highlighting-content": t("highlighting-content"),
    "underline-links": t.rich("underline-links", { br: <br /> }),
    "underline-headers": t.rich("underline-headers", { br: <br /> }),
    "images-titles": t.rich("images-titles", { br: <br /> }),
    "zoom-in": t("zoom-in"),
    "big-white-cursor": t.rich("big-white-cursor", { br: <br /> }),
    "big-black-cursor": t.rich("big-black-cursor", { br: <br /> }),
    "zoom-screen": t.rich("zoom-screen", { br: <br /> }),
  };

  return <AccessibilityToolbar {...props} resources={accessibilityResources} />;
}
