# PRD — Aplicación Ionic de 3 Menús
**Programación III — Módulo 2**
**Autor:** [Yannis]
**Fecha:** 5 de mayo de 2026

---

## 1. Objetivo

Construir una aplicación móvil con Ionic que contenga tres secciones navegables: **Inicio**, **Información personal** y **Contacto**. La aplicación debe ejecutarse correctamente en navegador mediante `ionic serve` y estar versionada con Git.

## 2. Contexto académico

- **Materia:** Programación III
- **Módulo:** 2
- **Puntuación:** 8 puntos
- **Criterio crítico:** Todo el código fuente debe estar documentado con palabras propias del estudiante, especialmente en lo que se programa manualmente. El código autogenerado por el framework no requiere comentario detallado. La evaluación valora la interpretación propia, no la cantidad de comentarios.

## 3. Stack tecnológico (obligatorio)

| Componente | Versión | Propósito |
|---|---|---|
| Node.js | LTS (v20.x o v22.x) | Entorno de ejecución |
| npm | Incluido con Node | Gestor de paquetes |
| Ionic CLI | Última estable (v7+) | Andamiaje y servidor de desarrollo |
| Angular | v17+ (standalone components) | Framework base |
| TypeScript | Incluido con Angular | Lenguaje |
| Git | Última estable | Control de versiones |
| Navegador | Chrome o Edge | Pruebas con DevTools (F12) |

**Editor:** Google Antigravity (con asistencia de agentes IA para generación de código).

## 4. Comandos de inicialización exactos

El agente debe ejecutar esta secuencia desde la carpeta de proyectos del usuario:

```bash
ionic start IONIC_APP tabs --type=angular --capacitor=false
cd IONIC_APP
git init
git add .
git commit -m "Inicialización del proyecto con plantilla tabs"
```

**Notas para el agente:**
- Usar plantilla `tabs` (no `sidemenu` ni `blank`).
- Tipo `angular` (no `react` ni `vue`).
- Sin Capacitor en esta fase — solo navegador.
- El nombre del proyecto debe ser `IONIC_APP` para mantener consistencia.

## 5. Estructura de las 3 páginas

La plantilla `tabs` genera por defecto `tab1`, `tab2`, `tab3`. El agente debe **renombrar y reestructurar** estos tabs a las secciones requeridas:

### 5.1 Tab 1 — Inicio
- **Ruta:** `/tabs/inicio`
- **Ícono Ionicons:** `home-outline`
- **Etiqueta del tab:** `Inicio`
- **Contenido mínimo:**
  - Encabezado con título "Inicio"
  - Mensaje de bienvenida con el nombre del estudiante
  - Breve descripción del propósito de la aplicación (2-3 líneas)
  - Una tarjeta (`ion-card`) con la fecha actual mostrada con un pipe de Angular

### 5.2 Tab 2 — Información personal
- **Ruta:** `/tabs/informacion-personal`
- **Ícono Ionicons:** `person-outline`
- **Etiqueta del tab:** `Información`
- **Contenido mínimo:**
  - Encabezado con título "Información personal"
  - Avatar (`ion-avatar`) con imagen de perfil (puede ser placeholder)
  - Lista (`ion-list`) con `ion-item` para cada dato:
    - Nombre completo
    - Cédula
    - Carrera
    - Semestre
    - Universidad
  - Los datos deben venir de una propiedad pública del componente TypeScript (no escritos directamente en el HTML), para que el estudiante pueda comentar el flujo de datos entre el `.ts` y el `.html`.

### 5.3 Tab 3 — Contacto
- **Ruta:** `/tabs/contacto`
- **Ícono Ionicons:** `mail-outline`
- **Etiqueta del tab:** `Contacto`
- **Contenido mínimo:**
  - Encabezado con título "Contacto"
  - Formulario con `ion-input` para:
    - Nombre del visitante
    - Correo electrónico
    - Mensaje (`ion-textarea`)
  - Botón `ion-button` que al presionar muestre un `ion-toast` o `ion-alert` con el mensaje "Mensaje enviado correctamente" (no se requiere envío real a backend).
  - El método que maneja el botón debe estar en el archivo `.ts` del componente y debe tener una firma clara que el estudiante pueda comentar (qué recibe, qué hace, qué retorna).

## 6. Reglas de documentación (CRÍTICAS — el agente NO debe comentar nada)

**Esta es la regla más importante del PRD.** El agente de Antigravity debe generar código **limpio, sin comentarios**. La documentación la escribirá el estudiante manualmente después.

**Razón:** El criterio de evaluación exige interpretación propia del estudiante. Comentarios generados por IA son detectables y comprometen la calificación.

**Excepción única permitida:** El agente puede dejar marcadores `// TODO: comentar` en las líneas o bloques donde el estudiante deberá agregar su explicación. Esto sirve como guía de qué amerita comentario y qué no.

**Bloques que SÍ requerirán comentarios del estudiante:**
- Declaraciones de propiedades en clases TypeScript
- Métodos personalizados (no los del ciclo de vida de Angular salvo si se modifican)
- Bindings de datos en HTML (`{{ }}`, `[property]`, `(event)`)
- Imports de módulos Ionic específicos cuando se agregan manualmente
- Lógica del formulario de contacto

**Bloques que NO requieren comentario:**
- Archivos de configuración (`angular.json`, `tsconfig.json`, `package.json`)
- Imports automáticos generados por el CLI
- Estructura básica de routing generada por la plantilla
- Estilos por defecto de Ionic

## 7. Requerimientos visuales

- Usar componentes nativos de Ionic en todo el proyecto. **No** usar HTML plano cuando exista un componente Ionic equivalente.
- Respetar el tema por defecto de Ionic (no se requiere personalización de colores).
- La aplicación debe ser responsive y verse correctamente en vista móvil (375px de ancho) usando las DevTools del navegador.

## 8. Criterios de aceptación

La aplicación se considera completa cuando:

1. `ionic serve` levanta el proyecto sin errores.
2. Las 3 pestañas inferiores muestran los íconos y etiquetas correctas.
3. Cada pestaña navega a su página correspondiente sin recargar.
4. La página de Información personal muestra los datos cargados desde el componente TypeScript.
5. El formulario de Contacto valida campos vacíos antes de enviar y muestra confirmación al enviar.
6. El repositorio Git tiene al menos 3 commits con mensajes descriptivos.
7. El código generado por el agente está sin comentarios (listo para que el estudiante los agregue).

## 9. Entregables

- Carpeta del proyecto `IONIC_APP/` completa.
- Repositorio Git inicializado con historial de commits.
- README.md básico con instrucciones de instalación y ejecución (este sí lo puede generar el agente comentado, ya que es documentación de proyecto, no código fuente).

## 10. Fuera de alcance (NO hacer)

- No instalar Capacitor ni plugins nativos.
- No configurar emuladores Android/iOS.
- No conectar a backend real.
- No agregar autenticación.
- No comentar el código (responsabilidad del estudiante).
- No agregar páginas adicionales más allá de las 3 solicitadas.

---

**Fin del PRD.**