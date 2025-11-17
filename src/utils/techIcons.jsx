// src/utils/techIcons.jsx
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaDocker,
  FaGitAlt,
} from "react-icons/fa";
import {
  SiSpringboot,
  SiNextdotjs,
  SiFirebase,
  SiMongodb,
  SiTailwindcss,
  SiExpress,
  SiJsonwebtokens,
  SiSwagger,
  SiMocha,
  SiJavascript,
} from "react-icons/si";

// Este objeto mapea el TEXTO de tus tags al COMPONENTE de ícono
export const techIcons = {
  React: <FaReact className="text-[#61DAFB]" />,
  "Next.js": <SiNextdotjs className="text-white" />,
  JavaScript: <SiJavascript className="text-[#F7DF1E]" />,
  HTML5: <FaHtml5 className="text-[#E34F26]" />,
  CSS3: <FaCss3Alt className="text-[#1572B6]" />,
  Java: <FaJava className="text-[#ED8B00]" />,
  "Spring Boot": <SiSpringboot className="text-[#6DB33F]" />,
  "Node.js": <FaNodeJs className="text-[#339933]" />,
  Express: <SiExpress className="text-white" />,
  Firebase: <SiFirebase className="text-[#FFCA28]" />,
  MongoDB: <SiMongodb className="text-[#47A248]" />,
  "Tailwind CSS": <SiTailwindcss className="text-[#06B6D4]" />,
  JWT: <SiJsonwebtokens className="text-white" />,
  Swagger: <SiSwagger className="text-[#85EA2D]" />,
  Docker: <FaDocker className="text-[#2496ED]" />,
  Testing: <SiMocha className="text-[#8D6748]" />,
};

// Función helper para obtener el ícono o uno por defecto
export const getTechIcon = (techName) => {
  return techIcons[techName] || null; // Retorna null si no hay ícono
};
