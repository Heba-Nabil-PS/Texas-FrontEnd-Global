"use client";

import { domAnimation, LazyMotion } from "motion/react";

import styles from "@/styles/Hero.module.css";

const BannerHero2 = () => {
  return (
    <LazyMotion features={domAnimation}>
      <section className="relative z-30 w-full bg-[#ede9e6] p-10 pb-0 pt-10">
        <div className="relative flex h-[50vh] basis-full max-md:flex-col md:h-[80vh]">
          {/* <NextImage
                  src={item?.Image}
                  alt={item.Alt}
                  fill
                  className="object-cover !right-0 !left-auto md:!w-3/4 "
                /> */}
          <video className={styles.heroVideo} autoPlay muted loop playsInline>
            <source src="/images/intro.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* <div className="container mx-auto mt-24 absolute z-10 top-0 md:w-1/2">
                  <div className="grid grid-cols-12 lg:text-left">
                    <m.div
                      initial={{ opacity: 0, y: 100 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1 }}
                      className="col-span-full mt-6 p-8 px-8 "
                    >
                      <h1 className="lg:text-7xl text-white text-3xl lg:max-w-3xl font-extrabold capitalize mb-2 block mix-blend-multiply">
                        <span className="stroked-title lg:text-9xl block opacity-35 -mb-12 mix-blend-plus-lighter">
                          Discover
                        </span>
                        {banners[0].Title}
                      </h1>
                      <p className="mb-4 mt-4 !text-white text-lg  max-md:hidden">
                        {banners[0].Body}
                      </p>
                      <div className="flex gap-4 lg:justify-start">
                        <Button asChild className="my-2 md:my-4">
                          <NextLink href={banners[0].Button1URL}>{banners[0].Button1Name}</NextLink>
                        </Button>
                      </div>
                    </m.div>
                  </div>
                </div> */}
        </div>
      </section>
    </LazyMotion>
  );
};

export default BannerHero2;
