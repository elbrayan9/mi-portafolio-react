import { useEffect, useRef } from "react";
import { motion as Motion, useReducedMotion } from "motion/react";
import ProjectLinks from "./ProjectLinks";

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const reduceMotion = useReducedMotion();
  useEffect(() => {
    const dialog = dialogRef.current;
    const previousFocus = document.activeElement;
    const overflow = document.body.style.overflow;
    dialog.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
      previousFocus?.focus();
    };
  }, []);
  return <dialog ref={dialogRef} aria-labelledby="project-title" onCancel={onClose} onClick={event => { if (event.target === event.currentTarget) onClose(); }} className="project-dialog">
    <Motion.div
      className="p-5 md:p-8"
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduceMotion ? 0 : 0.25, ease: "easeOut" }}
    >
      <button className="action mb-5" onClick={onClose} autoFocus>Cerrar caso</button>
      <h2 id="project-title" className="section-title">{project.title}</h2>
      <img src={import.meta.env.BASE_URL + project.image} alt="" className="w-full max-h-80 object-contain mb-6" />
      <dl className="space-y-3">
        <dt className="font-bold text-primary-color">Problema</dt><dd>{project.problem}</dd>
        <dt className="font-bold text-primary-color">Solución</dt><dd>{project.description}</dd>
        <dt className="font-bold text-primary-color">Stack</dt><dd>{project.tags.join(" · ")}</dd>
      </dl>
      <ProjectLinks project={project} />
    </Motion.div>
  </dialog>;
}
