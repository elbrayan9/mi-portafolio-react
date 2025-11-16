import Section from "./Section";
import { skills } from "../data.js";

function Skills({ activeFilter, onFilterChange }) {
  const handleFilterClick = (skill) => {
    // Si la habilidad clickeada ya es la activa, resetea el filtro
    if (skill === activeFilter) {
      onFilterChange("all");
    } else {
      onFilterChange(skill);
    }
  };

  return (
    <Section id="skills">
      <h2 className="text-4xl font-bold text-primary-color mb-3">
        Mi Arsenal Tecnológico
      </h2>
      <p className="text-secondary-color mb-10">
        Haz clic en una tecnología para ver los proyectos donde la he utilizado.
      </p>
      <div className="flex flex-wrap gap-4">
        {skills.map((skill) => {
          const isActive = skill === activeFilter;
          return (
            <button
              key={skill}
              data-skill={skill}
              onClick={() => handleFilterClick(skill)}
              className={`
                skill-badge bg-[#2a2a2a] border border-[#444] text-text-color
                py-2.5 px-5 rounded-md cursor-pointer transition-all duration-300
                hover:bg-primary-color hover:text-terminal-bg hover:-translate-y-1 hover:border-primary-color
                ${
                  isActive
                    ? "bg-primary-color text-terminal-bg border-primary-color"
                    : ""
                }
              `}
            >
              {skill}
            </button>
          );
        })}
      </div>
    </Section>
  );
}

export default Skills;
