import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "BRAVO ! LA TAVOLA SOCIALE",
    description: "BAR BRASSERIE ÉVÈNEMENTS",
    image: "/images/halal.jpg",
    badge: "BRASSERIE",
    link: "#",
  },
  {
    id: 2,
    title: "L'Alsace à Boire",
    description: "Bar Caviste Évènements. Profitez d'une ambiance unique à Strasbourg.",
    image: "/images/blog.webp",
    badge: "BAR",
    link: "#",
  },
  {
    id: 3,
    title: "Le Troquet des Kneckes",
    description: "Bar Restauration Évènements.",
    image: "/images/careers.jpg",
    badge: "BAR",
    link: "#",
  },
  // Add more blogs as needed
];

export default function BlogSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Arrow handlers
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  // Centering and animation
  const cardVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.7, type: "spring" },
    }),
  };

  return (
    <section className="py-16 bg-[#f8f1f5]">
      <div className="max-w-8xl mx-auto">
        <h2 className="text-4xl font-bold mb-10 text-center text-[#1a1a1a] uppercase tracking-widest">
          Blogs
        </h2>
        <div className="relative flex items-center justify-center">
          {/* Carousel */}
          <div className="w-full" ref={emblaRef}>
            <div className="flex gap-8 justify-center">
              {blogs.map((blog, i) => (
                <motion.a
                  key={blog.id}
                  href={blog.link}
                  className="min-w-[750px] max-w-[800px] flex-shrink-0 block rounded-[2.5rem] overflow-hidden shadow-xl bg-white transition-transform duration-300 hover:scale-105 relative"
                  custom={i}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                >
                  <div className="relative h-[420px] w-full">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover"
                      style={{ borderRadius: '2.5rem' }}
                    />
                    {blog.badge && (
                      <span className="absolute top-6 right-6 bg-[#c0392b] text-white font-bahij px-6 py-2 rounded-full text-xs shadow uppercase tracking-wider z-20">
                        {blog.badge}
                      </span>
                    )}
                    {/* Overlay info box */}
                    <div className="absolute left-0 right-0 bottom-0 z-10 px-0 pb-0 w-3/4">
                      <div className="bg-secondary px-10 py-8 rounded-b-[2.5rem] shadow-lg">
                        <h3 className="text-3xl font-bahij uppercase text-[#a3241c] mb-4 leading-tight">
                          {blog.title}
                        </h3>
                        <div className="text-xl font-bold uppercase text-[#a3241c] mb-4">{blog.description}</div>
                       
                      </div>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </div>
          <div className="flex gap-4 z-10 absolute right-10 -bottom-20 pt-6">
            {/* Left Arrow */}
            <button
              onClick={scrollPrev}
              className="-translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow p-4 transition"
              aria-label="Previous"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 492.004 492.004"
                className="size-4 rotate-180"
              >
                <g>
                  <path
                    d="M382.678 226.804 163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
                    fill="black"
                    opacity="1"
                  ></path>
                </g>
              </svg>
            </button>
            {/* Right Arrow */}
            <button
              onClick={scrollNext}
              className="-translate-y-1/2 bg-white/80 hover:bg-white rounded-full shadow p-4 transition"
              aria-label="Next"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 492.004 492.004"
                className="size-4"
              >
                <g>
                  <path
                    d="M382.678 226.804 163.73 7.86C158.666 2.792 151.906 0 144.698 0s-13.968 2.792-19.032 7.86l-16.124 16.12c-10.492 10.504-10.492 27.576 0 38.064L293.398 245.9l-184.06 184.06c-5.064 5.068-7.86 11.824-7.86 19.028 0 7.212 2.796 13.968 7.86 19.04l16.124 16.116c5.068 5.068 11.824 7.86 19.032 7.86s13.968-2.792 19.032-7.86L382.678 265c5.076-5.084 7.864-11.872 7.848-19.088.016-7.244-2.772-14.028-7.848-19.108z"
                    fill="black"
                    opacity="1"
                  ></path>
                </g>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
} 