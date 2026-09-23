export default function ProjectLinks({ project }) {
  return <div className="flex flex-wrap gap-3 mt-5">
    {project.liveUrl && project.liveUrl !== "#" && <a className="action primary" href={project.liveUrl} target="_blank" rel="noopener noreferrer">Ver sitio <span className="sr-only">de {project.title} (nueva pestaña)</span></a>}
    {project.repoUrl && <a className="action" href={project.repoUrl} target="_blank" rel="noopener noreferrer">GitHub <span className="sr-only">de {project.title} (nueva pestaña)</span></a>}
  </div>;
}
