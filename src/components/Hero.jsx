import { useState } from "react";
import { profile } from "../data";

const destinations = { sobremi: "about", capacidades: "capabilities", proyectos: "projects", habilidades: "skills", contacto: "contact", cv: "cv" };

export default function Hero() {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState('Escribí "ayuda" para ver los comandos.');
  function submit(event) {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    if (command === "limpiar") setResponse("");
    else if (command === "ayuda") setResponse(`Comandos: ${Object.keys(destinations).join(", ")}, limpiar.`);
    else if (destinations[command]) {
      const section = document.getElementById(destinations[command]);
      section?.scrollIntoView();
      section?.focus({ preventScroll: true });
      setResponse(`Sección: ${command}.`);
    } else setResponse(`Comando no reconocido: "${command}". Escribí "ayuda".`);
    setInput("");
  }
  return (
    <header id="hero" className="max-w-[900px] mx-auto px-5 py-16 md:py-24">
      <div className="terminal-panel overflow-hidden">
        <div className="bg-[#333] px-5 py-3 font-mono text-sm"> <span aria-hidden="true" className="text-primary-color">&gt;_ </span>brian@portfolio:~</div>
        <div className="p-6 md:p-10">
          <p className="font-mono text-primary-color mb-3">Desarrollo web · Frontend y Backend</p>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">{profile.name}</h1>
          <p className="text-2xl mb-4">{profile.role}</p>
          <p className="text-secondary-color leading-relaxed max-w-2xl">{profile.summary}</p>
          <p className="mt-4">Busco oportunidades para aportar en equipos de desarrollo web.</p>
          <nav aria-label="Presentación" className="flex flex-wrap gap-3 my-8">
            <a className="action primary" href="#projects">Ver proyectos</a>
            <a className="action" href="#cv">Ver CV</a>
            <a className="action" href="#contact">Contactar</a>
          </nav>
          <div className="border-t border-[#444] pt-5 font-mono">
            <p className="text-sm text-secondary-color mb-3">Terminal interactiva · También podés navegar con los enlaces.</p>
            <form onSubmit={submit} className="flex flex-wrap gap-3">
              <label htmlFor="terminal-input" className="sr-only">Comando de terminal</label>
              <span aria-hidden="true" className="text-primary-color">&gt;</span>
              <input id="terminal-input" value={input} onChange={e => setInput(e.target.value)} autoComplete="off" placeholder="ayuda" className="min-w-0 flex-1 bg-transparent border-b border-[#777] px-2" />
              <button className="action" type="submit">Ejecutar</button>
            </form>
            <p role="status" className="mt-4 text-sm break-words">{response}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
