import Section from "./Section";
import { projects } from "../data.js";
import ProjectCard from "./ProjectCard"; // Importamos la tarjeta

function Projects({ activeFilter }) {
  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.tags.includes(activeFilter));

  return (
    <Section id="projects">
      <h2 className="text-4xl font-bold text-primary-color mb-10">
        Proyectos Destacados
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </Section>
  );
}

export default Projects;
