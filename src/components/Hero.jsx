"use client";

import { motion } from "framer-motion";
import { styles } from "../styles";
import { textVariant, fadeIn, slideIn } from "../utils/motion";
import { ReactJS } from "./canvas";

const Hero = () => {
  return (
    <section className="relative w-full h-[700px] md:h-[640px] mx-auto overflow-hidden">
      {/* Text and Intro Section */}
      <div
        className={`absolute inset-0 top-[100px] md:top-[150px] max-w-7xl mx-auto ${styles.paddingX} flex flex-row items-start gap-5`}
      >
        {/* Vertical Line and Dot */}
        <div className="flex flex-col justify-center items-center mt-5">
          <div className="w-5 h-5 rounded-full bg-[#915EFF]" />
          <div className="w-1 sm:h-80 h-40 violet-gradient" />
        </div>

        {/* Text Content */}
        <div className="mt-4 md:mt-0">
          <motion.h1
            variants={textVariant()}
            initial="hidden"
            animate="show"
            className={`${styles.heroHeadText} text-white`}
          >
            Hi, I'm <span className="text-[#915EFF]">Mohsin</span>
          </motion.h1>
          <motion.p
            variants={fadeIn("", "", 0.1, 1)}
            initial="hidden"
            animate="show"
            className={`${styles.heroSubText} mt-2 text-white-100`}
          >
            I Build Scalable ReactJS WebApps
            <br className="sm:block hidden" />
            Focusing on Performance and User Engagement...
          </motion.p>
          <motion.div
            variants={fadeIn("", "", 0.2, 1)}
            initial="hidden"
            animate="show"
            className="mt-8"
          >
            <motion.a
              href="/Resume.pdf"
              download="Resume.pdf"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-[#915EFF] rounded-lg hover:bg-[#915EFF]/90 transition-all"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="mr-2">Download Resume</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* 3D Model Section - Responsive positioning */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="absolute top-[390px] md:top-[100px] bottom-0 right-[10px] w-full md:w-1/2 lg:w-2/5 h-[300px] md:h-[400px] pl-0 md:pl-8"
      >
        <ReactJS
          modelConfig={{
            color: 0x61dafb, // Matching the purple accent color
            autoRotate: true,
            initialScale: 2.0,
          }}
          containerClassName="w-full h-full"
          aspectRatio="auto"
          mobileZOffset={13}
          desktopZOffset={11}
        />
      </motion.div>
    </section>
  );
};

export default Hero;
