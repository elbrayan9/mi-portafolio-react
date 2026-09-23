import { motion as Motion, useReducedMotion } from "motion/react";
import ProjectLinks from "./ProjectLinks";

export default function ProjectCard({ project, onClick }) {
  const reduceMotion = useReducedMotion();
  return <Motion.article
    className="terminal-panel overflow-hidden flex flex-col"
    initial={reduceMotion ? false : { opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: reduceMotion ? 0 : 0.3, ease: "easeOut" }}
  >
    <img src={import.meta.env.BASE_URL + project.image} alt={project.title === "API de Facturación con Java" ? "Ilustración del proyecto de facturación" : `Vista de ${project.title}`} loading="lazy" width="640" height="360" className="w-full h-48 object-cover" />
    <div className="p-5 flex flex-col flex-1">
      <h3 className="text-2xl text-primary-color font-bold mb-4">{project.title}</h3>
      <dl className="space-y-2 text-sm leading-relaxed">
        <dt className="font-bold">Problema</dt><dd>{project.problem}</dd>
        <dt className="font-bold">Solución</dt><dd>{project.description}</dd>
        <dt className="font-bold">Stack</dt><dd className="text-secondary-color">{project.tags.join(" · ")}</dd>
      </dl>
      <div className="mt-auto pt-3">
        <ProjectLinks project={project} />
        <button className="mt-4 underline underline-offset-4 text-sm" onClick={onClick}>Ampliar caso<span className="sr-only">: {project.title}</span></button>
      </div>
    </div>
  </Motion.article>;
}
