"use client";

import { motion } from "framer-motion";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedCardHover from "@/components/ui/AnimatedCardHover";
import Button from "@/components/ui/Button";
import { menuCategories } from "@/lib/content";
import { staggerContainer, fadeUp, inView } from "@/lib/motion";

/** Home teaser for the menu — directional-reveal category cards. */
export default function MenuCategories() {
  return (
    <section className="bg-cream py-24 md:py-32">
      <div className="container-tx">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow={menuCategories.eyebrow}
            heading={menuCategories.heading}
            body={menuCategories.body}
          />
          <div className="hidden shrink-0 md:block">
            <Button href="/menu" variant="red">
              See the full menu
            </Button>
          </div>
        </div>

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={inView}
          className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6"
        >
          {menuCategories.items.map((item) => (
            <motion.div key={item.title} variants={fadeUp}>
              <AnimatedCardHover
                image={item.image}
                eyebrow={item.tag}
                title={item.title}
                href={item.href}
                aspect="aspect-[3/4]"
              />
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-10 md:hidden">
          <Button href="/menu" variant="red">
            See the full menu
          </Button>
        </div>
      </div>
    </section>
  );
}
