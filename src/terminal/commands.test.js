import test from "node:test";
import assert from "node:assert/strict";
import { profile, skills, cvSkills, experience, projects, capabilities } from "../data.js";
import { execute, complete, resolvePath, slugify, projectSlugs, AVAILABILITY, MAX_INPUT, HOME, PROJECTS_PATH } from "./commands.js";

const text = result => result.lines.map(line => typeof line === "string" ? line : line.text ?? (line.url ? `${line.label}: ${line.url}` : line.items?.map(item => item.text).join(" ") ?? "")).join("\n");
const items = result => result.lines.find(line => line.kind === "items")?.items.map(item => item.text) ?? [];

test("help y ayuda devuelven la misma ayuda y aclaran que el FS es virtual", () => {
  assert.deepEqual(execute("help"), execute("ayuda"));
  assert.match(text(execute("help")), /no hay acceso real a ningún servidor/);
});

test("normaliza mayúsculas, tildes y espacios", () => {
  assert.deepEqual(execute("  AYUDA  "), execute("help"));
  assert.deepEqual(execute("Sobre-Mí").action, { type: "scroll", id: "about" });
  assert.deepEqual(execute("CAT   Habilidades"), execute("cat skills.txt"));
});

test("clear y limpiar devuelven la acción clear", () => {
  for (const command of ["clear", "limpiar"]) assert.deepEqual(execute(command).action, { type: "clear" });
});

test("alias sueltos ES/EN hacen scroll a la sección", () => {
  const expected = { "sobre-mi": "about", sobremi: "about", about: "about", skills: "skills", habilidades: "skills", contact: "contact", contacto: "contact", projects: "projects", proyectos: "projects", cv: "cv", capacidades: "capabilities" };
  for (const [command, id] of Object.entries(expected)) assert.deepEqual(execute(command).action, { type: "scroll", id }, command);
});

test("open hace scroll a secciones y abre perfiles externos", () => {
  assert.deepEqual(execute("open projects").action, { type: "scroll", id: "projects" });
  assert.deepEqual(execute("open proyectos").action, { type: "scroll", id: "projects" });
  assert.deepEqual(execute("open cv").action, { type: "scroll", id: "cv" });
  assert.deepEqual(execute("open contacto").action, { type: "scroll", id: "contact" });
  assert.deepEqual(execute("open github").action, { type: "open-url", url: profile.github });
  assert.deepEqual(execute("linkedin").action, { type: "open-url", url: profile.linkedin });
  assert.deepEqual(execute("github").action, { type: "open-url", url: profile.github });
  assert.equal(execute("open marte").action, null);
  assert.equal(execute("open").lines[0].kind, "error");
});

test("theme y tema alternan el tema", () => {
  assert.deepEqual(execute("theme").action, { type: "theme" });
  assert.deepEqual(execute("tema").action, { type: "theme" });
});

test("cd, pwd y ls navegan el FS virtual", () => {
  assert.deepEqual(execute("pwd").lines, [HOME]);
  assert.equal(execute("cd projects").cwd, PROJECTS_PATH);
  assert.equal(execute("cd proyectos/").cwd, PROJECTS_PATH);
  assert.deepEqual(execute("pwd", PROJECTS_PATH).lines, [PROJECTS_PATH]);
  for (const target of ["..", "~", "/", ""]) assert.equal(execute(`cd ${target}`, PROJECTS_PATH).cwd, HOME, target);
  const missing = execute("cd marte");
  assert.equal(missing.cwd, HOME);
  assert.match(text(missing), /no existe el directorio: marte/);
  assert.match(text(execute("cd about.md")), /no es un directorio/);
  assert.deepEqual(items(execute("ls")), ["projects/", "about.md", "skills.txt", "experience.txt", "education.txt", "capabilities.txt", "contact.txt"]);
});

test("ls en projects lista los slugs de todos los proyectos", () => {
  const slugs = projects.map(project => slugify(project.title));
  assert.deepEqual(items(execute("ls", PROJECTS_PATH)), slugs);
  assert.deepEqual(items(execute("ls projects")), slugs);
  assert.deepEqual(projectSlugs, slugs);
  assert.ok(slugs.every(slug => /^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)));
});

test("los ítems de ls usan rutas absolutas que funcionan desde cualquier carpeta", () => {
  for (const item of execute("ls").lines[0].items) {
    const result = execute(item.command, PROJECTS_PATH);
    assert.ok(!text(result).includes("no existe"), item.command);
  }
});

test("cat muestra solo datos reales de data.js", () => {
  const about = text(execute("cat about.md"));
  for (const value of [profile.name, profile.role, profile.location, profile.summary, profile.languages]) assert.ok(about.includes(value), value);
  assert.equal(text(execute("cat sobre-mi")), about);
  const skillText = text(execute("cat skills.txt"));
  for (const skill of [...skills, ...cvSkills]) assert.ok(skillText.includes(skill), skill);
  const experienceText = text(execute("cat experiencia"));
  for (const item of experience) assert.ok(experienceText.includes(item.organization) && experienceText.includes(item.period));
  const educationText = text(execute("cat education.txt"));
  for (const item of profile.education) assert.ok(educationText.includes(item.title) && educationText.includes(item.year));
  const capabilitiesText = text(execute("cat capacidades"));
  for (const item of capabilities) assert.ok(capabilitiesText.includes(item.title) && capabilitiesText.includes(item.evidence));
  const contactText = text(execute("cat contacto"));
  for (const value of [profile.email, profile.github, profile.linkedin]) assert.ok(contactText.includes(value));
});

test("cat de un proyecto muestra título, descripción, tags y solo links existentes", () => {
  for (const project of projects) {
    const slug = slugify(project.title);
    const result = text(execute(`cat ${slug}`, PROJECTS_PATH));
    assert.equal(text(execute(`cat projects/${slug}`)), result);
    for (const value of [project.title, project.description, ...project.tags, project.repoUrl]) assert.ok(result.includes(value), value);
    assert.equal(result.includes("Demo:"), Boolean(project.liveUrl), slug);
    if (project.liveUrl) assert.ok(result.includes(project.liveUrl));
  }
});

test("cat maneja errores de rutas", () => {
  assert.match(text(execute("cat")), /falta el nombre/);
  assert.match(text(execute("cat marte.txt")), /no existe el archivo: marte.txt/);
  assert.match(text(execute("cat projects")), /es un directorio/);
  assert.equal(resolvePath(HOME, "projects/no-existe"), null);
});

test("comando desconocido sugiere el más parecido", () => {
  const result = execute("neofech");
  assert.match(text(result), /comando no encontrado: neofech\. Probá 'help'/);
  assert.match(text(result), /¿Quisiste decir 'neofetch'\?/);
  assert.ok(!text(execute("xyzxyzxyz")).includes("Quisiste"));
});

test("comandos peligrosos solo muestran un mensaje de terminal simulada", () => {
  for (const command of ["sudo rm -rf /", "rm -rf ~", "curl http://example.com", "ssh root@server", "wget x"]) {
    const result = execute(command);
    assert.equal(result.action, null, command);
    assert.equal(result.cwd, HOME);
    assert.match(text(result), /terminal simulada/, command);
  }
});

test("rechaza entradas más largas que el máximo", () => {
  const result = execute("a".repeat(MAX_INPUT + 1));
  assert.match(text(result), /demasiado larga/);
  assert.equal(result.action, null);
  assert.deepEqual(execute("   "), { lines: [], cwd: HOME, action: null });
});

test("neofetch muestra nombre, rol, ubicación, stack y disponibilidad", () => {
  const result = text(execute("neofetch"));
  for (const value of [profile.name, profile.role, profile.location, AVAILABILITY, ...skills]) assert.ok(result.includes(value), value);
  assert.match(text(execute("whoami")), new RegExp(profile.name));
});

test("autocompleta comandos", () => {
  assert.deepEqual(complete("neo"), { value: "neofetch", candidates: ["neofetch"] });
  assert.equal(complete("ope").value, "open ");
  assert.equal(complete("ca").value, "ca");
  assert.equal(complete("AYU").value, "ayuda");
  const multiple = complete("c");
  assert.equal(multiple.value, "c");
  assert.ok(multiple.candidates.includes("cat") && multiple.candidates.includes("cd"));
  assert.deepEqual(complete("li").candidates, ["limpiar", "linkedin"]);
  assert.deepEqual(complete("zzz"), { value: "zzz", candidates: [] });
});

test("autocompleta rutas y destinos", () => {
  assert.equal(complete("cd pro").value, "cd pro");
  assert.deepEqual(complete("cd pro").candidates, ["projects/", "proyectos/"]);
  assert.equal(complete("cd proj").value, "cd projects/");
  assert.equal(complete("cat ab").value, "cat about.md");
  assert.equal(complete("cat hab").value, "cat habilidades");
  assert.equal(complete("open li").value, "open linkedin");
  const first = projectSlugs[0];
  assert.equal(complete(`cat ${first.slice(0, 4)}`, PROJECTS_PATH).value, `cat ${first}`);
  assert.equal(complete(`cat projects/${first.slice(0, 4)}`).value, `cat projects/${first}`);
  assert.deepEqual(complete("pwd x"), { value: "pwd x", candidates: [] });
});

test("autocompletado con entrada vacía no hace nada", () => {
  assert.deepEqual(complete(""), { value: "", candidates: [] });
  assert.deepEqual(complete("   "), { value: "   ", candidates: [] });
});

test("rechaza propiedades heredadas como constructor y __proto__", () => {
  const constructorResult = execute("constructor");
  assert.match(text(constructorResult), /comando no encontrado/);
  assert.equal(constructorResult.action, null);

  const protoResult = execute("__proto__");
  assert.match(text(protoResult), /comando no encontrado/);
  assert.equal(protoResult.action, null);

  const toStringResult = execute("toString");
  assert.match(text(toStringResult), /comando no encontrado/);
  assert.equal(toStringResult.action, null);

  // Tampoco funcionan en open
  assert.match(text(execute("open constructor")), /no conozco 'constructor'/);
  assert.match(text(execute("open __proto__")), /no conozco '__proto__'/);
});

test("'sobre mi' con espacio es un alias válido para about", () => {
  assert.deepEqual(execute("sobre mi").action, { type: "scroll", id: "about" });
  assert.equal(text(execute("cat sobre mi")), text(execute("cat sobremi")));
  assert.equal(text(execute("cat sobre mi")), text(execute("cat about.md")));
  assert.deepEqual(execute("open sobre mi").action, { type: "scroll", id: "about" });
  assert.deepEqual(execute("abrir sobre mí").action, { type: "scroll", id: "about" });
});
