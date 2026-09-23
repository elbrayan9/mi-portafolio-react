import { useState } from "react";
import Section from "./Section";
import { projects, margen } from "../data.js";
import ProjectCard from "./ProjectCard"; // Importamos la tarjeta
import ProjectModal from "./ProjectModal";

function Projects({ activeFilter }) {
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <Section id="projects">
      <h2 className="text-4xl font-bold text-primary-color mb-10">
        Proyectos Destacados
      </h2>
      <p role="status" className="text-secondary-color mb-6">{filteredProjects.length} {filteredProjects.length === 1 ? "proyecto" : "proyectos"} · {activeFilter === "all" ? "Todas las tecnologías" : activeFilter}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard
            key={project.title}
            project={project}
            onClick={() => setSelectedProject(project)}
          />
        ))}
      </div>
      {activeFilter === "all" && (
        <article className="terminal-panel p-5 mt-8">
          <p className="text-secondary-color mb-4">En desarrollo</p>
          <h3 className="text-2xl text-primary-color mb-3">{margen.title}</h3>
          <p>{margen.description}</p>
        </article>
      )}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </Section>
  );
}

export default Projects;
