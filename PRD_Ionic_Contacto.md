# PRD — Implementación de Reactive Forms + Envío Real por Correo en Página de Contacto

## CONTEXTO DEL PROYECTO

Proyecto Ionic 8 + Angular 20 ya existente. Se trata de una aplicación móvil informativa con tres pestañas (Inicio, Información Personal, Contacto). El proyecto está completo y funcional. NO es un proyecto nuevo. La estructura actual es:

```
src/app/
├── inicio/                 → NO TOCAR
├── informacion-personal/   → NO TOCAR
├── contacto/               → MODIFICAR (objetivo de este PRD)
├── tabs/                   → NO TOCAR
├── app.module.ts           → NO TOCAR
└── app-routing.module.ts   → NO TOCAR
```

## OBJETIVO ÚNICO

Transformar el formulario de la página de Contacto (que actualmente usa `[(ngModel)]` con validación mínima y envío simulado por toast) en un formulario funcional completo basado en **Reactive Forms de Angular**, con **envío real de correo electrónico mediante EmailJS** y **persistencia local del histórico** en `localStorage`.

## ALCANCE — REGLAS ABSOLUTAS

### Archivos PERMITIDOS para modificar o crear:
- `src/app/contacto/contacto.page.ts` (modificar)
- `src/app/contacto/contacto.page.html` (modificar)
- `src/app/contacto/contacto.page.scss` (modificar — solo para estilos del nuevo contenido)
- `src/app/contacto/contacto.module.ts` (modificar — solo para imports)
- `src/app/contacto/mensaje.model.ts` (crear nuevo)
- `src/app/contacto/mensajes.service.ts` (crear nuevo)
- `package.json` (modificar — solo para agregar dependencia `@emailjs/browser`)

### Archivos PROHIBIDOS de tocar:
- Cualquier archivo fuera de la carpeta `src/app/contacto/`
- `app.module.ts`, `app-routing.module.ts`, `tabs/`, `inicio/`, `informacion-personal/`
- `angular.json`, `ionic.config.json`, `tsconfig.*.json`
- Archivos `.spec.ts` (NO modificar los tests autogenerados)
- `README.md`

### Reglas de comportamiento:
- NO crear carpetas adicionales
- NO crear archivos de configuración nuevos
- NO instalar dependencias diferentes a `@emailjs/browser`
- NO refactorizar otras páginas "de paso"
- NO añadir comentarios explicativos largos en el código (los comentarios deben ser breves y solo donde aporten claridad)
- NO mover archivos existentes
- Mantener el mismo estilo de comentarios y nomenclatura en español que ya existe en el proyecto

---

## ESPECIFICACIÓN TÉCNICA DETALLADA

### 1. Instalar dependencia

Ejecutar en la raíz del proyecto:
```bash
npm install @emailjs/browser
```

Esto añade `@emailjs/browser` a `package.json`. NO instalar nada más.

### 2. Crear `src/app/contacto/mensaje.model.ts`

Archivo nuevo. Contenido exacto:

```typescript
// Modelo que define la estructura de un mensaje enviado desde el formulario de contacto.
// Se utiliza tanto para el envío vía EmailJS como para el almacenamiento local.

export interface Mensaje {
  id: string;              // Identificador único generado en el momento del envío
  nombre: string;          // Nombre del remitente (campo del formulario)
  correo: string;          // Correo del remitente y destinatario del envío
  mensaje: string;         // Cuerpo del mensaje
  fechaEnvio: string;      // Fecha y hora del envío en formato ISO
  estado: 'enviado' | 'error';  // Resultado del intento de envío
}
```

### 3. Crear `src/app/contacto/mensajes.service.ts`

Archivo nuevo. Servicio inyectable que encapsula la integración con EmailJS y el manejo de `localStorage`. Contenido exacto:

```typescript
import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Mensaje } from './mensaje.model';

// Servicio que centraliza la lógica de envío de correos mediante EmailJS
// y la persistencia del histórico de mensajes en localStorage.
// Se inyecta como singleton en la página de Contacto.

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  // Claves de configuración de EmailJS.
  // Son claves públicas por diseño del servicio (el envío ocurre desde el navegador).
  // Para producción real estas claves deberían vivir en variables de entorno
  // y el envío debería pasar por un backend propio.
  private readonly SERVICE_ID = 'service_abokv1l';
  private readonly TEMPLATE_ID = 'template_m9nknru';
  private readonly PUBLIC_KEY = 'r0DqgsBTseaEhsT51';

  // Clave bajo la cual se guarda el histórico de mensajes en localStorage
  private readonly STORAGE_KEY = 'ionic_app_mensajes_enviados';

  constructor() {}

  // Dispara el envío real del correo mediante el SDK de EmailJS.
  // Devuelve una promesa que resuelve cuando EmailJS confirma el envío
  // o rechaza si hay un error de red, autenticación o configuración.
  async enviarCorreo(nombre: string, correo: string, mensaje: string): Promise<void> {
    const parametrosPlantilla = {
      from_name: nombre,
      from_email: correo,
      to_email: correo,
      message: mensaje
    };

    await emailjs.send(
      this.SERVICE_ID,
      this.TEMPLATE_ID,
      parametrosPlantilla,
      { publicKey: this.PUBLIC_KEY }
    );
  }

  // Guarda un mensaje en el histórico local. Los mensajes más recientes
  // quedan al inicio del arreglo para facilitar su presentación en la vista.
  guardarEnHistorial(mensaje: Mensaje): void {
    const historial = this.obtenerHistorial();
    historial.unshift(mensaje);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(historial));
  }

  // Recupera el histórico completo desde localStorage.
  // Si no hay datos guardados o el contenido no es válido, devuelve un arreglo vacío.
  obtenerHistorial(): Mensaje[] {
    try {
      const datosCrudos = localStorage.getItem(this.STORAGE_KEY);
      if (!datosCrudos) {
        return [];
      }
      const datos = JSON.parse(datosCrudos);
      return Array.isArray(datos) ? datos : [];
    } catch {
      return [];
    }
  }

  // Elimina todos los mensajes del histórico local.
  // Útil si el usuario quiere limpiar el registro desde la interfaz.
  limpiarHistorial(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Genera un identificador único compacto basado en el timestamp actual
  // y un componente aleatorio. Suficiente para uso local.
  generarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  }
}
```

### 4. Reescribir `src/app/contacto/contacto.page.ts`

REEMPLAZAR el contenido actual completo del archivo por este:

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { MensajesService } from './mensajes.service';
import { Mensaje } from './mensaje.model';

// Estructura de cada medio de contacto mostrado en la lista superior de la página.
interface MedioContacto {
  etiqueta: string;
  valor: string;
  icono: string;
}

@Component({
  selector: 'app-contacto',
  templateUrl: 'contacto.page.html',
  styleUrls: ['contacto.page.scss'],
  standalone: false,
})
export class ContactoPage implements OnInit {

  // Lista estática de medios de contacto del autor.
  mediosContacto: MedioContacto[] = [
    { etiqueta: 'Correo electrónico', valor: 'y.itur1m@gmail.com', icono: 'mail-outline' },
    { etiqueta: 'Teléfono', valor: 'Disponible bajo solicitud', icono: 'call-outline' },
    { etiqueta: 'GitHub', valor: 'Y4nn1s', icono: 'logo-github' },
    { etiqueta: 'Ubicación', valor: 'Caracas, Parroquia San Agustín, Venezuela', icono: 'location-outline' }
  ];

  // Grupo de controles del formulario reactivo.
  // Se construye en el constructor mediante FormBuilder para mayor claridad.
  contactoForm: FormGroup;

  // Bandera que indica si el envío está en curso.
  // Se utiliza para deshabilitar el botón y prevenir envíos duplicados.
  enviando: boolean = false;

  // Histórico de mensajes enviados desde este dispositivo.
  // Se carga desde localStorage al iniciar la página.
  historial: Mensaje[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private toastController: ToastController,
    private mensajesService: MensajesService
  ) {
    // Definición del formulario con validadores síncronos.
    // Cada control declara sus reglas de validación en el segundo parámetro.
    this.contactoForm = this.formBuilder.group({
      nombre: ['', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(50)
      ]],
      correo: ['', [
        Validators.required,
        Validators.email
      ]],
      mensaje: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500)
      ]]
    });
  }

  // Hook del ciclo de vida de Angular. Se ejecuta una vez al inicializar la página.
  // Recupera el histórico de mensajes previamente enviados desde localStorage.
  ngOnInit(): void {
    this.historial = this.mensajesService.obtenerHistorial();
  }

  // Getters de conveniencia para acceder a cada control desde la plantilla
  // sin tener que escribir contactoForm.get('campo') repetidamente.
  get nombre() {
    return this.contactoForm.get('nombre');
  }

  get correo() {
    return this.contactoForm.get('correo');
  }

  get mensaje() {
    return this.contactoForm.get('mensaje');
  }

  // Método principal disparado por el botón Enviar.
  // Coordina la validación, el envío vía EmailJS, la persistencia local
  // y el feedback visual al usuario mediante toasts.
  async enviarMensaje(): Promise<void> {
    // Si el formulario es inválido, se marcan todos los controles como tocados
    // para que los mensajes de error se hagan visibles, y se interrumpe el envío.
    if (this.contactoForm.invalid) {
      this.contactoForm.markAllAsTouched();
      await this.mostrarToast('Por favor, corrija los errores del formulario antes de enviar.', 'warning');
      return;
    }

    // Bloqueo del botón mientras la operación está en curso.
    this.enviando = true;
    await this.mostrarToast('Enviando mensaje...', 'medium');

    // Extracción de los valores del formulario.
    const { nombre, correo, mensaje } = this.contactoForm.value;

    // Construcción del objeto que se persistirá en el histórico,
    // independientemente del resultado del envío.
    const registro: Mensaje = {
      id: this.mensajesService.generarId(),
      nombre,
      correo,
      mensaje,
      fechaEnvio: new Date().toISOString(),
      estado: 'enviado'
    };

    try {
      // Llamada al servicio que ejecuta el envío real vía EmailJS.
      await this.mensajesService.enviarCorreo(nombre, correo, mensaje);

      // Si el envío fue exitoso, se guarda el registro y se notifica al usuario.
      this.mensajesService.guardarEnHistorial(registro);
      this.historial = this.mensajesService.obtenerHistorial();
      await this.mostrarToast('Mensaje enviado correctamente a ' + correo, 'success');

      // El formulario se resetea para permitir un nuevo envío.
      this.contactoForm.reset();
    } catch (error) {
      // Si ocurre un fallo, se registra el intento con estado de error
      // y se informa al usuario mediante un toast de color danger.
      registro.estado = 'error';
      this.mensajesService.guardarEnHistorial(registro);
      this.historial = this.mensajesService.obtenerHistorial();
      await this.mostrarToast('Error al enviar el mensaje. Verifique su conexión.', 'danger');
    } finally {
      // Independientemente del resultado, se rehabilita el botón.
      this.enviando = false;
    }
  }

  // Borra el histórico completo de mensajes locales y refresca la vista.
  async limpiarHistorial(): Promise<void> {
    this.mensajesService.limpiarHistorial();
    this.historial = [];
    await this.mostrarToast('Histórico de mensajes eliminado.', 'medium');
  }

  // Helper privado para no repetir la creación de toasts en cada caso.
  private async mostrarToast(mensaje: string, color: string): Promise<void> {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2500,
      position: 'bottom',
      color: color
    });
    await toast.present();
  }
}
```

### 5. Reescribir `src/app/contacto/contacto.page.html`

REEMPLAZAR el contenido actual completo del archivo por este:

```html
<!-- Barra superior de la página -->
<ion-header [translucent]="true">
  <ion-toolbar>
    <ion-title>Contacto</ion-title>
  </ion-toolbar>
</ion-header>

<ion-content [fullscreen]="true">
  <ion-header collapse="condense">
    <ion-toolbar>
      <ion-title size="large">Contacto</ion-title>
    </ion-toolbar>
  </ion-header>

  <ion-grid>
    <ion-row>
      <ion-col size="12" size-md="10" offset-md="1" size-lg="8" offset-lg="2" size-xl="6" offset-xl="3">

        <!-- Tarjeta 1: Lista estática de medios de contacto -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Mis medios de contacto</ion-card-title>
          </ion-card-header>
          <ion-list>
            <ion-item *ngFor="let medio of mediosContacto">
              <ion-icon slot="start" [name]="medio.icono"></ion-icon>
              <ion-label>
                <h3>{{ medio.etiqueta }}</h3>
                <p>{{ medio.valor }}</p>
              </ion-label>
            </ion-item>
          </ion-list>
        </ion-card>

        <h2 class="ion-padding-start ion-margin-top titulo-seccion">¿Quieres escribirme?</h2>

        <!-- Tarjeta 2: Formulario reactivo de envío -->
        <ion-card>
          <ion-card-header>
            <ion-card-title>Envíame un mensaje</ion-card-title>
          </ion-card-header>

          <!-- El atributo [formGroup] vincula la etiqueta form con el FormGroup
               declarado en el componente. (ngSubmit) escucha el envío y dispara
               el método. Esta es la base de Reactive Forms. -->
          <form [formGroup]="contactoForm" (ngSubmit)="enviarMensaje()">
            <ion-list>

              <!-- Campo Nombre -->
              <ion-item>
                <ion-input
                  label="Nombre"
                  labelPlacement="floating"
                  type="text"
                  formControlName="nombre"
                  placeholder="Ingrese su nombre">
                </ion-input>
              </ion-item>

              <!-- Bloque de errores del campo Nombre.
                   Solo se muestran si el control está tocado y tiene errores activos. -->
              <div class="mensajes-error" *ngIf="nombre?.touched && nombre?.invalid">
                <ion-text color="danger" *ngIf="nombre?.errors?.['required']">
                  <small>El nombre es obligatorio.</small>
                </ion-text>
                <ion-text color="danger" *ngIf="nombre?.errors?.['minlength']">
                  <small>El nombre debe tener al menos 3 caracteres.</small>
                </ion-text>
                <ion-text color="danger" *ngIf="nombre?.errors?.['maxlength']">
                  <small>El nombre no puede exceder los 50 caracteres.</small>
                </ion-text>
              </div>

              <!-- Campo Correo -->
              <ion-item>
                <ion-input
                  label="Correo electrónico"
                  labelPlacement="floating"
                  type="email"
                  formControlName="correo"
                  placeholder="Ingrese su correo">
                </ion-input>
              </ion-item>

              <div class="mensajes-error" *ngIf="correo?.touched && correo?.invalid">
                <ion-text color="danger" *ngIf="correo?.errors?.['required']">
                  <small>El correo es obligatorio.</small>
                </ion-text>
                <ion-text color="danger" *ngIf="correo?.errors?.['email']">
                  <small>El formato del correo no es válido.</small>
                </ion-text>
              </div>

              <!-- Campo Mensaje -->
              <ion-item>
                <ion-textarea
                  label="Mensaje"
                  labelPlacement="floating"
                  formControlName="mensaje"
                  placeholder="Escriba su mensaje"
                  [autoGrow]="true"
                  rows="4">
                </ion-textarea>
              </ion-item>

              <div class="mensajes-error" *ngIf="mensaje?.touched && mensaje?.invalid">
                <ion-text color="danger" *ngIf="mensaje?.errors?.['required']">
                  <small>El mensaje es obligatorio.</small>
                </ion-text>
                <ion-text color="danger" *ngIf="mensaje?.errors?.['minlength']">
                  <small>El mensaje debe tener al menos 10 caracteres.</small>
                </ion-text>
                <ion-text color="danger" *ngIf="mensaje?.errors?.['maxlength']">
                  <small>El mensaje no puede exceder los 500 caracteres.</small>
                </ion-text>
              </div>
            </ion-list>

            <div class="ion-padding">
              <!-- El botón se deshabilita si el formulario es inválido o si hay un envío en curso.
                   Esta es la diferencia visible más clara entre Reactive Forms y la versión anterior. -->
              <ion-button
                expand="block"
                type="submit"
                [disabled]="contactoForm.invalid || enviando">
                <ion-icon name="paper-plane-outline" slot="start" *ngIf="!enviando"></ion-icon>
                <ion-spinner name="dots" *ngIf="enviando"></ion-spinner>
                <span *ngIf="!enviando">Enviar</span>
                <span *ngIf="enviando">&nbsp;Enviando...</span>
              </ion-button>
            </div>
          </form>
        </ion-card>

        <!-- Tarjeta 3: Histórico de mensajes enviados desde este dispositivo -->
        <ion-card *ngIf="historial.length > 0">
          <ion-card-header>
            <ion-card-title>Mensajes enviados</ion-card-title>
            <ion-card-subtitle>{{ historial.length }} mensaje(s) registrado(s) localmente</ion-card-subtitle>
          </ion-card-header>

          <ion-list>
            <ion-item *ngFor="let item of historial">
              <ion-icon
                slot="start"
                [name]="item.estado === 'enviado' ? 'checkmark-circle-outline' : 'alert-circle-outline'"
                [color]="item.estado === 'enviado' ? 'success' : 'danger'">
              </ion-icon>
              <ion-label>
                <h3>{{ item.nombre }} &lt;{{ item.correo }}&gt;</h3>
                <p class="mensaje-preview">{{ item.mensaje }}</p>
                <p class="fecha-envio">{{ item.fechaEnvio | date:'short' }}</p>
              </ion-label>
            </ion-item>
          </ion-list>

          <div class="ion-padding">
            <ion-button
              expand="block"
              fill="outline"
              color="medium"
              (click)="limpiarHistorial()">
              <ion-icon name="trash-outline" slot="start"></ion-icon>
              Limpiar histórico
            </ion-button>
          </div>
        </ion-card>

      </ion-col>
    </ion-row>
  </ion-grid>
</ion-content>
```

### 6. Reescribir `src/app/contacto/contacto.page.scss`

REEMPLAZAR el contenido actual (que está vacío) por este:

```scss
// Estilos específicos de la página de Contacto.
// Solo se incluyen reglas para los elementos que no son cubiertos
// adecuadamente por los componentes nativos de Ionic.

.titulo-seccion {
  font-weight: 600;
  color: var(--ion-color-medium);
}

// Contenedor de los mensajes de error de validación.
// Se posiciona justo debajo del campo correspondiente, con un margen sutil.
.mensajes-error {
  padding: 4px 16px 8px;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.mensajes-error ion-text {
  display: block;
}

// Preview del mensaje en la tarjeta de histórico.
// Limita la altura visible y agrega ellipsis si el texto excede.
.mensaje-preview {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 100%;
}

.fecha-envio {
  font-size: 0.75rem;
  color: var(--ion-color-medium);
  margin-top: 2px;
}
```

### 7. Modificar `src/app/contacto/contacto.module.ts`

Es necesario reemplazar `FormsModule` por `ReactiveFormsModule` en los imports del módulo.

REEMPLAZAR el contenido actual completo por este:

```typescript
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactoPageRoutingModule } from './contacto-routing.module';

import { ContactoPage } from './contacto.page';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonicModule,
    ContactoPageRoutingModule
  ],
  declarations: [ContactoPage]
})
export class ContactoPageModule {}
```

---

## ORDEN DE EJECUCIÓN OBLIGATORIO

Ejecuta las modificaciones en este orden exacto:

1. Instalar dependencia con `npm install @emailjs/browser`
2. Crear archivo `src/app/contacto/mensaje.model.ts`
3. Crear archivo `src/app/contacto/mensajes.service.ts`
4. Reemplazar `src/app/contacto/contacto.module.ts`
5. Reemplazar `src/app/contacto/contacto.page.ts`
6. Reemplazar `src/app/contacto/contacto.page.html`
7. Reemplazar `src/app/contacto/contacto.page.scss`

Tras completar los siete pasos, ejecuta `ionic serve` para verificar que la aplicación compila sin errores. Si hay errores de TypeScript o de plantilla, repórtalos. NO intentes corregir errores en archivos fuera de la lista de PERMITIDOS.

## VERIFICACIÓN POST-EJECUCIÓN

Confirma al usuario:
1. Lista de archivos creados (debe ser exactamente 2: `mensaje.model.ts` y `mensajes.service.ts`)
2. Lista de archivos modificados (debe ser exactamente 5: `contacto.page.ts`, `contacto.page.html`, `contacto.page.scss`, `contacto.module.ts`, `package.json`)
3. Confirmación de que `npm install @emailjs/browser` se ejecutó sin errores
4. Confirmación de que `ionic serve` compila el proyecto sin errores ni warnings críticos

NO entregues resumen de "qué cambió y por qué". El usuario ya conoce el diseño.
NO sugieras mejoras adicionales.
NO toques archivos fuera de la lista PERMITIDA aunque detectes que "podrían mejorar".