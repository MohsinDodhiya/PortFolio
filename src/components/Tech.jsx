// constants/index.js or where your technologies array is defined
// import { 
//   SiHtml5, 
//   SiCss3, 
//   SiJavascript, 
//   SiTypescript,
//   SiFigma, 
//   SiReact, 
//   SiNextdotjs, 
//   SiTailwindcss,
//   SiRedux, 
//   SiNodedotjs, 
//   SiExpress,
//   SiMongodb, 
//   SiPrisma, 
//   SiAppwrite, 
//   SiFirebase,
//   SiReactquery, 
//   SiAxios,
//   SiGit, 
//   SiGithub, 
//   SiVercel, 
//   SiSocketdotio
// } from "react-icons/si";

// import { TbBrandReactNative, TbBoxMultiple } from "react-icons/tb";
// import { BiDroplet } from "react-icons/bi";
// import { VscSymbolNamespace } from "react-icons/vsc";
// import { GiBeaver } from "react-icons/gi";
// import { BsBoxes } from "react-icons/bs";

// export const technologies = [
//   {
//     name: "HTML 5",
//     icon: <SiHtml5 className="w-full h-full" />
//   },
//   {
//     name: "CSS 3",
//     icon: <SiCss3 className="w-full h-full" />
//   },
//   {
//     name: "JavaScript",
//     icon: <SiJavascript className="w-full h-full" />
//   },
//   {
//     name: "TypeScript",
//     icon: <SiTypescript className="w-full h-full" />
//   },
//   {
//     name: "Figma",
//     icon: <SiFigma className="w-full h-full" />
//   },
//   {
//     name: "React.js",
//     icon: <SiReact className="w-full h-full" />
//   },
//   {
//     name: "Next.js",
//     icon: <SiNextdotjs className="w-full h-full" />
//   },
//   {
//     name: "ShadCN UI",
//     icon: <VscSymbolNamespace className="w-full h-full" />
//   },
//   {
//     name: "Tailwind CSS",
//     icon: <SiTailwindcss className="w-full h-full" />
//   },
//   {
//     name: "Redux Toolkit",
//     icon: <SiRedux className="w-full h-full" />
//   },
//   {
//     name: "Zustand",
//     icon: <TbBoxMultiple className="w-full h-full" />
//   },
//   {
//     name: "Context API",
//     icon: <TbBrandReactNative className="w-full h-full" />
//   },
//   {
//     name: "Socket.IO",
//     icon: <SiSocketdotio className="w-full h-full" />
//   },
//   {
//     name: "Node.js",
//     icon: <SiNodedotjs className="w-full h-full" />
//   },
//   {
//     name: "Express.js",
//     icon: <SiExpress className="w-full h-full" />
//   },
//   {
//     name: "MongoDB",
//     icon: <SiMongodb className="w-full h-full" />
//   },
//   {
//     name: "Prisma",
//     icon: <SiPrisma className="w-full h-full" />
//   },
//   {
//     name: "Appwrite",
//     icon: <SiAppwrite className="w-full h-full" />
//   },
//   {
//     name: "Firebase",
//     icon: <SiFirebase className="w-full h-full" />
//   },
//   {
//     name: "React Hook Form",
//     icon: <GiBeaver className="w-full h-full" />
//   },
//   {
//     name: "Zod",
//     icon: <BsBoxes className="w-full h-full" />
//   },
//   {
//     name: "TanStack Query",
//     icon: <SiReactquery className="w-full h-full" />
//   },
//   {
//     name: "Axios",
//     icon: <SiAxios className="w-full h-full" />
//   },
//   {
//     name: "React Dropzone",
//     icon: <BiDroplet className="w-full h-full" />
//   },
//   {
//     name: "Git",
//     icon: <SiGit className="w-full h-full" />
//   },
//   {
//     name: "GitHub",
//     icon: <SiGithub className="w-full h-full" />
//   },
//   {
//     name: "Vercel",
//     icon: <SiVercel className="w-full h-full" />
//   }
// ];

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
