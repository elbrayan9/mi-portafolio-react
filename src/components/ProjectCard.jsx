import { getTechIcon } from "../utils/techIcons"; // Importamos para mostrar iconos pequeños si quieres

function ProjectCard({ project, onClick }) {
  const { title, description, image, tags } = project;

  return (
    <div
      onClick={onClick} // <-- Evento click en toda la tarjeta
      className="group bg-[#222] rounded-lg overflow-hidden border border-[#444] 
                 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:border-primary-color/50 cursor-pointer flex flex-col h-full"
    >
      {/* Contenedor de Imagen con efecto zoom */}
      <div className="overflow-hidden h-52 relative">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        {/* Overlay que aparece al pasar el mouse */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
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
    </div>
  );
}

export default ProjectCard;
