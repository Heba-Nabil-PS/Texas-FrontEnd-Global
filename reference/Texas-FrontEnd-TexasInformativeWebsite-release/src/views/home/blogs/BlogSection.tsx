"use client";

import { motion, useScroll, useTransform } from "motion/react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRef } from "react";
import { getLocaleDirection } from "@/lib";

const blogs = [
  {
    id: 1,
    title: "Wha's new?",
    description:
      "There's bold, and then there's Texas bold.Find out what goes into our latest Texas Chicken event.",
    image: "/images/blog1.jpg",
    badge: "New",
    link: "#",
  },
  {
    id: 2,
    title: "Wha's new?",
    description:
      "There's bold, and then there's Texas bold.Find out what goes into our latest Texas Chicken event.",
    image: "/images/blog2.jpg",
    badge: "New",
    link: "#",
  },
  {
    id: 3,
    title: "What's new with Texas Chicken?",
    description: "Here are stories on how we bring flavor to the world.",
    image: "/images/blog2.jpg",
    badge: "New Offer",
    link: "#",
  },
  {
    id: 4,
    title: "We bring the flavorful legandary taste of texas to the world",
    description: "New Offer Restauration Évènements.",
    image: "/images/careers.jpg",
    badge: "New Offer",
    link: "#",
  },
  // Add more blogs as needed
];

const BlogSection = (props: { locale: string }) => {
  const { locale } = props;

  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);

  return (
    <div className="mx-auto w-full bg-[#ede9e6] py-10">
      {/* Title */}
      <div className="container flex w-full select-none flex-col items-start">
        <span className="font-biker block text-xl font-extrabold leading-none text-primary md:text-3xl">
          what&apos;s new with
        </span>
        <span className="block font-texas text-[60px] font-extrabold uppercase leading-none text-primary md:text-[90px]">
          <span className="font-bold italic">Texas Chicken™</span>
        </span>
      </div>
      <div className="">
        <Carousel
          className="relative"
          ref={containerRef}
          opts={{
            loop: true,
            align: "start",
            containScroll: "keepSnaps",
            skipSnaps: false,
            direction: getLocaleDirection(locale),
          }}
        >
          <CarouselContent className="flex py-10">
            {blogs?.map((blog, i) => (
              <motion.div style={{ x }} key={i}>
                <CarouselItem className="pl-4">
                  <motion.a
                    key={blog.id}
                    href={blog.link}
                    className="block w-[750px] overflow-hidden"
                    custom={i}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, amount: 0.3 }}
                  >
                    <div className="relative mb-20 h-[420px] w-full">
                      <Image
                        src={blog.image}
                        alt={blog.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {blog.badge && (
                        <span className="font-bahij absolute right-6 top-6 z-20 rounded-full bg-[#c0392b] px-6 py-2 text-xs uppercase tracking-wider text-white">
                          {blog.badge}
                        </span>
                      )}
                      {/* Overlay info box */}
                      <div className="absolute -bottom-20 left-0 right-0 z-10 w-3/4 px-0 pb-0">
                        <div className="group relative overflow-hidden bg-primary px-10 py-8 shadow-lg">
                          <div className="absolute inset-0 z-10 translate-x-full transform bg-secondary transition-transform duration-500 group-hover:translate-x-0"></div>
                          <div className="relative z-10">
                            <h3 className="mb-4 font-texas text-3xl font-extrabold uppercase leading-tight text-white group-hover:text-white">
                              {blog.title}
                            </h3>
                            <div className="mb-4 text-xl text-white md:w-3/4">
                              {blog.description}
                            </div>
                            <div>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="30"
                                height="30"
                                x="0"
                                y="0"
                                viewBox="0 0 490.661 490.661"
                                className="absolute -bottom-4 right-0 h-9 w-9 fill-secondary group-hover:fill-white"
                              >
                                <g>
                                  <path d="M453.352 236.091 48.019 1.424c-3.285-1.899-7.36-1.899-10.688 0a10.681 10.681 0 0 0-5.333 9.237v469.333c0 3.819 2.048 7.339 5.333 9.237a10.802 10.802 0 0 0 5.333 1.429c1.856 0 3.691-.469 5.355-1.429l405.333-234.667c3.285-1.92 5.312-5.44 5.312-9.237s-2.027-7.338-5.312-9.236z"></path>
                                </g>
                              </svg>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                </CarouselItem>
              </motion.div>
            ))}
          </CarouselContent>
          <div className="z-50 mt-10 flex justify-end gap-2 px-4">
            <CarouselPrevious
              className="relative bottom-0 left-0 right-0 top-0 flex h-16 w-16 items-center justify-center rounded-full border border-third bg-white text-3xl text-third shadow-none transition hover:border-secondary hover:text-secondary"
              iconClassName="size-8 text-third hover:text-secondary"
            />
            <CarouselNext
              className="relative bottom-0 left-0 right-0 top-0 flex h-16 w-16 items-center justify-center rounded-full border border-third bg-white text-3xl text-third shadow-none transition hover:border-secondary hover:text-secondary"
              iconClassName="size-8 text-third hover:text-secondary"
            />
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default BlogSection;
