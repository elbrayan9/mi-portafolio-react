// src/components/ProjectModal.jsx
import { useEffect } from "react";
import { getTechIcon } from "../utils/techIcons";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

function ProjectModal({ project, onClose }) {
  if (!project) return null;

  // Cerrar con la tecla ESC
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  // Cerrar al hacer clic fuera del contenido
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4 animate-fadeIn"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#1a1a1a] border border-[#333] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative animate-scaleIn">
        {/* Botón Cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-red-500/20 p-2 rounded-full transition-all z-10"
        >
          <FaTimes size={24} />
        </button>

        {/* Imagen Ampliada */}
        <div className="w-full h-64 md:h-96 overflow-hidden relative group">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] to-transparent opacity-90"></div>
        </div>

        {/* Contenido */}
        <div className="p-8 -mt-20 relative">
          <h2 className="text-4xl font-bold text-primary-color mb-4">
            {project.title}
          </h2>

          <p className="text-gray-300 text-lg mb-8 leading-relaxed">
            {project.description}
          </p>

          {/* Sección de Tecnologías con Íconos */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-white mb-4 border-b border-[#333] pb-2 inline-block">
              Tecnologías Utilizadas
            </h3>
            <div className="flex flex-wrap gap-4">
              {project.tags.map((tag) => (
                <div
                  key={tag}
                  className="flex items-center gap-2 bg-[#2a2a2a] border border-[#444] px-4 py-2 rounded-lg text-gray-300"
                >
                  <span className="text-xl">{getTechIcon(tag)}</span>
                  <span className="font-mono text-sm">{tag}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Enlaces de Acción */}
          <div className="flex flex-wrap gap-4 pt-4 border-t border-[#333]">
            {project.liveUrl !== "#" && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-primary-color text-terminal-bg px-6 py-3 rounded-lg font-bold hover:opacity-90 transition-transform hover:-translate-y-1"
              >
                <FaExternalLinkAlt /> Ver Demo
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#333] text-white px-6 py-3 rounded-lg font-bold border border-[#555] hover:bg-[#444] transition-transform hover:-translate-y-1"
            >
              <FaGithub /> Ver Código
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProjectModal;
