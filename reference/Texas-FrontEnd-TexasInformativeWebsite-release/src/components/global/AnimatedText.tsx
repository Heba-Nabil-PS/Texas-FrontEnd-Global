"use client";

import { child, subheadingContainer } from "@/lib/anime";
import { cn } from "@/lib/utils";
import { useAnimation, m } from "motion/react";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

export const AnimatedSubHeading = ({
  text,
  className,
}: {
  text: string;
  className: any;
}) => {
  const letters = Array.from(text);
  const ctrls = useAnimation();

  const { ref, inView } = useInView({
    threshold: 0.5,
    triggerOnce: true,
  });

  useEffect(() => {
    if (inView) {
      ctrls.start("visible");
    }
    if (!inView) {
      ctrls.start("hidden");
    }
  }, [ctrls, inView]);

  return (
    <m.div
      variants={subheadingContainer}
      ref={ref}
      aria-hidden="true"
      animate={ctrls}
      initial="hidden"
      className="mb-7"
    >
      {letters.map((letter, index) => (
        <m.span
          variants={child}
          key={index}
          className={cn("uppercase text-3xl font-texas pt-10", className)}
        >
          {letter === " " ? "\u00A0" : letter}
        </m.span>
      ))}
    </m.div>
  );
};
