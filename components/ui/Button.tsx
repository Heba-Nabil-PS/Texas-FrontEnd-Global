"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Magnetic from "./Magnetic";

type Variant = "yellow" | "red" | "ghost" | "ghostDark";

const styles: Record<Variant, string> = {
  yellow: "bg-tex-yellow text-ink hover:bg-tex-yellow600",
  red: "bg-tex-red text-cream hover:bg-tex-red700",
  ghost: "border-2 border-ink/80 text-ink hover:bg-ink hover:text-cream",
  ghostDark: "border-2 border-cream/70 text-cream hover:bg-cream hover:text-ink",
};

export default function Button({
  children,
  href = "#",
  variant = "yellow",
  className,
  onClick,
  target,
  rel,
  type,
  pulse = false,
}: {
  children: ReactNode;
  href?: string;
  variant?: Variant;
  className?: string;
  onClick?: () => void;
  /** external links only — pair `_blank` with rel="noopener noreferrer" */
  target?: string;
  rel?: string;
  /** set to render a real <button> (form submit) instead of a link */
  type?: "button" | "submit";
  /** slow halo that keeps drawing the eye until the button is hovered */
  pulse?: boolean;
}) {
  const classes = `relative inline-flex items-center justify-center gap-2 rounded-full px-8 py-4 text-sm font-extrabold uppercase tracking-caps transition-colors duration-200 ease-out ${styles[variant]} ${pulse ? "cta-pulse" : ""} ${className ?? ""}`;

  // Internal routes → client-side <Link>; hash/external → plain <a>
  const isRoute = href.startsWith("/");

  return (
    <Magnetic strength={0.35}>
      {type ? (
        <button type={type} onClick={onClick} data-cursor="link" className={classes}>
          {children}
        </button>
      ) : isRoute ? (
        <Link href={href} onClick={onClick} data-cursor="link" className={classes}>
          {children}
        </Link>
      ) : (
        <a
          href={href}
          onClick={onClick}
          target={target}
          rel={rel ?? (target === "_blank" ? "noopener noreferrer" : undefined)}
          data-cursor="link"
          className={classes}
        >
          {children}
        </a>
      )}
    </Magnetic>
  );
}
