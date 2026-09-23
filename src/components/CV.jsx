import Section from "./Section";
import { profile, cvSkills, experience, projects } from "../data";

export default function CV() {
  return <Section id="cv">
    <div className="terminal-panel p-6 md:p-8 cv-document">
      <p className="font-mono text-primary-color mb-3">~/curriculum</p>
      <h2 className="section-title">CV · {profile.name}</h2>
      <p className="text-xl font-bold mb-3">{profile.role}</p>
      <p className="text-secondary-color mb-3">{profile.location}</p>
      <p>{profile.summary}</p>
      <div className="flex flex-wrap gap-3 my-5 print-controls">
        <button className="action primary" onClick={() => window.print()}>Imprimir / Guardar PDF</button>
      </div>
      <p className="text-sm text-secondary-color mb-6 print-controls">Para descargar el CV, elegí “Guardar como PDF” en el diálogo de impresión.</p>
      <h3 className="cv-heading">Contacto</h3>
      <ul className="space-y-2 break-words">
        <li><a href={`mailto:${profile.email}`}>{profile.email}</a></li>
        <li><a href={profile.linkedin}>{profile.linkedin}</a></li>
        <li><a href={profile.github}>{profile.github}</a></li>
      </ul>
      <h3 className="cv-heading">Experiencia profesional</h3>
      <ul className="space-y-4">
        {experience.map(item => <li key={item.organization} className="cv-entry">
          <h4 className="font-bold">{item.organization}</h4>
          {item.role && <p>{item.role}</p>}
          <p className="text-sm text-secondary-color">{item.period}</p>
        </li>)}
      </ul>
      <h3 className="cv-heading">Educación</h3>
      <ul className="space-y-4">
        {profile.education.map(item => <li key={item.title} className="cv-entry">
          <h4 className="font-bold">{item.title}</h4>
          <p>{[item.institution, item.year].filter(Boolean).join(" · ")}</p>
        </li>)}
      </ul>
      <h3 className="cv-heading">Idiomas</h3>
      <p>{profile.languages}</p>
      <h3 className="cv-heading">Habilidades técnicas y metodologías</h3>
      <p>{cvSkills.join(" · ")}</p>
      <h3 className="cv-heading">Proyectos</h3>
      <ul className="space-y-4">
        {projects.map(project => <li key={project.title} className="cv-project">
          <h4 className="font-bold">{project.title}</h4>
          <p>{project.description}</p>
          <p className="text-sm">{project.tags.join(" · ")}</p>
          <a href={project.repoUrl} className="text-sm break-words underline">{project.repoUrl}</a>
        </li>)}
      </ul>
    </div>
  </Section>;
}
