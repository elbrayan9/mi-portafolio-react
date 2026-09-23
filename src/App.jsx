import { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Capabilities from "./components/Capabilities";
import CV from "./components/CV";
import Contact from "./components/Contact";

function App() {
  // Estado para el filtro (compartido entre Skills y Projects)
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <>
    <a className="skip-link" href="#projects">Saltar a proyectos</a>
    <main>
      <Hero />
      <About />
      <Capabilities />
      <Skills activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <Projects activeFilter={activeFilter} />
      <CV />
      <Contact />
    </main>
    </>
  );
}

export default App;
