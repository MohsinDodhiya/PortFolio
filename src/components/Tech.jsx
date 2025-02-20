import React from "react";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";
import GlassIcons from "./canvas/GlassIcons";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";

const Tech = () => {
  const colorMapping = {
    "HTML 5": "purple",
    "CSS 3": "purple",
    JavaScript: "purple",
    TypeScript: "purple",
    "React.js": "purple",
    "Next.js": "purple",
    "Redux Toolkit": "purple",
    Zustand: "purple",
    "Tailwind CSS": "purple",
    "Node.js": "purple",
    MongoDB: "purple",
    Appwrite: "purple",
    Prisma: "purple",
    Firebase: "purple",
    "Socket.io": "purple",
    "Bcrypt.js": "purple",
    Axios: "purple",
    "ShadCN UI": "purple",
    Git: "purple",
    Figma: "purple",
  };

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          My loved technologies...
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Skills</h2>
      </motion.div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 py-6">
          {technologies.map((tech, index) => (
            <div
              className="flex flex-col items-center justify-center p-4 rounded-xl  transition-all duration-300"
              key={index}
            >
              <div className="h-20 w-20 flex items-center justify-center">
                <GlassIcons
                  items={[
                    {
                      icon: tech.icon,
                      color: colorMapping[tech.name] || "gray",
                      label: tech.name,
                    },
                  ]}
                  className="h-16 w-16"
                />
              </div>
              <span className="mt-6 text-sm text-white opacity-80">{}</span>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
