import { SectionWrapper } from "../hoc";
import GlassIcons from "./canvas/GlassIcons";
import { motion } from "framer-motion";
import { textVariant } from "../utils/motion";
import { styles } from "../styles";
import { technologies } from "../constants";

const Tech = () => {
  const glassIconItems = technologies.map((tech) => ({
    icon: tech.icon,
    label: tech.name,
    color: "purple",
  }));

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} text-center`}>
          My loved technologies...
        </p>
        <h2 className={`${styles.sectionHeadText} text-center`}>Skills</h2>
      </motion.div>

      <GlassIcons items={glassIconItems} />
    </>
  );
};

export default SectionWrapper(Tech, "tech");
