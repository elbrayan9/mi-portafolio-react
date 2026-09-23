// --- DATOS DE TUS PROYECTOS Y HABILIDADES ---
export const skills = [
  "React",
  "Next.js",
  "JavaScript",
  "HTML5",
  "CSS3",
  "Java",
  "Spring Boot",
  "Node.js",
  "Express",
  "Firebase",
  "MongoDB",
  "Tailwind CSS",
  "JWT",
  "Swagger",
  "Docker",
  "Testing",
];

export const projects = [
  {
    title: "Khaleesi System - Punto de Venta",
    problem: "Organizar la gestión de un negocio desde una aplicación web.",
    description:
      "Completa SPA de gestión de negocios con autenticación por roles, CRUD, y un chatbot con IA integrado (Google Gemini).",
    // Las imágenes ahora apuntan a la carpeta /public
    image: "images/473shots_so.png",
    tags: ["React", "Firebase", "Tailwind CSS"],
    liveUrl: "https://khaleesisystem.com.ar/",
    repoUrl: "https://github.com/elbrayan9/Khaleesi-System1",
  },
  {
    title: "Tienda Online con JS Puro",
    problem: "Implementar una tienda interactiva sin depender de frameworks.",
    description:
      "E-commerce interactivo construido sin frameworks, demostrando un sólido dominio de la manipulación del DOM y el localStorage.",
    image: "images/480shots_so.png",
    tags: ["JavaScript", "HTML5", "CSS3"],
    liveUrl: "https://elbrayan9.github.io/tienda-online/",
    repoUrl: "https://github.com/elbrayan9/tienda-online",
  },
  {
    title: "E-commerce Autoadministrable",
    problem: "Administrar productos y ofrecer un catálogo con carrito.",
    description:
      "Tienda online con catálogo, carrito y panel de administración protegido para la gestión completa (CRUD) de productos.",
    image: "images/665shots_so.png",
    tags: ["Next.js", "React", "Firebase"],
    liveUrl: "https://mi-tienda-coder.vercel.app/",
    repoUrl: "https://github.com/elbrayan9/mi-tienda-coder",
  },
  {
    title: "Backend de E-commerce con Node.js",
    problem: "Estructurar el backend de un e-commerce y su autenticación.",
    description:
      "API REST robusta con arquitectura en capas (DAO, DTO, Repository), autenticación JWT, tests de integración y documentación con Swagger.",
    image: "images/962shots_so.png",
    tags: [
      "Node.js",
      "MongoDB",
      "JWT",
      "Swagger",
      "Docker",
      "Testing",
      "Express",
    ],
    liveUrl: null,
    repoUrl: "https://github.com/elbrayan9/e-commerce",
  },
  {
    title: "API de Facturación con Java",
    problem: "Separar las responsabilidades de un backend de facturación.",
    description:
      "Backend robusto con arquitectura de 3 capas (Controller, Service, Repository) para un sistema de facturación.",
    image: "images/java-api-placeholder.png",
    tags: ["Java", "Spring Boot"],
    liveUrl: null,
    repoUrl:
      "https://github.com/elbrayan9/FacturacionEntregaProyectoFinalOviedo",
  },
];

// Margen se menciona por pedido del titular; este repositorio no documenta su implementación.
export const margen = {
  title: "Margen",
  description: "Proyecto pendiente de documentación en este portafolio. Los detalles técnicos y enlaces se incorporarán cuando estén disponibles.",
};

export const profile = {
  name: "Brian Oviedo",
  role: "Desarrollador Full Stack con foco en Backend",
  location: "Córdoba Capital",
  summary: "Desarrollo Full Stack con foco en Backend: APIs REST con Java/Spring Boot y Node.js/Express, e interfaces con React y Next.js. Proyectos independientes de automatización con IA en Velion.",
  email: "brianoviedo14@gmail.com",
  github: "https://github.com/elbrayan9",
  linkedin: "https://www.linkedin.com/in/brian-oviedo-1a04ba262/",
  education: [
    { title: "Diplomatura Full Stack", institution: "Coderhouse", year: "2024" },
    { title: "Curso Desarrollo Web", year: "2023" },
    { title: "Técnico Mecánico", institution: "IPET N°49", year: "2017" },
  ],
  languages: "Inglés · B1",
};

export const experience = [
  { organization: "Velion", role: "Fundador de proyectos independientes de automatización con IA", period: "2025–actualidad" },
  { organization: "Mulint SRL", role: "Encargado comercial y atención al cliente", period: "2023–actualidad" },
  { organization: "Emprendimiento textil", period: "2019–2023" },
];

// Habilidades del CV; no implican uso en todos los proyectos del portafolio.
export const cvSkills = [
  "Java / Spring Boot", "Node.js / Express / JWT",
  "Firebase / Firestore / Cloud Functions", "APIs REST", "React / Next.js",
  "Docker", "GitHub Actions", "n8n", "LLM APIs", "Testing", "Scrum",
];

export const capabilities = [
  { title: "Interfaces y tiendas web", description: "Interfaces con React y Next.js, manipulación del DOM y persistencia local con JavaScript.", evidence: "Tienda Online · E-commerce Autoadministrable" },
  { title: "APIs y organización del backend", description: "APIs REST con Node.js y Express; separación en capas con Java y Spring Boot.", evidence: "Backend de E-commerce · API de Facturación" },
  { title: "Acceso, datos y documentación", description: "Autenticación con JWT, gestión de datos con Firebase y MongoDB, documentación con Swagger y tests de integración.", evidence: "Khaleesi System · Backend de E-commerce" },
];
