"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "motion/react";
import { cn, handleMouseEnter } from "@/lib/utils";
import { directionVariants, textVariants } from "@/lib/anime";

export const AnimatedCardHover = ({
  imageUrl,
  children,
  childrenClassName,
  imageClassName,
  className,
}: {
  imageUrl: string;
  children: React.ReactNode | string;
  childrenClassName?: string;
  imageClassName?: string;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  const [direction, setDirection] = useState<
    "top" | "bottom" | "left" | "right" | string
  >("left");

  return (
    <AnimatePresence mode="wait">
      <m.div
        onMouseEnter={(event) => handleMouseEnter({ event, ref, setDirection })}
        initial="initial"
        whileHover={direction}
        exit="exit"
        ref={ref}
        className={cn("h-full overflow-hidden group/card relative", className)}
      >
        <m.div className="group-hover/card:block block absolute inset-0 w-full h-full bg-black/40 z-10 transition duration-500" />
        <m.div
          variants={directionVariants}
          className="h-full w-full relative bg-gray-50 dark:bg-black"
          transition={{
            duration: 0.2,
            ease: "easeOut",
          }}
        >
          <img
            alt="image"
            className={cn(
              "h-full w-full object-cover scale-[1.15]",
              imageClassName
            )}
            width="1000"
            height="1000"
            src={imageUrl}
          />
        </m.div>
        <m.div
          variants={textVariants}
          transition={{
            duration: 0.5,
            ease: "easeOut",
          }}
          className={cn(
            "text-white absolute bottom-5 left-5 z-40 w-[calc(100%-20%)]",
            childrenClassName
          )}
        >
          {children}
        </m.div>
      </m.div>
    </AnimatePresence>
  );
};
