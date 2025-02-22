// src/components/About.jsx
import React from "react";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { SectionWrapper } from "../hoc";
import { textVariant, fadeIn } from "../utils/motion";
import ServiceCard from "./ServiceCard"; 

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Hi, I'm Mohsin – a passionate Frontend Developer specializing in
        React.js, Next.js, and modern UI frameworks. With strong expertise in
        TypeScript and JavaScript, I craft scalable, efficient, and
        user-friendly web applications. My experience spans across real-time
        communication, interactive UI design, and backend integration using
        technologies like Node.js, Express, and MongoDB. A quick learner and
        problem solver, I thrive on building solutions that make an impact.
        Let's collaborate to turn ideas into reality!
      </motion.p>

      <div className="mt-20 flex flex-wrap gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");

