"use client";

/**
 * MenuHero — interactive "The Menu" banner.
 *
 * A brand adaptation of the "Diet Soda" 3D hero concept, rebuilt for this
 * Next.js site with 2D brand assets (no model-viewer / GSAP):
 *  - three featured product banners crossfade as the focal, shown UNCROPPED
 *    (object-contain). Their rectangular photo backgrounds are dissolved with
 *    an edge-feather mask over a background that matches the photo tone, so the
 *    box disappears and only the food reads (no true alpha needed).
 *  - the items AUTOPLAY every 3s (pauses while hovering); each switch pops the
 *    focal with a heat flash
 *  - the whole banner fits in one viewport (min-h-[100svh], compact column)
 *
 * The `img` assets are the supplied text-free banner artwork; `fallback` keeps
 * the older baked-text versions wired up via onError as a safety net.
 */

import { useCallback, useEffect, useRef, useState } from "react";
import Button from "@/components/ui/Button";

type Item = {
  key: string;
  img: string;
  fallback: string;
  name: string;
  sub: string;
  /**
   * The flat backdrop tone sampled straight out of that banner's artwork. The
   * section paints this behind the photo so the image's rectangle edge is
   * invisible — any mismatch shows up as a hard vertical seam on the left.
   */
  bg: string;
};

const ITEMS: Item[] = [
  {
    key: "tenders",
    img: "/assets/menu-hero-tenders.png",
    fallback: "/assets/banner-tenders.png",
    name: "Crunchy Tenders",
    sub: "Original & Spicy",
    bg: "#312921",
  },
  {
    key: "chicken",
    img: "/assets/menu-hero-chicken.png",
    fallback: "/assets/banner-bonein.png",
    name: "Bone-In Chicken",
    sub: "The signature crunch",
    bg: "#312921",
  },
  {
    key: "mexicana",
    img: "/assets/menu-hero-mexicana.png",
    fallback: "/assets/food-sandwich.png",
    name: "The Mexicana",
    sub: "Spicy sandwich",
    bg: "#322f29",
  },
];

const AUTOPLAY_MS = 3000;

/** Splits a product name into [first word, remainder] for the two-tone title. */
function titleParts(name: string): [string, string] {
  const i = name.indexOf(" ");
  return i === -1 ? [name, ""] : [name.slice(0, i), name.slice(i + 1)];
}

// feather mask — opaque around the product (right-centre), fades out to the
// edges so the photo's box melts into the matching background.
const FEATHER =
  "radial-gradient(135% 118% at 74% 48%, #000 58%, rgba(0,0,0,0) 88%)";

/* ------------------------------------------------------------------ helpers */
const lerp = (a: number, b: number, p: number) => a + (b - a) * p;
const easeIn = (t: number) => t * t;
const easeOut = (t: number) => 1 - (1 - t) * (1 - t);
function tween(opts: {
  dur: number;
  ease: (t: number) => number;
  onUpdate: (p: number) => void;
  onComplete?: () => void;
}) {
  return new Promise<void>((resolve) => {
    const start = performance.now();
    const frame = (now: number) => {
      const t = Math.min(1, (now - start) / (opts.dur * 1000));
      opts.onUpdate(opts.ease(t));
      if (t < 1) requestAnimationFrame(frame);
      else {
        opts.onComplete?.();
        resolve();
      }
    };
    requestAnimationFrame(frame);
  });
}

const onImgError = (e: React.SyntheticEvent<HTMLImageElement>, fallback: string) => {
  const img = e.currentTarget;
  if (img.dataset.fb !== "1") {
    img.dataset.fb = "1";
    img.src = fallback;
  }
};

/* ---------------------------------------------------------------- component */
export default function MenuHero() {
  const [index, setIndex] = useState(0);

  const rootRef = useRef<HTMLElement>(null);
  const bannerWrapRef = useRef<HTMLDivElement>(null);
  const flashRef = useRef<HTMLDivElement>(null);

  const switchingRef = useRef(false);
  const hoverRef = useRef(false);
  const indexRef = useRef(0);
  const scaleRef = useRef(1);
  const blurRef = useRef(0);
  const mouse = useRef({ x: 0, y: 0 });
  const cur = useRef({ x: 0, y: 0 });

  useEffect(() => {
    indexRef.current = index;
  }, [index]);

  /* ---- main animation loop: gentle cursor parallax on the focal ---------- */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const root = rootRef.current;
    if (!root) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX / window.innerWidth - 0.5;
      mouse.current.y = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("mousemove", onMove);

    if (reduce) return () => window.removeEventListener("mousemove", onMove);

    let raf = 0;
    const loop = () => {
      cur.current.x += (mouse.current.x - cur.current.x) * 0.05;
      cur.current.y += (mouse.current.y - cur.current.y) * 0.05;
      const cx = cur.current.x;
      const cy = cur.current.y;

      // focal banners: gentle cursor parallax + heat pop (kept tiny so the
      // uncropped product never drifts out of view)
      if (bannerWrapRef.current) {
        bannerWrapRef.current.style.transform =
          `scale(${scaleRef.current.toFixed(3)}) ` +
          `translate(${(cx * -1.2).toFixed(2)}%, ${(cy * -1.2).toFixed(2)}%)`;
        bannerWrapRef.current.style.filter = `blur(${blurRef.current.toFixed(2)}px)`;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  /* ---- the choreographed item switch ------------------------------------- */
  const switchTo = useCallback(async (next: number) => {
    if (switchingRef.current || next === indexRef.current) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setIndex(next);
      return;
    }
    switchingRef.current = true;
    const flash = flashRef.current;

    // focal: heat pop + flash, crossfade at the peak
    const pop = (async () => {
      await tween({
        dur: 0.45,
        ease: easeIn,
        onUpdate: (p) => {
          scaleRef.current = lerp(1, 1.05, p);
          blurRef.current = p * 6;
          if (flash) flash.style.opacity = String(p * 0.85);
        },
      });
      setIndex(next); // crossfade to the next banner at the peak
      await tween({
        dur: 0.85,
        ease: easeOut,
        onUpdate: (p) => {
          scaleRef.current = lerp(1.05, 1, p);
          blurRef.current = (1 - p) * 6;
          if (flash) flash.style.opacity = String((1 - p) * 0.85);
        },
      });
      scaleRef.current = 1;
      blurRef.current = 0;
      if (flash) flash.style.opacity = "0";
    })();

    await pop;
    switchingRef.current = false;
  }, []);

  /* ---- autoplay: rotate items every 3s, pause while hovering ------------- */
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const id = window.setInterval(() => {
      if (hoverRef.current || switchingRef.current) return;
      switchTo((indexRef.current + 1) % ITEMS.length);
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [switchTo]);

  /* ----------------------------------------------------------------- render */
  return (
    <section
      ref={rootRef}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-12 pt-28 text-cream md:pt-32"
      style={{
        // FLAT, and equal to the active photo's own backdrop. A gradient here
        // would drift away from the photo tone and re-create the seam, so the
        // depth comes from the vignette layered OVER both instead.
        backgroundColor: ITEMS[index].bg,
        transition: "background-color 700ms ease-in-out",
      }}
    >
      <style>{`
        @keyframes mh-title-in {
          from { opacity: 0; transform: translateY(0.3em); }
          to   { opacity: 1; transform: none; }
        }
        .mh-title { animation: mh-title-in .55s cubic-bezier(.22,1,.36,1) both; }
        @media (prefers-reduced-motion: reduce) { .mh-title { animation: none; } }
      `}</style>

      {/* focal product banners — crossfading, uncropped (contain) + feather-masked */}
      <div ref={bannerWrapRef} className="pointer-events-none absolute inset-0 z-[4]" style={{ willChange: "transform, filter" }}>
        {ITEMS.map((it, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={it.key}
            src={it.img}
            onError={(e) => onImgError(e, it.fallback)}
            alt={it.name}
            className="absolute inset-0 h-full w-full select-none object-contain object-bottom transition-opacity duration-700 ease-inout md:object-right"
            style={{
              opacity: index === i ? 1 : 0,
              maskImage: FEATHER,
              WebkitMaskImage: FEATHER,
            }}
            draggable={false}
          />
        ))}
      </div>

      {/* vignette — above the photo, so it darkens the artwork and the base by
          the same amount and cannot introduce an edge between them */}
      <div
        className="pointer-events-none absolute inset-0 z-[5]"
        style={{
          background:
            "radial-gradient(125% 100% at 72% 46%, rgba(0,0,0,0) 38%, rgba(0,0,0,0.28) 72%, rgba(0,0,0,0.52) 100%)",
        }}
      />

      {/* text-legibility scrim (subtle; product sits to the right) */}
      <div className="pointer-events-none absolute inset-0 z-[6] bg-gradient-to-b from-[#1a1712]/85 via-transparent to-transparent md:bg-gradient-to-r md:from-[#1a1712]/85 md:via-[#1a1712]/10 md:to-transparent" />

      {/* heat flash (peaks during a switch) */}
      <div
        ref={flashRef}
        className="pointer-events-none absolute inset-0 z-[7] mix-blend-screen"
        style={{
          opacity: 0,
          background:
            "radial-gradient(70% 60% at 72% 45%, rgba(255,138,40,0.9) 0%, rgba(225,60,20,0.35) 45%, transparent 72%)",
        }}
      />

      {/* grain */}
      <div
        className="pointer-events-none absolute inset-0 z-[8] opacity-[0.12] mix-blend-overlay"
        style={{ backgroundImage: "url(/assets/tex-grunge.png)", backgroundSize: "480px" }}
      />

      {/* content — compact left column, whole banner fits one viewport */}
      <div className="container-tx relative z-20">
        <div className="flex max-w-xl flex-col gap-5">
          <span className="eyebrow text-tex-yellow">
            <span aria-hidden>★</span> The full line-up
          </span>

          {/* Title names whatever is on screen; re-keyed so it re-animates on
              every rotation, and kept to a single line at every width. */}
          <h1 className="display whitespace-nowrap text-[clamp(2rem,4.6vw,4rem)] leading-[0.95]">
            <span key={ITEMS[index].key} className="mh-title inline-block">
              <span className="text-cream">{titleParts(ITEMS[index].name)[0]} </span>
              <span className="text-tex-yellow">{titleParts(ITEMS[index].name)[1]}</span>
            </span>
          </h1>

          <p className="max-w-sm text-sm leading-relaxed text-cream/80 md:text-base">
            Hand-battered, fried fresh, built bold. Explore every category — then
            find your nearest restaurant to order.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Button href="/find-your-market" variant="yellow">
              Find a restaurant
            </Button>
          </div>

          {/* featured-item carousel — reflects the autoplaying rotation */}
          <div className="pointer-events-auto mt-1 flex flex-col gap-2.5">
            <span className="eyebrow text-cream/55">
              Now serving <span aria-hidden>★</span>
            </span>
            <div className="flex gap-3">
              {ITEMS.map((it, i) => (
                <FeatureCard
                  key={it.key}
                  item={it}
                  active={index === i}
                  onClick={() => switchTo(i)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- sub-elements */
function FeatureCard({
  item,
  active,
  onClick,
}: {
  item: Item;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={[
        "group relative w-[128px] cursor-pointer overflow-hidden rounded-3xl border p-2.5 text-left backdrop-blur-md transition-all duration-300",
        active
          ? "border-tex-yellow bg-white/[0.08]"
          : "border-cream/12 bg-white/[0.05] hover:border-cream/35 hover:bg-white/[0.1]",
      ].join(" ")}
    >
      <div className="relative grid h-16 w-full place-items-center overflow-hidden rounded-2xl bg-black/25">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.img}
          onError={(e) => onImgError(e, item.fallback)}
          alt={item.name}
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
          draggable={false}
        />
      </div>
      <div className="mt-2 flex flex-col">
        <span className="text-xs font-bold leading-tight text-cream">{item.name}</span>
        <span className="text-[0.62rem] leading-tight text-cream/55">{item.sub}</span>
      </div>
    </button>
  );
}
