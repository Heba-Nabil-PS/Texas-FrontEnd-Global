"use client";

/**
 * HashScroll — makes every in-page `#anchor` link actually work.
 *
 * Lenis owns the scroll position (globals.css forces `scroll-behavior: auto`),
 * so the browser's native hash jump either does nothing or gets immediately
 * overwritten on the next Lenis frame. That is why `<Button href="#apply">`
 * looked dead. One delegated listener fixes every anchor on the site at once:
 *
 *  - clicks on any same-page `#hash` link are handed to `lenis.scrollTo`
 *  - the fixed header height is measured and subtracted, so the target lands
 *    below the nav instead of under it
 *  - the URL is updated with replaceState — never a hash jump, which would
 *    fight the animation we just started
 *  - the destination gets `data-flash` for a beat so you can SEE where you
 *    landed (the ring pulse lives in globals.css)
 *
 * Deep links (`/franchising#apply` typed or pasted) get the same treatment
 * once on mount, after layout has settled.
 */

import { useCallback, useEffect } from "react";
import { useLenis } from "lenis/react";

/** how long the destination stays highlighted — matches the CSS animation */
const FLASH_MS = 1800;
/** breathing room between the header and the top of the target */
const GAP = 16;

export default function HashScroll() {
  const lenis = useLenis();

  const headerOffset = () => {
    const h = document.querySelector("header");
    return (h instanceof HTMLElement ? h.getBoundingClientRect().height : 0) + GAP;
  };

  const flash = useCallback((el: HTMLElement) => {
    el.setAttribute("data-flash", "");
    window.setTimeout(() => el.removeAttribute("data-flash"), FLASH_MS);
  }, []);

  const goTo = useCallback(
    (hash: string, instant = false) => {
      // `#apply` is a valid selector, but ids like `#1` are not — guard it.
      let el: HTMLElement | null = null;
      try {
        el = document.querySelector<HTMLElement>(hash);
      } catch {
        el = document.getElementById(hash.slice(1));
      }
      if (!el) return false;

      if (lenis) {
        lenis.scrollTo(el, {
          offset: -headerOffset(),
          duration: instant ? 0 : 1.15,
        });
      } else {
        // Lenis not mounted yet (or reduced motion) — plain jump still works.
        const y = el.getBoundingClientRect().top + window.scrollY - headerOffset();
        window.scrollTo({ top: y, behavior: instant ? "auto" : "smooth" });
      }

      flash(el);
      return true;
    },
    [lenis, flash],
  );

  /* ---- every same-page anchor click, delegated ---- */
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // let modified clicks (new tab, download, middle button) behave natively
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey)
        return;

      const a = (e.target as Element | null)?.closest?.("a");
      if (!(a instanceof HTMLAnchorElement) || a.target === "_blank") return;

      const href = a.getAttribute("href");
      if (!href || href === "#" || !href.includes("#")) return;

      // same-document only: "#apply", or "/franchising#apply" while already there
      const url = new URL(a.href, window.location.href);
      if (url.pathname !== window.location.pathname || url.origin !== window.location.origin) return;

      if (goTo(url.hash)) {
        e.preventDefault();
        window.history.replaceState(null, "", url.hash);
      }
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [goTo]);

  /* ---- deep link on arrival ---- */
  useEffect(() => {
    if (!window.location.hash) return;
    // one frame for the layout, a beat more for the preloader to let go
    const t = window.setTimeout(() => goTo(window.location.hash), 400);
    return () => window.clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lenis]);

  return null;
}
