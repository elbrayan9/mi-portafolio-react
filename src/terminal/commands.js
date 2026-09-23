import { profile, skills, cvSkills, experience, projects, capabilities } from "../data.js";

// Terminal simulada: FS virtual construido desde data.js, sin DOM ni acceso a ningún servidor.
export const MAX_INPUT = 80;
export const HOME = "~";
export const PROJECTS_PATH = "~/projects";
export const AVAILABILITY = "Busco oportunidades para aportar en equipos de desarrollo web.";
const VIRTUAL_NOTE = "Es un sistema de archivos virtual del portafolio: no hay acceso real a ningún servidor.";

export const normalize = text => String(text ?? "").trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, " ");
export const slugify = text => normalize(text).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const projectsBySlug = new Map(projects.map(project => [slugify(project.title), project]));
export const projectSlugs = [...projectsBySlug.keys()];

const error = text => ({ text, kind: "error" });
const title = text => ({ text, kind: "title" });
const link = (label, url) => ({ kind: "link", label, url });

const files = {
  "about.md": {
    aliases: ["sobre-mi", "sobre mi", "sobremi", "about"],
    lines: () => [title(`# ${profile.name}`), `Rol: ${profile.role}`, `Ubicación: ${profile.location}`, profile.summary, `Idiomas: ${profile.languages}`],
  },
  "skills.txt": {
    aliases: ["habilidades", "skills"],
    lines: () => [title("Tecnologías de los proyectos:"), ...skills.map(skill => `- ${skill}`), title("Habilidades del CV:"), ...cvSkills.map(skill => `- ${skill}`)],
  },
  "experience.txt": {
    aliases: ["experiencia", "experience"],
    lines: () => experience.map(item => [item.organization, item.role].filter(Boolean).join(" — ") + ` (${item.period})`),
  },
  "education.txt": {
    aliases: ["educacion", "education"],
    lines: () => profile.education.map(item => [item.title, item.institution].filter(Boolean).join(" — ") + ` (${item.year})`),
  },
  "capabilities.txt": {
    aliases: ["capacidades", "capabilities"],
    lines: () => capabilities.flatMap(item => [title(item.title), item.description, `Evidencia: ${item.evidence}`]),
  },
  "contact.txt": {
    aliases: ["contacto", "contact"],
    lines: () => [`Email: ${profile.email}`, link("GitHub", profile.github), link("LinkedIn", profile.linkedin)],
  },
};
const fileNames = Object.keys(files);
const findFile = name => fileNames.find(key => key === name || (Object.hasOwn(files, key) && files[key].aliases.includes(name)));

function projectLines(project) {
  return [
    title(project.title),
    `Problema: ${project.problem}`,
    project.description,
    `Tags: ${project.tags.join(", ")}`,
    ...(project.liveUrl ? [link("Demo", project.liveUrl)] : []),
    ...(project.repoUrl ? [link("Repositorio", project.repoUrl)] : []),
  ];
}

// Resuelve una ruta a un nodo del FS virtual; "/" se trata como ~.
export function resolvePath(cwd, path = "") {
  const target = normalize(path);
  const parts = /^[~/]/.test(target) ? [] : cwd === PROJECTS_PATH ? ["projects"] : [];
  for (const part of target.split("/")) {
    if (!part || part === "." || part === "~") {
      if (part === "~") parts.length = 0;
      continue;
    }
    if (part === "..") parts.pop();
    else parts.push(part === "proyectos" && parts.length === 0 ? "projects" : part);
  }
  if (parts.length === 0) return { type: "dir", path: HOME };
  if (parts.length === 1 && parts[0] === "projects") return { type: "dir", path: PROJECTS_PATH };
  if (parts.length === 1 && findFile(parts[0])) return { type: "file", name: findFile(parts[0]), lines: files[findFile(parts[0])].lines };
  if (parts.length === 2 && parts[0] === "projects" && projectsBySlug.has(parts[1])) {
    const project = projectsBySlug.get(parts[1]);
    return { type: "file", name: parts[1], lines: () => projectLines(project) };
  }
  return null;
}

// Entradas de un directorio; los comandos usan rutas absolutas para que sigan sirviendo tras un cd.
function listDir(path) {
  if (path === PROJECTS_PATH) return projectSlugs.map(slug => ({ text: slug, kind: "file", command: `cat ${PROJECTS_PATH}/${slug}` }));
  return [{ text: "projects/", kind: "dir", command: `cd ${PROJECTS_PATH}` }, ...fileNames.map(name => ({ text: name, kind: "file", command: `cat ~/${name}` }))];
}

const sections = {
  about: "about", "sobre-mi": "about", "sobre mi": "about", sobremi: "about",
  skills: "skills", habilidades: "skills",
  capabilities: "capabilities", capacidades: "capabilities",
  projects: "projects", proyectos: "projects",
  cv: "cv",
  contact: "contact", contacto: "contact",
};
const sectionNames = { about: "Sobre mí", skills: "Habilidades", capabilities: "Capacidades", projects: "Proyectos", cv: "CV", contact: "Contacto" };
const externals = { github: profile.github, linkedin: profile.linkedin };
const openTargets = [...Object.keys(sections), ...Object.keys(externals)];

const simulated = ["sudo", "su", "rm", "rmdir", "mv", "cp", "touch", "mkdir", "chmod", "chown", "ssh", "scp", "curl", "wget", "ping", "apt", "apt-get", "npm", "node", "python", "bash", "sh", "git", "vim", "vi", "nano", "kill", "reboot", "shutdown", "exit", "logout"];

const helpLines = () => [
  title("Comandos disponibles (ES/EN):"),
  "help | ayuda          — muestra esta ayuda",
  "whoami                — quién soy",
  "neofetch              — resumen del perfil",
  "ls [ruta]             — lista archivos y carpetas",
  "cd <ruta> | cd ..     — cambia de carpeta (cd projects)",
  "pwd                   — muestra la carpeta actual",
  "cat <archivo>         — muestra un archivo (cat about.md, cat habilidades)",
  "open <sección>        — va a projects, cv, contact, about, skills o capabilities",
  "github | linkedin     — abre el perfil en una pestaña nueva",
  "theme | tema          — alterna el color de la terminal",
  "clear | limpiar       — limpia la pantalla (también Ctrl+L)",
  { text: "Tab autocompleta, ↑/↓ recorre el historial. " + VIRTUAL_NOTE, kind: "muted" },
];

const neofetchArt = [
  "┌────────┐",
  "│ >_     │",
  "│        │",
  "└────────┘",
].join("\n");

const neofetchLines = () => [
  { text: neofetchArt, kind: "pre" },
  title("brian@portfolio"),
  `Nombre: ${profile.name}`,
  `Rol: ${profile.role}`,
  `Ubicación: ${profile.location}`,
  `Stack: ${skills.join(", ")}`,
  `Idiomas: ${profile.languages}`,
  `Disponibilidad: ${AVAILABILITY}`,
  "Shell: terminal simulada (FS virtual del portafolio)",
];

const scrollTo = (id, cwd) => ({ lines: [`Abriendo la sección ${sectionNames[id]}...`], cwd, action: { type: "scroll", id } });
const openUrl = (name, cwd) => ({ lines: [`Abriendo ${name === "github" ? "GitHub" : "LinkedIn"} en una pestaña nueva...`], cwd, action: { type: "open-url", url: externals[name] } });

const commands = {
  help: cwd => ({ lines: helpLines(), cwd, action: null }),
  clear: cwd => ({ lines: [], cwd, action: { type: "clear" } }),
  whoami: cwd => ({ lines: ["brian", `${profile.name} — ${profile.role}`, { text: VIRTUAL_NOTE, kind: "muted" }], cwd, action: null }),
  pwd: cwd => ({ lines: [cwd], cwd, action: null }),
  neofetch: cwd => ({ lines: neofetchLines(), cwd, action: null }),
  theme: cwd => ({ lines: ["Tema de la terminal alternado (verde clásico / ámbar)."], cwd, action: { type: "theme" } }),
  ls: (cwd, args) => {
    const node = resolvePath(cwd, args[0]);
    if (!node) return { lines: [error(`ls: no existe el directorio: ${args[0]}`)], cwd, action: null };
    if (node.type === "file") return { lines: [node.name], cwd, action: null };
    return { lines: [{ kind: "items", items: listDir(node.path) }], cwd, action: null };
  },
  cd: (cwd, args) => {
    const node = resolvePath(cwd, args[0] ?? HOME);
    if (!node) return { lines: [error(`cd: no existe el directorio: ${args[0]}`)], cwd, action: null };
    if (node.type === "file") return { lines: [error(`cd: no es un directorio: ${args[0]}`)], cwd, action: null };
    return { lines: [], cwd: node.path, action: null };
  },
  cat: (cwd, args) => {
    if (args.length === 0) return { lines: [error("cat: falta el nombre de un archivo. Probá 'ls' para ver cuáles hay.")], cwd, action: null };
    const lines = args.flatMap(arg => {
      const node = resolvePath(cwd, arg);
      if (!node) return [error(`cat: no existe el archivo: ${arg}`)];
      if (node.type === "dir") return [error(`cat: ${arg}: es un directorio. Probá 'cd ${arg}' o 'ls ${arg}'.`)];
      return node.lines();
    });
    return { lines, cwd, action: null };
  },
  open: (cwd, args) => {
    const target = args.join(" ");
    if (Object.hasOwn(sections, target)) return scrollTo(sections[target], cwd);
    if (Object.hasOwn(externals, target)) return openUrl(target, cwd);
    const hint = "Opciones: projects, cv, contact, about, skills, capabilities, github, linkedin.";
    return { lines: [error(target ? `open: no conozco '${target}'. ${hint}` : `open: indicá qué abrir. ${hint}`)], cwd, action: null };
  },
  github: cwd => openUrl("github", cwd),
  linkedin: cwd => openUrl("linkedin", cwd),
};

const aliases = { ayuda: "help", limpiar: "clear", tema: "theme", abrir: "open" };
export const commandNames = [...Object.keys(commands), ...Object.keys(aliases), ...Object.keys(sections)].sort();

function distance(a, b) {
  const row = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let previous = row[0];
    row[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const current = row[j];
      row[j] = Math.min(row[j] + 1, row[j - 1] + 1, previous + (a[i - 1] === b[j - 1] ? 0 : 1));
      previous = current;
    }
  }
  return row[b.length];
}

export function suggest(name) {
  let best = null;
  for (const candidate of commandNames) {
    const score = distance(name, candidate);
    if (score <= 2 && (!best || score < best.score)) best = { candidate, score };
  }
  return best?.candidate ?? null;
}

// Ejecuta una línea y devuelve { lines, cwd, action } sin efectos secundarios.
export function execute(input, cwd = HOME) {
  const raw = String(input ?? "").trim();
  if (!raw) return { lines: [], cwd, action: null };
  if (raw.length > MAX_INPUT) return { lines: [error(`La entrada es demasiado larga (máximo ${MAX_INPUT} caracteres).`)], cwd, action: null };

  const normalized = normalize(raw);
  const tokens = normalized.split(" ");
  let name = tokens[0];
  let args = tokens.slice(1);
  const original = raw.split(/\s+/)[0];

  // Intentar emparejar comandos, aliases, archivos o secciones con espacios (ej: "sobre mi")
  if (tokens.length > 1) {
    for (let i = tokens.length; i >= 1; i--) {
      const candidate = tokens.slice(0, i).join(" ");
      const isCommand = Object.hasOwn(commands, candidate) || Object.hasOwn(aliases, candidate);
      const isSection = Object.hasOwn(sections, candidate);
      const isFile = findFile(candidate);
      if (isCommand || isSection || isFile) {
        name = candidate;
        args = tokens.slice(i);
        break;
      }
    }
  }

  const alias = Object.hasOwn(aliases, name) ? aliases[name] : null;
  const command = Object.hasOwn(commands, alias ?? name) ? commands[alias ?? name] : null;
  if (command) return command(cwd, (alias ?? name) === "cat" ? reconstructArgs(args) : args);
  if (Object.hasOwn(sections, name)) return scrollTo(sections[name], cwd);
  if (simulated.includes(name)) {
    return { lines: [error(`${original}: esta es una terminal simulada del portafolio y no ejecuta comandos reales.`), { text: VIRTUAL_NOTE + " Probá 'help'.", kind: "muted" }], cwd, action: null };
  }
  const suggestion = suggest(name);
  return {
    lines: [error(`comando no encontrado: ${original}. Probá 'help' o tocá una sugerencia.`), ...(suggestion ? [`¿Quisiste decir '${suggestion}'?`] : [])],
    cwd,
    action: null,
  };
}

const reconstructArgs = tokens => {
  const result = [];
  let i = 0;
  while (i < tokens.length) {
    let found = false;
    for (let len = Math.min(3, tokens.length - i); len >= 1; len--) {
      const candidate = tokens.slice(i, i + len).join(" ");
      if (findFile(candidate)) {
        result.push(candidate);
        i += len;
        found = true;
        break;
      }
    }
    if (!found) {
      result.push(tokens[i]);
      i++;
    }
  }
  return result;
};

const commonPrefix = words => words.reduce((prefix, word) => {
  let i = 0;
  while (i < prefix.length && prefix[i] === word[i]) i++;
  return prefix.slice(0, i);
});

const argCommands = ["cd", "ls", "cat", "open", "abrir"];

function pathCandidates(command, cwd, partial) {
  const slash = partial.lastIndexOf("/");
  const base = slash >= 0 ? partial.slice(0, slash + 1) : "";
  const node = resolvePath(cwd, base);
  if (!node || node.type !== "dir") return [];
  let names = node.path === PROJECTS_PATH ? [...projectSlugs] : ["projects/", "proyectos/", ...fileNames, ...fileNames.map(name => files[name].aliases[0])];
  if (command === "cd") names = names.filter(name => name.endsWith("/"));
  return names.map(name => base + name);
}

// Autocompletado: devuelve el nuevo valor y los candidatos cuando hay más de uno.
export function complete(input, cwd = HOME) {
  const value = String(input ?? "");
  if (!value.trim()) return { value, candidates: [] };
  const lead = value.match(/^\s*/)[0];
  const body = value.slice(lead.length);
  const space = body.search(/\s/);
  let prefix, partial, options, finish;
  if (space < 0) {
    prefix = lead;
    partial = normalize(body);
    options = commandNames;
    finish = name => argCommands.includes(name) ? `${name} ` : name;
  } else {
    const command = normalize(body.slice(0, space));
    const rest = body.slice(space);
    const lastSpace = rest.search(/\S+$/);
    const tokenStart = lastSpace < 0 ? rest.length : lastSpace;
    prefix = lead + body.slice(0, space) + rest.slice(0, tokenStart);
    partial = normalize(rest.slice(tokenStart));
    if (command === "open" || command === "abrir") options = openTargets;
    else if (argCommands.includes(command)) options = pathCandidates(command, cwd, partial);
    else return { value, candidates: [] };
    finish = name => name;
  }
  const candidates = options.filter(name => name.startsWith(partial));
  if (candidates.length === 0) return { value, candidates: [] };
  if (candidates.length === 1) return { value: prefix + finish(candidates[0]), candidates };
  const shared = commonPrefix(candidates);
  return { value: shared.length > partial.length ? prefix + shared : value, candidates };
}
