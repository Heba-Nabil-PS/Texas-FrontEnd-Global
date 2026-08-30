"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { useEffect, useState } from "react";
import { nav, site } from "@/lib/content";
import { ease } from "@/lib/motion";

const LOGO = "/images/logo-dual-badge.svg";

export default function Nav() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 100));

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    return () => document.documentElement.classList.remove("lenis-stopped");
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: ease.out, delay: 1.9 }}
        className="fixed inset-x-0 top-0 z-[9990] lg:top-4"
      >
        {/* ---------------- Desktop ---------------- */}
        <div
          className="relative hidden w-full bg-contain bg-center bg-no-repeat lg:block lg:min-h-[112px]"
          style={{ backgroundImage: "url(/images/nav-bg.png)" }}
        >
          <div className="relative mx-auto flex min-h-[112px] w-full max-w-[1150px] items-center gap-4 px-8">
            {/* Logo — left, vertically centered */}
            <Link
              href="/"
              data-cursor="link"
              className="flex shrink-0 items-center ps-8 transition-transform hover:scale-[1.04]"
            >
              <Image src={LOGO} alt="Texas Chicken" width={2125} height={1023} className="h-[78px] w-auto object-contain" priority />
            </Link>

            {/* Links */}
            <nav className="flex flex-1 items-center justify-center gap-0.5 xl:gap-1.5">
              {nav.links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  data-cursor="link"
                  className={`group relative px-2 py-1 font-texas text-[15px] font-bold uppercase tracking-wide transition-colors xl:text-lg ${
                    isActive(l.href) ? "text-primary" : "text-black hover:text-primary"
                  }`}
                >
                  {l.label}
                  <span
                    className={`absolute inset-x-2 -bottom-0.5 h-[3px] rounded-full bg-primary transition-all duration-300 ${
                      isActive(l.href) ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                    }`}
                  />
                </Link>
              ))}
            </nav>
          </div>
          {/* Pulsing round Order button — far right of the header */}
          <OrderButton />
        </div>

        {/* ---------------- Mobile ---------------- */}
        <div
          className={`flex items-center justify-between px-4 py-2 transition-all duration-300 lg:hidden ${
            scrolled || open ? "bg-white shadow-md" : ""
          }`}
        >
          <Link
            href="/"
            data-cursor="link"
            className="flex shrink-0 items-center"
          >
            <Image src={LOGO} alt="Texas Chicken" width={2125} height={1023} className="h-14 w-auto object-contain" priority />
          </Link>

          <button
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
            className="flex size-11 items-center justify-center rounded-[15px] bg-secondary text-black transition-all"
          >
            <span className="relative block h-[14px] w-5">
              <motion.span className="absolute left-0 top-0 h-[2px] w-full bg-black" animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3, ease: ease.out }} />
              <motion.span className="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 bg-black" animate={open ? { opacity: 0 } : { opacity: 1 }} transition={{ duration: 0.2 }} />
              <motion.span className="absolute bottom-0 left-0 h-[2px] w-full bg-black" animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} transition={{ duration: 0.3, ease: ease.out }} />
            </span>
          </button>
        </div>
      </motion.header>

      {/* ---------------- Mobile drawer ---------------- */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[9970] bg-black/50 lg:hidden"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.45, ease: ease.inOut }}
              className="fixed inset-y-0 right-0 z-[9980] flex w-[82%] max-w-sm flex-col bg-cream px-7 pb-8 pt-24 lg:hidden"
            >
              <nav className="flex flex-col gap-1">
                {[{ label: "Home", href: "/" }, ...nav.links].map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.12 + i * 0.05, duration: 0.4, ease: ease.out }}>
                    <Link
                      href={l.href}
                      className={`block py-2 font-texas text-3xl font-bold uppercase leading-tight ${
                        isActive(l.href) ? "text-primary" : "text-black"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-8">
                <Link
                  href={nav.ctaHref}
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3.5 font-texas text-sm font-bold uppercase tracking-caps text-white transition-colors hover:bg-secondary hover:text-black"
                >
                  {nav.cta}
                </Link>
              </div>

              <div className="mt-6 flex flex-col gap-1 border-t border-ink/10 pt-6">
                {nav.topLinks.map((l, i) => (
                  <motion.div key={l.href} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 + i * 0.05, duration: 0.4, ease: ease.out }}>
                    <Link
                      href={l.href}
                      className={`block py-1.5 font-texas text-lg font-bold uppercase leading-tight ${
                        isActive(l.href) ? "text-primary" : "text-black/70"
                      }`}
                    >
                      {l.label}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto flex flex-wrap gap-x-3 gap-y-1 pt-8 text-xs uppercase tracking-caps text-ink-400">
                {site.markets.slice(0, 6).map((m) => (
                  <span key={m}>{m}</span>
                ))}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function OrderButton() {
  return (
    <Link
      href={nav.ctaHref}
      data-cursor="link"
      aria-label={nav.cta}
      className="absolute right-16 top-1/2 z-30 flex size-[92px] -translate-y-1/2 items-center justify-center rounded-full bg-cover bg-center bg-no-repeat px-3 text-center font-texas text-xs font-bold uppercase leading-[1.05] text-white shadow-lg transition-transform hover:scale-105"
      style={{ backgroundImage: "url(/images/order-bg.png)" }}
    >
      <span className="max-w-[68px] leading-[1.05]">{nav.cta}</span>
      <span className="pointer-events-none absolute inset-0 block">
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary opacity-50 [animation-duration:1000ms]" />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary opacity-25 [animation-delay:300ms] [animation-duration:1000ms]" />
        <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-primary opacity-10 [animation-delay:700ms] [animation-duration:1000ms]" />
      </span>
    </Link>
  );
}
