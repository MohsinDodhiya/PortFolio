import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  html,
  css,
  javascript,
  typescript,
  figma,
  reactjs,
  nextjs,
  shadcn,
  tailwind,
  redux,
  zustand,
  contextapi,
  socketio,
  nodejs,
  express,
  mongodb,
  prisma,
  appwrite,
  firebase,
  reacthookform,
  zod,
  reactquery,
  axios,
  dropzone,
  github,
  git,
  vercel,
} from "../../constants/index.js";

const SkillsShowcase = ({
  className = "",
  skillCategories = [],
  size = "xl",
}) => {
  // Size classes for different screen sizes - increased icon sizes
  const sizeClasses = {
    sm: "w-16 h-16 md:w-20 md:h-20",
    md: "w-20 h-20 md:w-24 md:h-24",
    lg: "w-24 h-24 md:w-28 md:h-28",
    xl: "w-28 h-28 md:w-32 md:h-32",
  };
  
  // Icon size based on container size - increased sizes
  const iconSizeClasses = {
    sm: "w-10 h-10 md:w-12 md:h-12",
    md: "w-12 h-12 md:w-14 md:h-14",
    lg: "w-14 h-14 md:w-16 md:h-16",
    xl: "w-16 h-16 md:w-20 md:h-20",
  };

  // Animation states
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className={`w-full ${className}`}>
      {skillCategories.map((category, categoryIndex) => (
        <div key={categoryIndex} className="mb-12">
          {category.title && (
            <div className="flex items-center mb-6">
              <h3 className="text-2xl font-bold text-white">
                {category.title}
              </h3>
            </div>
          )}

          <div className="grid grid-cols-3 md:grid-cols-5 gap-4 md:gap-6">
            {category.skills.map((skill, skillIndex) => {
              const isHovered =
                hoveredIndex === `${categoryIndex}-${skillIndex}`;

              return (
                <motion.div
                  key={skillIndex}
                  className="flex flex-col items-center justify-center"
                  onMouseEnter={() =>
                    setHoveredIndex(`${categoryIndex}-${skillIndex}`)
                  }
                  onMouseLeave={() => setHoveredIndex(null)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ 
                    duration: 0.3, 
                    delay: (categoryIndex * 0.1) + (skillIndex * 0.05) 
                  }}
                >
                  <motion.div
                    className={`relative flex items-center justify-center rounded-xl 
                      ${sizeClasses[size] || sizeClasses.lg}
                      bg-gray-900/80 backdrop-blur-sm
                      border border-gray-800
                      overflow-hidden cursor-pointer`}
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 0 20px 5px rgba(168, 85, 247, 0.6)" 
                    }}
                    transition={{ 
                      type: "spring", 
                      stiffness: 300,
                      damping: 15
                    }}
                    style={{
                      boxShadow: "0 0 12px 2px rgba(168, 85, 247, 0.4)",
                    }}
                  >
                    {/* Background glow effect - fixed to purple */}
                    <div
                      className="absolute inset-0 bg-purple-500 opacity-20"
                    />

                    {/* Icon */}
                    <motion.div 
                      className="flex items-center justify-center z-10"
                      whileHover={{ scale: 1.15 }}
                      transition={{ 
                        type: "spring", 
                        stiffness: 400,
                        damping: 10
                      }}
                    >
                      {typeof skill.icon === "string" ? (
                        <img
                          src={skill.icon}
                          alt={skill.name}
                          className={`${
                            iconSizeClasses[size] || iconSizeClasses.lg
                          } object-contain`}
                        />
                      ) : (
                        <div>
                          {skill.icon}
                        </div>
                      )}
                    </motion.div>
                  </motion.div>

                  {/* Label */}
                  <motion.div
                    className="mt-2 text-center text-white text-sm opacity-70"
                    whileHover={{ opacity: 1 }}
                    animate={{ 
                      opacity: isHovered ? 1 : 0.7,
                      y: isHovered ? -2 : 0
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    {skill.name}
                  </motion.div>
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default function GlassIcons() {
  const technologies = [
    // Fundamental
    { name: "HTML 5", icon: html },
    { name: "CSS 3", icon: css },
    { name: "JavaScript", icon: javascript },
    { name: "TypeScript", icon: typescript },
    { name: "Figma", icon: figma },

    // Frontend Development
    { name: "React.js", icon: reactjs },
    { name: "Next.js", icon: nextjs },
    { name: "ShadCN UI", icon: shadcn },
    { name: "Tailwind CSS", icon: tailwind },

    // State Management
    { name: "Redux Toolkit", icon: redux },
    { name: "Zustand", icon: zustand },
    { name: "Context API", icon: contextapi },

    // Real-Time Communication
    { name: "Socket.IO", icon: socketio },

    // Backend & Database
    { name: "Node.js", icon: nodejs },
    { name: "Express.js", icon: express },
    { name: "MongoDB", icon: mongodb },
    { name: "Prisma", icon: prisma },
    { name: "Appwrite", icon: appwrite },
    { name: "Firebase", icon: firebase },

    // Form Handling & Validation
    { name: "React Hook Form", icon: reacthookform },
    { name: "Zod", icon: zod },

    // Data Management
    { name: "React Query", icon: reactquery },
    { name: "Axios", icon: axios },

    // File Handling
    { name: "React Dropzone", icon: dropzone },

    // Deployment & Version Control
    { name: "Git", icon: git },
    { name: "GitHub", icon: github },
    { name: "Vercel", icon: vercel },
  ];

  // Organizing skills into categories
  const skillCategoriesData = [
    {
      title: "Fundamentals",
      skills: technologies.slice(0, 5),
    },
    {
      title: "Frontend Development",
      skills: technologies.slice(5, 9),
    },
    {
      title: "State Management",
      skills: technologies.slice(9, 12),
    },
    {
      title: "Real-Time Communication",
      skills: technologies.slice(12, 13),
    },
    {
      title: "Backend & Database",
      skills: technologies.slice(13, 19),
    },
    {
      title: "Form Handling & Data Management",
      skills: technologies.slice(19, 24),
    },
    {
      title: "Deployment & Version Control",
      skills: technologies.slice(24, 27),
    },
  ];

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto min-h-screen">
      <SkillsShowcase
        skillCategories={skillCategoriesData}
        size="lg"
        heading="Skills"
        className="py-12"
      />
    </div>
  );
}