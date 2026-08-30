import React, { useRef } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion, useScroll, useTransform, type Variants } from "motion/react";

const DownloadAppSection2 = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  // Parallax for phone image
  const y = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Animation for headline text
  const headlineVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.7,
        type: "spring",
      },
    }),
  };

  return (
    <section
      ref={sectionRef}
      className="bg-primary text-white py-16 px-4 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Phone Mockup with Parallax */}
        <motion.div
          className="flex-1 flex justify-center lg:justify-start relative z-10"
          style={{ y }}
        >
          <div className="w-96 md:w-[650px] h-[700px] relative">
            <Image
              src="/images/iphone.png" // Replace with your app screenshot
              alt="App Screenshot"
              fill
              className="object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </motion.div>
        {/* Text & QR */}
        <div className="flex-1 flex flex-col items-center lg:items-start text-center lg:text-left z-10">
          <motion.h2
            className="text-5xl md:text-7xl font-extrabold font-texas leading-tight mb-6 tracking-tight uppercase"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.7 }}
            variants={headlineVariants}
          >
            <span className="block">Join the</span>
            <span className="block">Saucial Club</span>
          </motion.h2>
          <motion.p
            className="text-lg md:text-xl mb-8 max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.7 }}
            viewport={{ once: true, amount: 0.7 }}
          >
            Addicted to our red sauce glory? They&apos;ll try to make you go to
            rehab but you should say &apos;no no no&apos;. Just download our app
            and join the BAVET community instead. Free food ahead!
          </motion.p>
          <div className="mb-8 w-full">
            <div className="p-4 flex items-center gap-4 w-full">
              <Image
                src="/images/qrcode_Saucial_Club_-_owow_website.png" // Replace with your QR code
                alt="Download QR"
                width={120}
                height={120}
                className="mb-2"
              />
              <Image
                src="/images/download-now.svg"
                alt="Download QR"
                width={220}
                height={120}
                className="mb-2 h-auto"
              />
            </div>
            <Button className="bg-white text-primary hover:border-white">
              Download Now
            </Button>
          </div>
        </div>
      </div>
      {/* Decorative background text */}
      <div className="absolute left-20 top-1/4 text-8xl md:text-[14rem] leading-tight w-1/2 font-bold text-white/20 uppercase select-none pointer-events-none z-0">
        <div className="flex space-x-4">
          <motion.span
            animate={{
              y: [0, -30, 0, 30, 0],
            }}
            transition={{
              duration: 5000,
              ease: "easeInOut",
              repeat: Infinity,
              repeatType: "loop",
            }}
          >
            TEXAS
            <br />
            APPP
          </motion.span>
        </div>
        <div></div>
      </div>
    </section>
  );
};

export default DownloadAppSection2;
