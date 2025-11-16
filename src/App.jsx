import { useState } from "react";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Contact from "./components/Contact";

function App() {
  // Estado para el filtro (compartido entre Skills y Projects)
  const [activeFilter, setActiveFilter] = useState("all");

  return (
    <main>
      <Hero />
      <About />
      <Skills activeFilter={activeFilter} onFilterChange={setActiveFilter} />
      <Projects activeFilter={activeFilter} />
      <Contact />
    </main>
  );
}

export default App;
