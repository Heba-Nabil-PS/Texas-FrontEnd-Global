"use client";
import Image from "next/image";
import { Button } from "./ui/button";
import { useEffect, useRef } from "react";

const MenuSection = () => {
  const menuItems = [
    {
      id: 1,
      name: "Classic Chicken",
      description:
        "Our signature classic chicken, marinated for 12 hours in a special blend of spices, served with our house-made sauce on a fresh brioche bun.",
      image: "/images/sand1.webp",
    },
    {
      id: 2,
      name: "Spicy Supreme",
      description:
        "Hand-breaded chicken fillet with our signature spicy sauce, topped with crispy lettuce and premium pickles on a toasted artisan bun.",
      image: "/images/starbox.webp",
    },
    {
      id: 3,
      name: "Chicken Nuggets",
      description:
        "Hand-breaded chicken fillet with our signature spicy sauce, topped with crispy lettuce and premium pickles on a toasted artisan bun.",
      image: "/images/Chicken Nuggets.png",
    },
    // Add more menu items as needed
  ];

  const containerRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const containerTop = containerRect.top;
      const containerHeight = containerRect.height;
      const windowHeight = window.innerHeight;

      imageRefs.current.forEach((ref, index) => {
        if (!ref) return;

        const imageRect = ref.getBoundingClientRect();
        const imageTop = imageRect.top;
        const imageHeight = imageRect.height;

        // Calculate how far the image is from the center of the viewport
        const distanceFromCenter =
          imageTop + imageHeight / 2 - windowHeight / 2;

        // Apply parallax effect based on distance from center
        const parallaxOffset = distanceFromCenter * 0.1;

        // Apply the transform with a smooth transition
        ref.style.transform = `translateY(${parallaxOffset}px)`;
      });
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative px-8 pt-10 bg-white overflow-hidden bg-[url('/images/menu-bg.webp')] bg-contain bg-center"
    >
      {/* Vertical Text */}
      <div className="text-[10rem] absolute left-8 bottom-0 z-10 font-black text-transparent [-webkit-text-stroke:1px_#f6b318] tracking-widest whitespace-nowrap -rotate-90 origin-left">
        EXPLORE MENU
      </div>

      {menuItems.map((item, index) => (
        <div
          key={item.id}
          className={`flex flex-col md:flex-row justify-center items-center gap-6 max-w-8xl mx-auto relative ${
            index % 2 === 1 ? "md:flex-row-reverse" : ""
          }`}
        >
          {/* Content Container */}
          <div className="flex flex-col justify-center gap-8 p-8 z-10">
            <h2 className="text-4xl md:text-5xl font-semibold text-third font-texas leading-tight">
              {item.name}
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed max-w-md">
              {item.description}
            </p>
            <Button className="w-fit font-bahij capitalize hover:text-primary">
              view menu
            </Button>
          </div>

          {/* Image Container with Parallax */}
          <div
            ref={(el) => {
              imageRefs.current[index] = el;
            }}
            className="relative transition-transform duration-300 ease-out"
          >
            <Image
              src={item.image}
              alt={item.name}
              width={700}
              height={500}
              className="object-cover"
            />
          </div>
        </div>
      ))}
    </section>
  );
};

export default MenuSection;
