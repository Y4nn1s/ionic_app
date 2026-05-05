# IONIC_APP

Aplicación móvil desarrollada con **Ionic + Angular** como parte de la materia **Programación III — Módulo 2** en la **UNETI**.

## Descripción

La aplicación contiene tres secciones navegables mediante pestañas inferiores:

1. **Inicio** — Pantalla de bienvenida con información general de la aplicación y la fecha actual.
2. **Información Personal** — Datos del estudiante presentados en una lista con avatares e íconos.
3. **Contacto** — Formulario de contacto con validación de campos y confirmación mediante notificación toast.

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

La aplicación se abrirá automáticamente en el navegador. Se recomienda usar las **DevTools** (F12) y activar la vista de dispositivo móvil (375px de ancho) para una experiencia óptima.

## Estructura del proyecto

```
src/app/
├── inicio/          → Página de Inicio
├── info-personal/   → Página de Información Personal
├── contacto/        → Página de Contacto
└── tabs/            → Layout de navegación por pestañas
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
