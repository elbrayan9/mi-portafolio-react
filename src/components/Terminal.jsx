import { useEffect, useRef, useState } from "react";

const commands = {
  ayuda: { description: "Muestra esta lista de comandos." },
  sobremi: { section: "about", description: "Va a la sección Sobre mí." },
  capacidades: { section: "capabilities", description: "Va a la sección Capacidades." },
  proyectos: { section: "projects", description: "Va a la sección Proyectos." },
  habilidades: { section: "skills", description: "Va a la sección Habilidades." },
  cv: { section: "cv", description: "Va a la sección CV." },
  contacto: { section: "contact", description: "Va a la sección Contacto." },
  limpiar: { description: "Limpia el historial de la terminal." },
};

const normalize = text => text.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, "");
const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function goTo(id) {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  section?.focus({ preventScroll: true });
}

function run(name, raw) {
  const command = commands[name];
  if (name === "ayuda") return ["Comandos disponibles:", ...Object.entries(commands).map(([key, { description }]) => `${key} — ${description}`)];
  if (command?.section) {
    goTo(command.section);
    return [command.description];
  }
  return [`Comando no reconocido: "${raw}". Escribí "ayuda" para ver los comandos.`];
}

export default function Terminal({ inputRef }) {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState([]);
  const nextId = useRef(0);
  const logRef = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [history]);

  function submit(event) {
    event.preventDefault();
    const raw = input.trim();
    const name = normalize(input);
    setInput("");
    if (!name) return;
    if (name === "limpiar") return setHistory([]);
    const output = run(name, raw);
    const id = nextId.current++;
    setHistory(prev => [...prev, { id, command: raw, output }]);
  }

  return (
    <div className="terminal-fade border-t border-[#444] pt-5 font-mono min-w-0">
      <p className="text-sm text-secondary-color mb-3">Terminal interactiva · Escribí "ayuda" para ver los comandos. También podés navegar con los enlaces.</p>
      <div ref={logRef} role="log" aria-live="polite" aria-label="Historial de la terminal" tabIndex={0} className="terminal-log text-sm">
        {history.map(entry => (
          <div key={entry.id} className="mb-3">
            <p><span aria-hidden="true" className="text-primary-color">$ </span>{entry.command}</p>
            {entry.output.map((line, index) => <p key={index} className="text-secondary-color">{line}</p>)}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex flex-col sm:flex-row sm:items-center gap-3 mt-3">
        <label htmlFor="terminal-input" className="sr-only">Comando de terminal</label>
        <span aria-hidden="true" className="text-primary-color">brian@portfolio:~$</span>
        <input id="terminal-input" ref={inputRef} value={input} onChange={e => setInput(e.target.value)} maxLength={40} autoComplete="off" autoCapitalize="off" spellCheck={false} placeholder="ayuda" className="min-w-0 flex-1 bg-transparent border-b border-[#777] px-2 py-1 placeholder:text-secondary-color" />
        <button className="action" type="submit">Ejecutar</button>
      </form>
    </div>
  );
}
