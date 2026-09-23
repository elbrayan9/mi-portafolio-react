# Brian Oviedo · Portafolio profesional

Portafolio con estética terminal construido con React 19, Vite 7 y Tailwind CSS 3.

## Desarrollo local

Requiere Node.js 20.19+ o 22.12+ compatible con Vite 7.

```bash
npm ci
npm run dev
npm run lint
npm run build
npm run preview
```

Vite utiliza la base /mi-portafolio-react/. Abrí la dirección del servidor con esa ruta. La compilación se genera en dist/.

## Contenido y edición

- src/data.js: casos, tecnologías, capacidades y datos compartidos con el CV.
- Hero.jsx: presentación, CTA y comandos ayuda, sobremi, capacidades, proyectos, habilidades, cv, contacto y limpiar.
- Skills.jsx y Projects.jsx: filtros por tecnología, botón Todas y recuento.
- ProjectCard.jsx, ProjectModal.jsx y ProjectLinks.jsx: problema, solución, stack y enlaces. Un liveUrl ausente o igual a # no genera un enlace de demo. Los backends muestran sólo GitHub.
- CV.jsx: CV web en #cv. El botón “Imprimir / Guardar PDF” abre la impresión del navegador; elegir “Guardar como PDF” permite descargarlo sin servicios externos.
- src/index.css: estilos terminal, foco visible, movimiento reducido e impresión exclusiva del CV.
- index.html: español, metadatos sociales y favicon terminal. La imagen social es la captura existente de Khaleesi System.

## Fuentes y límites editoriales

Los cinco casos se basan en las descripciones, stacks y enlaces originales de src/data.js. Los problemas expresan objetivos técnicos; no son testimonios de clientes ni resultados medidos.

El perfil, experiencia, educación e idiomas provienen del CV entregado por Brian Oviedo. Se incorporan datos aportados por el titular sin agregar métricas, fechas ni certificaciones no presentes en la fuente.

Margen se incluye por solicitud del titular como referencia pendiente de documentación. Este repositorio no contiene evidencia de sus funciones, stack, capturas o URL: no se inventan y no se incluye en el CV como caso documentado. Para completarlo, agregar primero información verificable.

Los metadatos usan la URL de homepage en package.json. Los enlaces externos son referencias preexistentes; no se certifica su disponibilidad actual. Si cambia el dominio, actualizar metadatos y base de Vite.

## Accesibilidad y validación

Enlace para saltar a proyectos, controles nativos, etiquetas de formulario y foco visible. El modal usa dialog: Escape, foco contenido y restauración al control de origen. Los filtros exponen aria-pressed y anuncian el recuento.

Revisión manual: probar a 320, 768 y 1440 px, recorrer con Tab, abrir y cerrar casos, usar filtros y comandos, revisar impresión y guardar PDF.

Ejecutar lint y build antes de entregar cambios. No hay suite de tests automatizados configurada.

## Contacto

- [LinkedIn](https://www.linkedin.com/in/brian-oviedo-1a04ba262/)
- [GitHub](https://github.com/elbrayan9)
- [Email](mailto:brianoviedo14@gmail.com)
