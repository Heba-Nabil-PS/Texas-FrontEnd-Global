"use client";

import type { ReactNode } from "react";

/**
 * Infinite CSS marquee (GPU transform). Duplicates children so translateX(-50%)
 * loops seamlessly. Speed via `duration` (s). Reverse + pause-on-hover options.
 */
export default function Marquee({
  children,
  duration = 32,
  reverse = false,
  pauseOnHover = true,
  className,
}: {
  children: ReactNode;
  duration?: number;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}) {
  return (
    <div className={`group relative flex w-full overflow-hidden ${className ?? ""}`}>
      <div
        className="flex shrink-0 items-center [animation:marquee_linear_infinite]"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
          animationPlayState: "running",
        }}
        data-pause={pauseOnHover ? "" : undefined}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
      <style jsx>{`
        div[data-pause]:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
}
