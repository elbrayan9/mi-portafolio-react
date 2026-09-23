import { useCallback, useEffect, useRef, useState } from "react";
import { profile } from "../data";
import Terminal from "./Terminal";

const bootLines = [
  { text: "./iniciar-portfolio", prompt: true },
  { text: "Iniciando portfolio..." },
  { text: "Cargando perfil profesional..." },
  { text: "Cargando proyectos y habilidades..." },
  { text: "Listo." },
];
const DONE = { lineIndex: bootLines.length, charIndex: 0 };
const START = { lineIndex: 0, charIndex: 0 };
const CHAR_DELAY = 35;
const LINE_DELAY = 350;
const INTERACTIVE = "input, textarea, button, a, select, [contenteditable]";

const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const nextStep = ({ lineIndex, charIndex }) => charIndex < bootLines[lineIndex].text.length ? { lineIndex, charIndex: charIndex + 1 } : { lineIndex: lineIndex + 1, charIndex: 0 };

function BootLine({ line, index, step }) {
  const typed = index < step.lineIndex ? line.text.length : index === step.lineIndex ? step.charIndex : 0;
  const typing = index === step.lineIndex;
  return (
    <p className="terminal-line">
      {line.prompt && <span className="text-primary-color">brian@portfolio:~$ </span>}
      {line.text.slice(0, typed)}
      {typing && <span className="terminal-cursor" />}
      <span className="invisible">{line.text.slice(typed)}</span>
    </p>
  );
}

export default function Hero() {
  const [step, setStep] = useState(() => prefersReducedMotion() ? DONE : START);
  const animating = step.lineIndex < bootLines.length;
  const timerRef = useRef(null);
  const skipRef = useRef(null);
  const inputRef = useRef(null);
  const focusInputRef = useRef(false);

  const skip = useCallback(() => {
    clearTimeout(timerRef.current);
    if (skipRef.current && document.activeElement === skipRef.current) focusInputRef.current = true;
    setStep(DONE);
  }, []);

  useEffect(() => {
    if (step.lineIndex >= bootLines.length) return;
    const lineEnded = step.charIndex >= bootLines[step.lineIndex].text.length;
    timerRef.current = setTimeout(() => {
      setStep(prev => {
        const next = nextStep(prev);
        if (next.lineIndex >= bootLines.length) {
          focusInputRef.current = document.activeElement === skipRef.current;
        }
        return next;
      });
    }, lineEnded ? LINE_DELAY : CHAR_DELAY);
    return () => clearTimeout(timerRef.current);
  }, [step]);

  useEffect(() => {
    if (!animating) return;
    function onKeyDown(event) {
      const target = event.target instanceof Element ? event.target : null;
      if (event.defaultPrevented || target?.closest("dialog")) return;
      if (event.key === "Escape" || (event.key === "Enter" && !target?.closest(INTERACTIVE))) skip();
    }
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [animating, skip]);

  useEffect(() => {
    if (animating || !focusInputRef.current) return;
    focusInputRef.current = false;
    inputRef.current?.focus();
  }, [animating]);

  useEffect(() => {
    if (!animating) return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      if (mediaQuery.matches) {
        clearTimeout(timerRef.current);
        if (skipRef.current && document.activeElement === skipRef.current) focusInputRef.current = true;
        setStep(DONE);
      }
    };
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, [animating]);

  return (
    <header id="hero" className="max-w-[900px] mx-auto px-5 py-16 md:py-24">
      <div className="terminal-panel overflow-hidden">
        <div className="terminal-bar">
          <span aria-hidden="true" className="flex gap-2 shrink-0">
            <span className="terminal-light bg-[#ff5f56]" />
            <span className="terminal-light bg-[#ffbd2e]" />
            <span className="terminal-light bg-[#27c93f]" />
          </span>
          <p className="truncate min-w-0">brian@portfolio:~</p>
        </div>
        <div className="p-5 md:p-10 min-w-0">
          <div aria-hidden="true" className="font-mono text-sm mb-6">
            {bootLines.map((line, index) => <BootLine key={line.text} line={line} index={index} step={step} />)}
          </div>
          <ul className="sr-only">
            {bootLines.map(line => <li key={line.text}>{line.text}</li>)}
          </ul>
          <div className="terminal-fade min-w-0">
            <p className="font-mono text-primary-color mb-3">Desarrollo web · Frontend y Backend</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 [overflow-wrap:anywhere]">{profile.name}</h1>
            <p className="text-2xl mb-4">{profile.role}</p>
            <p className="text-secondary-color leading-relaxed max-w-2xl">{profile.summary}</p>
            <p className="mt-4">Busco oportunidades para aportar en equipos de desarrollo web.</p>
          </div>
          <nav aria-label="Presentación" className="flex flex-wrap gap-3 my-8">
            <a className="action primary" href="#projects">Ver proyectos</a>
            <a className="action" href="#cv">Ver CV</a>
            <a className="action" href="#contact">Contactar</a>
          </nav>
          {animating
            ? <button ref={skipRef} type="button" className="action font-mono" onClick={skip}>Saltar animación</button>
            : <Terminal inputRef={inputRef} />}
        </div>
      </div>
    </header>
  );
}
