import { useState, useEffect, useRef } from "react";

// Definimos los mensajes de bienvenida
const welcomeMessage = [
  { text: "Iniciando BrianOviedo.dev...", prompt: true },
  { text: "Conectando con el servidor...", prompt: false },
  { text: "Conexión establecida.", prompt: false },
  {
    text: "¡Bienvenido! Soy Brian Oviedo, Full Stack Developer.",
    prompt: true,
  },
  {
    text: 'Escribe "ayuda" para ver la lista de comandos disponibles.',
    prompt: false,
  },
];

function Hero() {
  const [lines, setLines] = useState([]);
  const [input, setInput] = useState("");
  const [isInputVisible, setIsInputVisible] = useState(false);

  const terminalBodyRef = useRef(null);
  // Ref para guardar el ID del timer y poder limpiarlo
  const timerIdRef = useRef(null);

  // --- LÓGICA DE ANIMACIÓN (NUEVA Y MEJORADA) ---
  useEffect(() => {
    // Función que escribe una línea completa
    const typeLine = (lineIndex) => {
      // Si ya no hay más líneas, muestra el input y termina
      if (lineIndex >= welcomeMessage.length) {
        setIsInputVisible(true);
        return;
      }

      const line = welcomeMessage[lineIndex];

      // Función que escribe un carácter a la vez
      const typeChar = (charIndex) => {
        // Si ya no hay más caracteres, pasa a la siguiente línea
        if (charIndex >= line.text.length) {
          typeLine(lineIndex + 1); // Llama a la siguiente línea
          return;
        }

        if (charIndex === 0) {
          // --- Si es el PRIMER carácter ---
          // Añade una NUEVA línea al array de estado, pero CON el primer carácter
          setLines((prev) => [...prev, { ...line, text: line.text.charAt(0) }]);
        } else {
          // --- Si NO es el primer carácter ---
          // Actualiza la ÚLTIMA línea del array añadiendo el nuevo carácter
          setLines((prev) => {
            const newLines = [...prev];
            newLines[newLines.length - 1].text += line.text.charAt(charIndex);
            return newLines;
          });
        }

        // Llama a esta misma función para el *siguiente* carácter
        timerIdRef.current = setTimeout(() => typeChar(charIndex + 1), 30);
      };

      typeChar(0); // Inicia la animación de caracteres en 0
    };

    // --- Lógica de Inicio y Limpieza ---
    setLines([]); // Asegura que el estado esté limpio
    setIsInputVisible(false);
    typeLine(0); // Inicia la animación de líneas en 0

    // Función de limpieza: se ejecuta si el componente se "desmonta"
    return () => {
      clearTimeout(timerIdRef.current);
    };
  }, []); // El array vacío [] asegura que esto se ejecute SÓLO UNA VEZ

  // Scroll automático al final
  useEffect(() => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  }, [lines]);

  // --- LÓGICA DE COMANDOS (Sin cambios) ---
  const handleCommand = (command) => {
    let responseText = "";
    const newLines = [
      ...lines,
      { text: command, prompt: true, type: "command" },
    ];

    switch (command) {
      case "ayuda":
        responseText = `Comandos disponibles:\n'sobremi' - Muestra la sección sobre mí.\n'proyectos' - Muestra mis proyectos.\n'habilidades' - Muestra mis habilidades.\n'contacto' - Muestra cómo contactarme.\n'limpiar' - Limpia la terminal.`;
        break;
      case "sobremi":
        document
          .getElementById("about")
          ?.scrollIntoView({ behavior: "smooth" });
        responseText = 'Navegando a la sección "Sobre Mí"...';
        break;
      case "proyectos":
        document
          .getElementById("projects")
          ?.scrollIntoView({ behavior: "smooth" });
        responseText = 'Navegando a la sección "Proyectos"...';
        break;
      case "habilidades":
        document
          .getElementById("skills")
          ?.scrollIntoView({ behavior: "smooth" });
        responseText = 'Navegando a la sección "Habilidades"...';
        break;
      case "contacto":
        document
          .getElementById("contact")
          ?.scrollIntoView({ behavior: "smooth" });
        responseText = 'Navegando a la sección "Contacto"...';
        break;
      case "limpiar":
        setLines([]);
        return;
      default:
        responseText = `Comando no reconocido: "${command}". Escribe "ayuda" para ver los comandos.`;
    }

    newLines.push({ text: responseText, prompt: false, type: "response" });
    setLines(newLines);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const command = input.trim().toLowerCase();
    if (command) {
      handleCommand(command);
      setInput("");
    }
  };

  // --- JSX (Sin cambios, ya corregimos los '>') ---
  return (
    <header
      id="hero"
      className="flex justify-center items-center min-h-screen p-5"
    >
      <div className="w-full max-w-[700px] bg-terminal-bg rounded-lg shadow-2xl overflow-hidden font-mono">
        {/* Terminal Header */}
        <div className="bg-[#333] p-3 flex items-center text-sm text-secondary-color">
          <div className="flex space-x-2 mr-3">
            <span className="h-3 w-3 rounded-full bg-[#ff5f56]"></span>
            <span className="h-3 w-3 rounded-full bg-[#ffbd2e]"></span>
            <span className="h-3 w-3 rounded-full bg-[#27c93f]"></span>
          </div>
          <span>bash -- BrianOviedo.dev</span>
        </div>

        {/* Terminal Body */}
        <div
          ref={terminalBodyRef}
          className="p-5 text-base h-[400px] overflow-y-auto"
        >
          {lines.map((line, index) => (
            <div
              key={index}
              className="line whitespace-pre-wrap leading-relaxed"
            >
              {line.prompt && <span className="text-primary-color">&gt; </span>}
              <span
                className={
                  line.type === "command" ? "text-white" : "text-text-color"
                }
              >
                {line.text}
              </span>
            </div>
          ))}

          {isInputVisible && (
            <form onSubmit={handleSubmit} className="flex">
              <span className="text-primary-color mr-2">&gt;</span>
              <input
                type="text"
                id="terminal-input"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none text-text-color focus:outline-none"
                placeholder="Escribe 'ayuda' y presiona Enter..."
                autoComplete="off"
                autoFocus
              />
            </form>
          )}
        </div>
      </div>
    </header>
  );
}

export default Hero;
