import { useEffect, useRef, useState } from "react";
import { complete, execute, HOME, MAX_INPUT } from "../terminal/commands.js";

const MAX_BLOCKS = 50;
const MAX_HISTORY = 50;
const THEME_KEY = "terminal-theme";
const suggestions = [
  { label: "? ayuda", command: "help" },
  { label: "whoami", command: "whoami" },
  { label: "ls", command: "ls" },
  { label: "cat about.md", command: "cat ~/about.md" },
  { label: "open projects", command: "open projects" },
  { label: "open cv", command: "open cv" },
  { label: "open contact", command: "open contact" },
  { label: "neofetch", command: "neofetch" },
  { label: "theme", command: "theme" },
];

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function readTheme() {
  try {
    return localStorage.getItem(THEME_KEY) === "amber" ? "amber" : "green";
  } catch {
    return "green";
  }
}

function goTo(id) {
  const section = document.getElementById(id);
  section?.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth" });
  section?.focus({ preventScroll: true });
}

const Prompt = ({ cwd }) => <span aria-hidden="true" className="term-accent">brian@portfolio:{cwd}$</span>;

function Line({ line, onRun }) {
  if (typeof line === "string") return <p className="terminal-line text-secondary-color">{line}</p>;
  if (line.kind === "pre") return <pre aria-hidden="true" className="terminal-pre term-accent">{line.text}</pre>;
  if (line.kind === "link") {
    return (
      <p className="terminal-line text-secondary-color">
        {line.label}: <a href={line.url} target="_blank" rel="noopener noreferrer" className="term-accent underline">{line.url}</a>
      </p>
    );
  }
  if (line.kind === "items") {
    return (
      <ul className="flex flex-wrap gap-x-4 gap-y-1">
        {line.items.map(item => (
          <li key={item.text} className="min-w-0">
            {item.command
              ? <button type="button" className={`terminal-item ${item.kind === "dir" ? "term-accent" : ""}`} onClick={() => onRun(item.command)}>{item.text}</button>
              : <span className="text-secondary-color">{item.text}</span>}
          </li>
        ))}
      </ul>
    );
  }
  const tone = { error: "terminal-error", title: "text-text-color font-semibold", muted: "text-secondary-color italic" }[line.kind] ?? "text-secondary-color";
  return <p className={`terminal-line ${tone}`}>{line.text}</p>;
}

export default function Terminal({ inputRef }) {
  const [input, setInput] = useState("");
  const [cwd, setCwd] = useState(HOME);
  const [blocks, setBlocks] = useState([]);
  const [history, setHistory] = useState([]);
  const [theme, setTheme] = useState(readTheme);
  const nextId = useRef(0);
  const logRef = useRef(null);
  const historyIndex = useRef(null);
  const draft = useRef("");
  const lastAutocomplete = useRef(null);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [blocks]);

  function addBlock(command, lines, blockCwd) {
    const id = nextId.current++;
    setBlocks(prev => [...prev, { id, cwd: blockCwd, command, lines }].slice(-MAX_BLOCKS));
  }

  function toggleTheme() {
    const next = theme === "amber" ? "green" : "amber";
    setTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Sin localStorage el tema solo dura la sesión.
    }
  }

  function run(raw) {
    const command = raw.trim().slice(0, MAX_INPUT);
    historyIndex.current = null;
    if (!command) return;
    setHistory(prev => (prev.at(-1) === command ? prev : [...prev, command]).slice(-MAX_HISTORY));
    const result = execute(command, cwd);
    const { action } = result;
    if (action?.type === "clear") setBlocks([]);
    else addBlock(command, result.lines, cwd);
    setCwd(result.cwd);
    if (action?.type === "scroll") goTo(action.id);
    if (action?.type === "open-url") window.open(action.url, "_blank", "noopener,noreferrer");
    if (action?.type === "theme") toggleTheme();
  }

  function submit(event) {
    event.preventDefault();
    run(input);
    setInput("");
  }

  function browseHistory(step) {
    if (history.length === 0) return false;
    if (historyIndex.current === null) {
      if (step > 0) return false;
      draft.current = input;
      historyIndex.current = history.length - 1;
    } else {
      historyIndex.current += step;
    }
    if (historyIndex.current >= history.length) {
      historyIndex.current = null;
      setInput(draft.current);
      return true;
    }
    historyIndex.current = Math.max(0, historyIndex.current);
    setInput(history[historyIndex.current]);
    return true;
  }

  function onKeyDown(event) {
    if (event.key === "ArrowUp" || event.key === "ArrowDown") {
      if (browseHistory(event.key === "ArrowUp" ? -1 : 1)) event.preventDefault();
    } else if (event.key === "Tab" && !event.shiftKey && !event.altKey && !event.ctrlKey && !event.metaKey) {
      if (!input.trim()) return;
      const { value, candidates } = complete(input, cwd);
      if (value !== input) {
        event.preventDefault();
        setInput(value.slice(0, MAX_INPUT));
        lastAutocomplete.current = null;
      } else if (candidates.length > 1) {
        const candidatesKey = candidates.join(",");
        if (lastAutocomplete.current !== candidatesKey) {
          event.preventDefault();
          addBlock(input, [{ kind: "items", items: candidates.map(text => ({ text })) }], cwd);
          lastAutocomplete.current = candidatesKey;
        }
      }
    } else if (event.key.toLowerCase() === "l" && event.ctrlKey) {
      event.preventDefault();
      setBlocks([]);
    }
  }

  return (
    <div className={`terminal-fade terminal-shell ${theme === "amber" ? "terminal-theme-amber" : ""} border-t border-[#444] pt-5 font-mono min-w-0`}>
      <p id="terminal-help" className="text-sm text-secondary-color mb-3">
        Terminal simulada · Escribí <span className="term-accent">help</span> o tocá una sugerencia. Tab autocompleta y ↑/↓ recorre el historial. Es un sistema de archivos virtual: no hay acceso a ningún servidor.
      </p>
      <div role="group" aria-label="Comandos frecuentes" className="flex flex-wrap gap-2 mb-4">
        {suggestions.map(({ label, command }) => (
          <button key={command} type="button" className="terminal-chip" onClick={() => run(command)}>{label}</button>
        ))}
      </div>
      <div ref={logRef} role="log" aria-live="polite" aria-label="Salida de la terminal" tabIndex={0} className="terminal-log text-sm">
        {blocks.map(block => (
          <div key={block.id} className="mb-3 min-w-0">
            <p className="terminal-line"><Prompt cwd={block.cwd} /> <span className="sr-only">Comando: </span>{block.command}</p>
            {block.lines.map((line, index) => <Line key={index} line={line} onRun={run} />)}
          </div>
        ))}
      </div>
      <form onSubmit={submit} className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mt-3 min-w-0">
        <label htmlFor="terminal-input" className="sr-only">Comando de terminal</label>
        <span className="text-sm sm:text-base terminal-line shrink-0 max-w-full"><Prompt cwd={cwd} /></span>
        <div className="flex items-center gap-3 min-w-0 flex-1">
          <input id="terminal-input" ref={inputRef} value={input} onChange={e => { historyIndex.current = null; lastAutocomplete.current = null; setInput(e.target.value); }} onKeyDown={onKeyDown} maxLength={MAX_INPUT} aria-describedby="terminal-help" autoComplete="off" autoCapitalize="off" autoCorrect="off" spellCheck={false} placeholder="help" className="min-w-0 flex-1 bg-transparent border-b border-[#777] px-2 py-1 placeholder:text-secondary-color" />
          <button className="action shrink-0" type="submit">Ejecutar</button>
        </div>
      </form>
    </div>
  );
}
