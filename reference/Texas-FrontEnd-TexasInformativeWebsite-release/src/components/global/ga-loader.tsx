"use client";

import Script from "next/script";

interface GALoaderProps {
  measurementId: string;
  applyCMP?: boolean;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: any[]) => void;
    __GA_INITED__?: Set<string>;
  }
}

export function GALoader(props: GALoaderProps) {
  const { measurementId, applyCMP = false, } = props;

  if (!measurementId) return null;

  const init = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){ dataLayer.push(arguments); }
    gtag('js', new Date());
    window.__GA_INITED__ = window.__GA_INITED__ || new Set();
    if (!window.__GA_INITED__.has('${measurementId}')) {
      gtag('config', '${measurementId}', { send_page_view: true });
      window.__GA_INITED__.add('${measurementId}');
    }
  `;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="lazyOnload"
        src={`https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`}
      />
      <Script
        id="ga4-init"
        strategy="lazyOnload"
        {...(applyCMP && {
          type: "text/plain",
          "data-usercentrics": "Google Analytics",
        })}
        dangerouslySetInnerHTML={{ __html: init }}
      />
    </>
  );
}
