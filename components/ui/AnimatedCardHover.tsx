"use client";

import { useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ease } from "@/lib/motion";

type Dir = "top" | "bottom" | "left" | "right";

const enterOffset: Record<Dir, { x: string; y: string }> = {
  top: { x: "0%", y: "-100%" },
  bottom: { x: "0%", y: "100%" },
  left: { x: "-100%", y: "0%" },
  right: { x: "100%", y: "0%" },
};

function getDirection(
  e: React.MouseEvent<HTMLElement>,
  el: HTMLElement
): Dir {
  const r = el.getBoundingClientRect();
  const x = e.clientX - r.left - r.width / 2;
  const y = e.clientY - r.top - r.height / 2;
  const deg = (Math.atan2(y, x) * 180) / Math.PI;
  if (deg >= -45 && deg < 45) return "right";
  if (deg >= 45 && deg < 135) return "bottom";
  if (deg >= -135 && deg < -45) return "top";
  return "left";
}

/**
 * Directional-reveal image card. On hover, a caption panel slides in from the
 * exact edge the cursor entered from, over a darkening scrim, while the image
 * pushes in. Ported + reworked from the reference site's AnimatedCardHover.
 */
export default function AnimatedCardHover({
  image,
  eyebrow,
  title,
  desc,
  href,
  className,
  aspect = "aspect-[4/5]",
  priority = false,
  cta = "Explore",
  titleClassName = "text-2xl md:text-3xl",
  scrimClassName = "from-ink/85 via-ink/10 to-transparent",
}: {
  image: string;
  eyebrow?: string;
  title: string;
  desc?: string;
  href?: string;
  className?: string;
  aspect?: string;
  priority?: boolean;
  /** Label on the hover panel's action row. */
  cta?: string;
  /** Size/clamp overrides for long titles (news headlines vs. one-word labels). */
  titleClassName?: string;
  /** Gradient stops for the always-on label scrim. Deepen it for pale images. */
  scrimClassName?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isExternal = !!href && !href.startsWith("/");
  const [dir, setDir] = useState<Dir>("bottom");
  const [hovered, setHovered] = useState(false);

  const inner = (
    <div
      ref={ref}
      data-cursor={href ? "view" : undefined}
      onMouseEnter={(e) => {
        if (ref.current) setDir(getDirection(e, ref.current));
        setHovered(true);
      }}
      onMouseLeave={(e) => {
        if (ref.current) setDir(getDirection(e, ref.current));
        setHovered(false);
      }}
      className={`group relative block h-full w-full overflow-hidden rounded-3xl bg-ink ${aspect} ${className ?? ""}`}
    >
      <Image
        src={image}
        alt={title}
        fill
        priority={priority}
        sizes="(max-width: 768px) 90vw, 30vw"
        className="object-cover transition-transform duration-[900ms] ease-out group-hover:scale-110"
      />

      {/* Always-on gradient so the persistent label is legible */}
      <div className={`absolute inset-0 bg-gradient-to-t ${scrimClassName}`} />

      {/* Directional scrim + caption */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end bg-ink/70 p-6 backdrop-blur-[2px]"
        initial={false}
        animate={
          hovered
            ? { x: "0%", y: "0%", opacity: 1 }
            : { ...enterOffset[dir], opacity: 0 }
        }
        transition={{ duration: 0.5, ease: ease.out }}
      >
        {eyebrow && (
          <span className="eyebrow text-tex-yellow">{eyebrow}</span>
        )}
        <h3 className={`display mt-2 uppercase text-cream ${titleClassName}`}>
          {title}
        </h3>
        {desc && <p className="mt-2 max-w-[42ch] text-sm text-cream/75">{desc}</p>}
        {href && (
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-extrabold uppercase tracking-caps text-tex-yellow">
            {cta}
            <span aria-hidden>{isExternal ? "↗" : "→"}</span>
          </span>
        )}
      </motion.div>

      {/* Persistent bottom label (before hover) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 p-6 transition-opacity duration-300 group-hover:opacity-0">
        {eyebrow && <span className="eyebrow text-tex-yellow">{eyebrow}</span>}
        <h3 className={`display mt-1 uppercase text-cream ${titleClassName}`}>
          {title}
        </h3>
      </div>
    </div>
  );

  if (href && isExternal) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block h-full w-full"
      >
        {inner}
      </a>
    );
  }
  if (href) {
    return (
      <Link href={href} className="block h-full w-full">
        {inner}
      </Link>
    );
  }
  return inner;
}
