"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCardHover from "@/components/ui/AnimatedCardHover";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";

const cards = [
  { eyebrow: "Since 1952", title: "Our Story", desc: "From a stand across the Alamo to 23 markets.", href: "/our-story", image: "/assets/home-ceo.png" },
  { eyebrow: "Bigger than chicken", title: "Community", desc: "How we show up beyond the counter.", href: "/community", image: "/assets/home-tray.png" },
  { eyebrow: "Newsroom", title: "News", desc: "New drops, new restaurants, new markets.", href: "/news", image: "/assets/food-crispy-chicken.png" },
  { eyebrow: "Partner with us", title: "Franchising", desc: "Own a piece of the crunch.", href: "/franchising", image: "/assets/food-sandwich.png" },
];

export default function ExploreMore() {
  return (
    <section className="bg-cream-200 py-24 md:py-32">
      <div className="container-tx">
        <SectionHeading
          eyebrow="Explore Texas"
          heading="There's a lot more to dig into."
          body="Menus are just the start. Get to know the story, the community and the people behind the crunch."
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {cards.map((c) => (
            <motion.div key={c.title} variants={fadeUp}>
              <AnimatedCardHover
                image={c.image}
                eyebrow={c.eyebrow}
                title={c.title}
                desc={c.desc}
                href={c.href}
                aspect="aspect-[4/5]"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
