# IONIC_APP

Aplicación móvil desarrollada con **Ionic + Angular** como parte de la materia **Programación III — Módulo 2** en la **UNETI**.

## Descripción

La aplicación contiene tres secciones navegables mediante pestañas inferiores:

1. **Inicio** — Pantalla principal con tarjetas informativas: bienvenida, guía de navegación de la aplicación y visualización dinámica de la fecha actual.
2. **Información Personal** — Datos del estudiante presentados en una lista estructurada con un avatar e íconos representativos.
3. **Contacto** — Página con los medios de contacto del autor y un **formulario reactivo funcional** con validación en tiempo real, **envío real de correos electrónicos** mediante el servicio externo EmailJS y **persistencia local** del histórico de mensajes enviados.

## Diseño Responsivo

Toda la aplicación ha sido diseñada e implementada utilizando el sistema de cuadrículas de Ionic (`ion-grid`). Esto garantiza que la interfaz se adapte de manera inteligente y armónica a cualquier tamaño de pantalla, ofreciendo una experiencia óptima tanto en dispositivos móviles, tablets, como en navegadores de escritorio.

## Formulario Reactivo en la Página de Contacto

La página de Contacto incorpora un formulario construido con el sistema **Reactive Forms** de Angular. La estructura del formulario y sus validadores se declaran de manera programática dentro del componente mediante `FormBuilder` y `FormGroup`, mientras que la plantilla HTML se limita a enlazarse a esa estructura preexistente.

**Validadores aplicados:**

| Campo   | Validadores                                              |
| ------- | -------------------------------------------------------- |
| Nombre  | Obligatorio, mínimo 3 caracteres, máximo 50 caracteres   |
| Correo  | Obligatorio, formato de correo electrónico válido        |
| Mensaje | Obligatorio, mínimo 10 caracteres, máximo 500 caracteres |

Los mensajes de error se muestran de forma contextual debajo de cada campo, únicamente cuando el control ha sido tocado por el usuario y se encuentra en estado inválido. El botón de envío permanece deshabilitado mientras el formulario sea inválido o haya un envío en curso, previniendo envíos accidentales o duplicados.

## Envío Real de Correos con EmailJS

El formulario de contacto utiliza **EmailJS** como intermediario para enviar correos electrónicos reales desde el navegador, sin necesidad de un backend propio. Cuando el usuario completa el formulario y presiona el botón de envío, el SDK `@emailjs/browser` transmite los datos al servidor de EmailJS, el cual a su vez emite el correo al destinatario indicado en el campo correo del formulario.

La configuración del servicio (Service ID, Template ID y Public Key) se encuentra centralizada en el archivo `mensajes.service.ts`. Las claves son públicas por diseño del propio servicio EmailJS, ya que el envío ocurre enteramente desde el navegador del cliente.

> **Nota de seguridad:** En un entorno de producción real, el envío de correos debería pasar a través de un backend propio que mantenga las credenciales del proveedor fuera del alcance del navegador. La implementación actual es adecuada únicamente para fines académicos y demostrativos.

## Persistencia Local del Histórico

Cada mensaje enviado desde la aplicación se guarda automáticamente en el `localStorage` del navegador, junto con su estado de envío (exitoso o fallido), bajo la clave `ionic_app_mensajes_enviados`. Esto permite que el usuario pueda consultar el histórico de mensajes enviados desde ese dispositivo, incluso después de recargar la página o cerrar el navegador.

La página de Contacto presenta este histórico en una tarjeta adicional que aparece solamente cuando existen registros previos. Cada entrada muestra el remitente, una vista previa del mensaje, la fecha del envío y un ícono que diferencia visualmente los envíos exitosos de los fallidos. Se incluye además un botón que permite limpiar el histórico completo.

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

La dependencia `@emailjs/browser` se instala automáticamente junto con el resto de paquetes del proyecto. No es necesario realizar configuración adicional para que el envío de correos funcione: las claves de EmailJS están incluidas en el código fuente con fines demostrativos.

## Ejecución

Para iniciar el servidor de desarrollo y ver la aplicación en el navegador:

```bash
ionic serve
```

La aplicación se abrirá automáticamente en el navegador. Se recomienda usar las **DevTools** (F12) y probar la vista en distintas dimensiones para apreciar el diseño responsivo en acción.

Para probar el envío real de correos, basta con completar los tres campos del formulario en la página de Contacto con datos válidos (utilizando un correo electrónico real en el campo correspondiente) y presionar el botón "Enviar". El correo llegará a la bandeja de entrada del destinatario en cuestión de segundos. En algunos casos puede ser necesario revisar la carpeta de Spam la primera vez.

## Estructura del proyecto

La arquitectura fue limpiada eliminando código residual de plantillas iniciales (como el componente `explore-container`), para mantener un entorno organizado:

```
src/app/
├── inicio/                 → Página de Inicio
├── informacion-personal/   → Página de Información Personal
├── contacto/               → Página de Contacto
│   ├── contacto.page.ts        → Componente con FormGroup y validadores
│   ├── contacto.page.html      → Plantilla con bindings de Reactive Forms
│   ├── contacto.page.scss      → Estilos específicos de la página
│   ├── contacto.module.ts      → Módulo con ReactiveFormsModule
│   ├── mensaje.model.ts        → Interfaz que define la estructura de un mensaje
│   └── mensajes.service.ts     → Servicio inyectable para EmailJS y localStorage
└── tabs/                   → Layout de navegación por pestañas
```

## Stack tecnológico

| Componente         | Versión              |
| ------------------ | -------------------- |
| Ionic CLI          | v7+                  |
| Ionic Framework    | v8                   |
| Angular            | v20                  |
| TypeScript         | Incluido con Angular |
| Node.js            | LTS (v20.x / v22.x)  |
| @emailjs/browser   | v4+                  |

## Autor

Ingeniero en Formación: **Yannis Iturriago Martínez**  
PNF en Informática — Sexto Semestre  
Universidad Nacional Experimental en Telecomunicaciones e Informática (UNETI)
