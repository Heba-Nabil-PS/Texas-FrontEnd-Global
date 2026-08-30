"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";

// Add the smooth behavior to go to top
export const goToTop = () => {
  document.documentElement.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

interface ScrollToTopProps {
  className?: string;
}

export function ScrollToTop(props: ScrollToTopProps) {
  const { className } = props;

  const [scrollPosition, setScrollPosition] = useState<number>(0);

  useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset);
    };

    window.addEventListener("scroll", updatePosition);

    return () => window.removeEventListener("scroll", updatePosition);
  }, []);

  return (
    <>
      {scrollPosition > 100 && (
        <button
          onClick={goToTop}
          className={cn(
            "fixed z-[99] flex size-10 cursor-pointer items-center justify-center rounded-md bg-primary leading-7 text-white shadow-lg transition-all duration-500 ease-in-out",
            className,
          )}
        >
          <ArrowUp className="size-5" />
        </button>
      )}
    </>
  );
}
