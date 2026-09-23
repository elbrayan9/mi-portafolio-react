import { motion as Motion, useReducedMotion } from "motion/react";

function ProjectCard({ project, onClick }) {
  const { title, description, image, tags } = project;
  const prefersReducedMotion = useReducedMotion();

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Motion.div
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
      whileHover={prefersReducedMotion ? undefined : { y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-[#222] rounded-lg overflow-hidden border border-[#444]
                 transition-[box-shadow,border-color] duration-300 motion-reduce:transition-none hover:shadow-2xl hover:border-primary-color/50 cursor-pointer flex flex-col h-full
                 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-color focus-visible:ring-offset-2 focus-visible:ring-offset-[#1a1a1a]"
    >
      {/* Contenedor de Imagen con efecto zoom */}
      <div className="overflow-hidden h-52 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover duration-500 motion-safe:transition-transform motion-safe:group-hover:scale-110 motion-reduce:transition-none"
        />
        {/* Overlay que aparece al pasar el mouse o al enfocar la tarjeta con el teclado */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <span className="text-white font-semibold border border-white px-4 py-2 rounded-full backdrop-blur-sm">
            Ver Detalles
          </span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-2xl font-bold text-primary-color mb-2 group-hover:text-white transition-colors">
          {title}
        </h3>
        <p className="text-secondary-color mb-4 line-clamp-3 text-sm">
          {description}
        </p>

        {/* Tags simplificados en la tarjeta */}
        <div className="mt-auto flex flex-wrap gap-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-[#333] text-xs font-mono px-2 py-1 rounded text-gray-400 border border-[#444]"
            >
              {tag}
            </span>
          ))}
          {tags.length > 3 && (
            <span className="text-xs text-gray-500 py-1">
              +{tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Motion.div>
  );
}

export default ProjectCard;
