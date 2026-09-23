// src/components/ProjectModal.jsx
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { motion as Motion, useReducedMotion } from "motion/react";
import { getTechIcon } from "../utils/techIcons";
import { FaTimes, FaGithub, FaExternalLinkAlt } from "react-icons/fa";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

function ProjectModal({ project, onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);
  const closeButtonRef = useRef(null);
  const previouslyFocusedRef = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const [isClosing, setIsClosing] = useState(false);
  const isClosingRef = useRef(false);
  const closeTimeoutRef = useRef(null);
  const transitionDuration = prefersReducedMotion ? 0 : 0.2;

  // Cierre compartido por ESC / botón / overlay: anima y recién desmonta
  // (vía onClose) cuando termina la transición, con guard contra llamadas dobles.
  const requestClose = useCallback(() => {
    if (isClosingRef.current) return;
    isClosingRef.current = true;
    setIsClosing(true);

    closeTimeoutRef.current = window.setTimeout(() => {
      onClose();
    }, transitionDuration * 1000);
  }, [onClose, transitionDuration]);

  // Limpiar el timer de cierre si el componente se desmonta antes de que dispare.
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) window.clearTimeout(closeTimeoutRef.current);
    };
  }, []);

  // Guardar el foco anterior, enfocar el botón de cerrar al abrir y restaurar el foco al desmontar
  useEffect(() => {
    if (!project) return;

    previouslyFocusedRef.current = document.activeElement;
    closeButtonRef.current?.focus();

    return () => {
      previouslyFocusedRef.current?.focus?.();
    };
  }, [project]);

  // Cerrar con ESC y atrapar el foco (Tab / Shift+Tab) dentro del modal
  useEffect(() => {
    if (!project) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        requestClose();
        return;
      }

      if (e.key !== "Tab" || !dialogRef.current) return;

      const focusable = dialogRef.current.querySelectorAll(FOCUSABLE_SELECTOR);
      if (focusable.length === 0) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      // El autofocus del Hero puede robar el foco mientras el modal sigue abierto:
      // si quedó fuera del diálogo, recuperarlo antes de aplicar el ciclo normal.
      if (!dialogRef.current.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
        return;
      }

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [project, requestClose]);

  // El guard va después de los hooks (no puede ser condicional); los efectos
  // ya evitan actuar sobre un modal cerrado con su propio `if (!project) return`.
  if (!project) return null;

  // Cerrar al hacer clic fuera del contenido
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) requestClose();
  };

  return (
    <Motion.div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4"
      onClick={handleOverlayClick}
      initial={{ opacity: 0 }}
      animate={{ opacity: isClosing ? 0 : 1 }}
      transition={{ duration: transitionDuration }}
    >
      <Motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-[#1a1a1a] border border-[#333] rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.95 }}
        animate={{ opacity: isClosing ? 0 : 1, scale: isClosing ? 0 : 1 }}
        transition={{ duration: transitionDuration }}
      >
        {/* Botón Cerrar */}
        <button
          ref={closeButtonRef}
          onClick={requestClose}
          aria-label="Cerrar detalles del proyecto"
          className="absolute top-4 right-4 text-gray-400 hover:text-white hover:bg-red-500/20 p-2 rounded-full transition-all z-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-color"
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
          <h2 id={titleId} className="text-4xl font-bold text-primary-color mb-4">
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
                className="flex items-center gap-2 bg-primary-color text-terminal-bg px-6 py-3 rounded-lg font-bold hover:opacity-90 motion-safe:transition-transform motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
              >
                <FaExternalLinkAlt /> Ver Demo
              </a>
            )}
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-[#333] text-white px-6 py-3 rounded-lg font-bold border border-[#555] hover:bg-[#444] motion-safe:transition-transform motion-safe:hover:-translate-y-1 motion-reduce:transition-none"
            >
              <FaGithub /> Ver Código
            </a>
          </div>
        </div>
      </Motion.div>
    </Motion.div>
  );
}

export default ProjectModal;
