import React from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import GlassIcons from "./canvas/GlassIcons";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const Tech = () => {
  return (
    <section className="relative w-full h-auto overflow-hidden">
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          My loved technologies...
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Skills</h2>
      </motion.div>

      <div className="container mx-auto px-4 overflow-hidden">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 py-6">
          {technologies.map((tech, index) => (
            <div
              className="flex flex-col items-center justify-center p-4 rounded-xl transition-all duration-300 overflow-hidden"
              key={index}
            >
              <div className="h-20 w-20 flex items-center justify-center">
                <GlassIcons
                  items={[
                    {
                      icon: tech.icon,
                      color: "purple",
                      label: tech.name,
                    },
                  ]}
                  className="h-16 w-16"
                />
              </div>
              {/* Hide any potential text overflow */}
              <div className="w-full h-0 overflow-hidden">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SectionWrapper(Tech, "tech");
