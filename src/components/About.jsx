import Section from "./Section";

function About() {
  return (
    <Section id="about">
      <h2 className="text-4xl font-bold text-primary-color mb-3">Sobre Mí</h2>
      <p className="text-lg text-text-color leading-relaxed">
        Soy un Desarrollador Full Stack apasionado por construir soluciones web
        completas y eficientes. Con una sólida formación en el bootcamp de
        Coderhouse, mi especialidad es llevar ideas desde el concepto hasta un
        producto desplegado, dominando tanto el desarrollo de APIs robustas en
        el backend como la creación de interfaces de usuario interactivas en el
        frontend.
      </p>
    </Section>
  );
}

export default About;
