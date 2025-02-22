// src/components/ProjectCard.jsx
import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { github } from "../assets";
import { fadeIn } from "../utils/motion";

const ProjectCard = ({
  index,
  name,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    <motion.div variants={fadeIn("up", "spring", index * 0.5, 0.75)}>
      <Tilt
        options={{ max: 45, scale: 1, speed: 450 }}
        className="bg-[#1a1a2e] p-5 rounded-2xl shadow-lg w-full"
      >
        <div className="relative w-full h-[230px]">
          <img
            src={image}
            alt="project_image"
            className="w-full h-full object-cover rounded-2xl"
          />

          <div className="absolute inset-0 flex justify-end items-start m-3">
            <div
              onClick={() => window.open(source_code_link, "_blank")}
              className="bg-black/50 hover:bg-black w-10 h-10 rounded-full flex justify-center items-center cursor-pointer transition"
            >
              <img
                src={github}
                alt="source code"
                className="w-1/2 h-1/2 object-contain"
              />
            </div>
          </div>
        </div>

        <div className="mt-5">
          <h3 className="text-white font-bold text-[24px]">{name}</h3>
          <p className="mt-2 text-gray-400 text-[14px]">{description}</p>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <p key={i} className="text-[14px] bg-purple-700 text-white px-2 py-1 rounded-md">
              #{tag.name}
            </p>
          ))}
        </div>
      </Tilt>
    </motion.div>
  );
};

export default ProjectCard;