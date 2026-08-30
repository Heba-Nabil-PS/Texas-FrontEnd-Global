"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const categories = [
  {
    label: "NEW PRODUCTS!",
    bg: "bg-[#ffd42a]",
    rotate: "-rotate-3",
  },
  {
    label: "CHICKEN MEALS",
    bg: "bg-[#357a38]",
    rotate: "rotate-2",
  },
  {
    label: "SANDWICHES & WRAPS",
    bg: "bg-[#f47c20]",
    rotate: "-rotate-2",
  },
  {
    label: "SIDES & DESSERTS",
    bg: "bg-[#ffd42a]",
    rotate: "rotate-1",
  },
  {
    label: "BEVERAGES",
    bg: "bg-[#e94e1b]",
    rotate: "-rotate-1",
  },
];

const MenuCategorySection = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax transforms for floating images
  const nuggetY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const wrapsY = useTransform(scrollYProgress, [0, 1], [0, -80]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[600px] flex-col items-center justify-center overflow-hidden bg-third px-4 py-16"
    >
      {/* Title */}
      <div className="container flex w-full select-none flex-col items-start">
        <span className="font-biker block text-xl font-extrabold leading-none text-white md:text-3xl">
          EXPLORE OUR
        </span>
        <span
          className={`block font-texas text-[60px] font-extrabold leading-none text-[#f7b718] md:text-[120px]`}
          style={{ letterSpacing: "2px", lineHeight: 1, marginTop: "-10px" }}
        >
          MENU
        </span>
      </div>
      {/* Parallax Floating Images */}
      <motion.img
        src="/images/Chicken-Nuggets.png"
        alt="Chicken Nuggets"
        className="pointer-events-none absolute -right-28 top-0 h-auto object-contain pt-32 md:w-[600px]"
        style={{ y: nuggetY }}
      />
      <motion.img
        src="/images/wraps.png"
        alt="Wraps"
        className="pointer-events-none absolute -bottom-20 -left-28 h-auto object-contain md:w-[600px]"
        style={{ y: wrapsY }}
      />
      {/* Menu Categories */}
      <div className="flex w-full max-w-xl flex-col items-center">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.label}
            className={`flex w-full justify-center ${cat.rotate}`}
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.5 }}
            style={{ overflow: "hidden" }}
          >
            <a
              href="#"
              className={`w-auto px-4 py-3 md:px-8 md:py-5 ${cat.bg} flex items-center justify-center font-texas text-3xl font-extrabold uppercase text-third shadow-lg md:text-5xl`}
              style={{
                letterSpacing: "1px",
                textAlign: "center",
                whiteSpace: "nowrap",
              }}
            >
              {cat.label}
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default MenuCategorySection;
