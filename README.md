# IONIC_APP

Aplicación móvil desarrollada con **Ionic + Angular** como parte de la materia **Programación III — Módulo 2** en la **UNETI**.

## Descripción

La aplicación contiene tres secciones navegables mediante pestañas inferiores:

1. **Inicio** — Pantalla principal con tarjetas informativas: bienvenida, guía de navegación de la aplicación y visualización dinámica de la fecha actual.
2. **Información Personal** — Datos del estudiante presentados en una lista estructurada con un avatar e íconos representativos.
3. **Contacto** — Vista estructurada que incluye una sección de medios de contacto directo (lista) y un formulario interactivo con validación de campos y confirmación mediante notificación toast.

## Diseño Responsivo

Toda la aplicación ha sido diseñada e implementada utilizando el sistema de cuadrículas de Ionic (`ion-grid`). Esto garantiza que la interfaz se adapte de manera inteligente y armónica a cualquier tamaño de pantalla, ofreciendo una experiencia óptima tanto en dispositivos móviles, tablets, como en navegadores de escritorio.

## Requisitos previos

- [Node.js](https://nodejs.org/) versión LTS (v20.x o v22.x)
- npm (incluido con Node.js)
- Ionic CLI v7+

Para instalar Ionic CLI globalmente:

```bash
npm install -g @ionic/cli
```

## Instalación

1. Clonar o descargar el repositorio.
2. Abrir una terminal en la carpeta del proyecto.
3. Instalar las dependencias:

```bash
npm install
```

## Ejecución

Para iniciar el servidor de desarrollo y ver la aplicación en el navegador:

```bash
ionic serve
```

La aplicación se abrirá automáticamente en el navegador. Se recomienda usar las **DevTools** (F12) y probar la vista en distintas dimensiones para apreciar el diseño responsivo en acción.

## Estructura del proyecto

La arquitectura fue limpiada eliminando código residual de plantillas iniciales (como el componente `explore-container`), para mantener un entorno organizado:

```
src/app/
├── inicio/                 → Página de Inicio
├── informacion-personal/   → Página de Información Personal
├── contacto/               → Página de Contacto
└── tabs/                   → Layout de navegación por pestañas
```

## Stack tecnológico

| Componente | Versión              |
| ---------- | -------------------- |
| Ionic CLI  | v7+                  |
| Angular    | v17+                 |
| TypeScript | Incluido con Angular |
| Node.js    | LTS (v20.x / v22.x)  |

## Autor

Ingeniero en Formación: **Yannis Iturriago Martínez**
PNF en Informática — Sexto Semestre
Universidad Nacional Experimental en Telecomunicaciones e Informática (UNETI)
