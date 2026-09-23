import Section from "./Section";

function Contact() {
  return (
    <Section id="contact">
      <div className="text-center">
        <h2 className="text-4xl font-bold text-primary-color mb-3">
          Hablemos de tu próxima incorporación
        </h2>
        <p className="text-lg text-secondary-color mb-8">
          ¿Buscás un desarrollador para tu equipo? Escribime con el rol, el proyecto y las tecnologías con las que trabajan.
        </p>
        <div className="contact-links flex justify-center flex-wrap gap-4 mb-10">
          <a
            href="https://www.linkedin.com/in/brian-oviedo-1a04ba262/"
            target="_blank"
            rel="noopener noreferrer"
            className="break-all bg-primary-color text-terminal-bg py-3 px-6 rounded font-semibold
                       transition-transform duration-300 hover:scale-105"
          >
            LinkedIn
          </a>
          <a
            href="https://github.com/elbrayan9"
            target="_blank"
            rel="noopener noreferrer"
            className="break-all bg-primary-color text-terminal-bg py-3 px-6 rounded font-semibold
                       transition-transform duration-300 hover:scale-105"
          >
            GitHub
          </a>
          <a
            href="mailto:brianoviedo14@gmail.com"
            className="break-all bg-primary-color text-terminal-bg py-3 px-6 rounded font-semibold
                       transition-transform duration-300 hover:scale-105"
          >
            brianoviedo14@gmail.com
          </a>
        </div>
        <p className="text-secondary-color text-sm">
          &copy; {new Date().getFullYear()} Brian Oviedo. Diseñado y construido
          por mí.
        </p>
      </div>
    </Section>
  );
}

export default Contact;
