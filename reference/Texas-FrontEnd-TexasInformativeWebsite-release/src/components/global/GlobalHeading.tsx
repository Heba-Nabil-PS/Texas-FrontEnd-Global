"use client";

import { cn } from "@/lib/utils";
import { AnimatedSubHeading } from "./AnimatedText";
import { m } from "motion/react";

export default function GlobalHeading({
  heading,
  subHeading = "",
  headingClassName,
  subHeadingClassName,
  wrapperClassName,
}: {
  heading: string;
  subHeading?: string;
  headingClassName?: string;
  subHeadingClassName?: string;
  wrapperClassName?: string;
}) {
  if (!heading?.length) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex justify-start items-start flex-col",
        wrapperClassName
      )}
    >
      <AnimatedSubHeading
        className={subHeadingClassName}
        text={`${subHeading}`}
      />
      <m.h3
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className={cn(
          "-mt-4 md:-mt-6 text-3xl uppercase sm:text-4xl md:text-5xl",
          headingClassName
        )}
      >
        {heading}
      </m.h3>
    </div>
  );
}
