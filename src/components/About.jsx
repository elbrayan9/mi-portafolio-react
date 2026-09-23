import Section from "./Section";

function About() {
  return (
    <Section id="about">
      <h2 className="text-4xl font-bold text-primary-color mb-3">Sobre Mí</h2>
      <p className="text-lg text-text-color leading-relaxed">
        Soy Brian Oviedo, desarrollador Full Stack con foco en Backend,
        ubicado en Córdoba Capital y con formación en Coderhouse.
        Soy fundador de Velion, donde desarrollo proyectos independientes
        de automatización con IA.
        Mi portafolio reúne proyectos de interfaces web, tiendas online y APIs.
        En cada caso comparto el problema abordado, la implementación y su código
        para que puedas evaluar mi trabajo.
      </p>
    </Section>
  );
}

export default About;
