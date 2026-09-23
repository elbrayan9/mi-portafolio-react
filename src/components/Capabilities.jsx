import Section from "./Section";
import { capabilities } from "../data";

export default function Capabilities() {
  return <Section id="capabilities">
    <h2 className="section-title">Cómo puedo aportar al equipo</h2>
    <div className="grid gap-5 md:grid-cols-3">
      {capabilities.map(item => <article key={item.title} className="terminal-panel p-5">
        <h3 className="text-xl text-primary-color mb-3">{item.title}</h3>
        <p>{item.description}</p>
        <p className="text-sm text-secondary-color mt-4">En proyectos: {item.evidence}.</p>
      </article>)}
    </div>
  </Section>;
}
