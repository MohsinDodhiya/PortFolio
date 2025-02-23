import {
  web,
  backend,
 
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

  git,
  github,
  vercel,

  Snapgram1,
  chatApp,
  feedBack,
  blogApp,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "experience",
    title: "Experience",
  },
  {
    id: "tech",
    title: "Skill",
  },
  {
    id: "project",
    title: "Project",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Frontend Developer",
    icon: web,
  },
  {
    title: "MERN / Full Stack Developer",
    icon: backend,
  },
  {
    title: "React.js & Next.js Specialist",
    icon: reactjs,
  },
  {
    title: "Backend & API Developer",
    icon: nodejs,
  },
];

const technologies = [
  // Fundamental
  { name: "HTML 5", icon: html },
  { name: "CSS 3", icon: css },
  // { name: "JavaScript", icon: javascript },
  // { name: "TypeScript", icon: typescript },
  { name: "Figma", icon: figma },

  // Frontend Development
  { name: "React.js", icon: reactjs },
  // { name: "Next.js", icon: nextjs },
  // { name: "ShadCN UI", icon: shadcn },
  { name: "Tailwind CSS", icon: tailwind },

  // State Management
  { name: "Redux Toolkit", icon: redux },
  { name: "Zustand", icon: zustand },
  { name: "Context API", icon: contextapi },

  // Real-Time Communication
  // { name: "Socket.IO", icon: socketio },

  // Backend & Database
  { name: "Node.js", icon: nodejs },
  // { name: "Express.js", icon: express },
  { name: "MongoDB", icon: mongodb },
  { name: "Prisma", icon: prisma },
  { name: "Appwrite", icon: appwrite },
  { name: "Firebase", icon: firebase },

  // Form Handling & Validation
  { name: "React Hook Form", icon: reacthookform },
  { name: "Zod", icon: zod },

  // Data Management
  { name: "TanStack/React Query", icon: reactquery },
  // { name: "Axios", icon: axios },

  // File Handling
  // { name: "React Dropzone", icon: dropzone },

  // Deployment & Version Control
  { name: "Git", icon: git },
  { name: "GitHub", icon: github },
  { name: "Vercel", icon: vercel },
];

const experiences = [
  {
    title: "REACT / MERN Stack Developer",
    company_name: "PROJECT Working",
    icon: web,
    iconBg: "#383E56",
    date: "Finding",
    points: [
      "Developed scalable web applications using React.js, Next.js, and Node.js.",
      "Implemented state management using Redux Toolkit and Zustand.",
      "Integrated Appwrite, Firebase, and MongoDB for backend and authentication.",
      "Worked on real-time communication features using Socket.io.",
    ],
  },
];
const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Snapgram (Social Media App)",
    description:
      "A full-stack social media platform with authentication, file uploads, and real-time interactions.",
    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "React-Query", color: "blue-text-gradient" },
      { name: "Appwrite", color: "green-text-gradient" },
      { name: "Zustand", color: "pink-text-gradient" },
    ],
    image: Snapgram1,
    source_code_link:
      "https://github.com/MohsinDodhiya/SnapGram-Insta-Clone.git",
  },
  {
    name: "RapidChat (MERN Chat App)",
    description:
      "A real-time chat application with Socket.io and Zustand for state management.",
    tags: [
      { name: "MERN", color: "blue-text-gradient" },
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Node.js", color: "green-text-gradient" },
      { name: "Socket.io", color: "pink-text-gradient" },
    ],
    image: chatApp,
    source_code_link: "https://github.com/MohsinDodhiya/RapidChat.git",
  },
  {
    name: "True Feedback AI",
    description:
      "AI-powered feedback system using OpenAI API with secure authentication and email integration.",
    tags: [
      { name: "Next.js", color: "blue-text-gradient" },
      { name: "TypeScript", color: "blue-text-gradient" },
      { name: "Mongoose", color: "green-text-gradient" },
      { name: "Zod", color: "pink-text-gradient" },
    ],
    image: feedBack,
    source_code_link: "https://github.com/MohsinDodhiya/True-FeedBack.git",
  },
  {
    name: "BlogApp",
    description:
      "A blogging platform using React.js with Appwrite for backend services.",
    tags: [
      { name: "React.js", color: "blue-text-gradient" },
      { name: "Appwrite", color: "green-text-gradient" },
      { name: "Redux Toolkit", color: "pink-text-gradient" },
    ],
    image: blogApp,
    source_code_link: "https://github.com/MohsinDodhiya/BlogApp.git",
  },
];

export { services, technologies, experiences, testimonials, projects };
