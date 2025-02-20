import { motion } from "framer-motion";
import { styles } from "../styles";
import ReactJS from "./canvas/ReactJS";

const Hero = () => {
  return (
    <section className="relative w-full h-screen mx-auto overflow-hidden">
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
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={`${styles.heroHeadText} text-white`}
          >
            Hi, I'm <span className="text-[#915EFF]">Mohsin</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className={`${styles.heroSubText} mt-2 text-white-100`}
          >
            I develop 3D visuals, user{" "}
            <br className="sm:block hidden" />
            interfaces and web applications
          </motion.p>
        </div>
      </div>

      {/* 3D Model Section */}
      <div className="absolute top-[300px] md:top-[200px] bottom-0 right-0 lg:-left-[-600px] sm:left-0 max-w-7xl sm:max-w-md mx-auto w-full h-[200px] sm:h-[400px]">
        <ReactJS />
      </div>
    </section>
  );
};

export default Hero;