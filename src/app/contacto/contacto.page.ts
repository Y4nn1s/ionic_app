import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from '@ionic/angular';
import { MensajesService } from './mensajes.service';
import { Mensaje } from './mensaje.model';

// Estructura de medios de contacto mostrados en la lista superior de la página.
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

  // Se utiliza para deshabilitar el botón y prevenir envíos duplicados.
  enviando: boolean = false;

  // Histórico de mensajes enviados desde este dispositivo.
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

  // Recupera el histórico de mensajes previamente enviados desde localStorage.
  ngOnInit(): void {
    this.historial = this.mensajesService.obtenerHistorial();
  }

  // Accede a cada control desde la plantilla sin tener que escribir contactoForm.get('campo') repetidamente.
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

    // Construcción del objeto que se persistirá en el histórico, independientemente del resultado del envío.
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

      // Si ocurre un fallo, se registra el intento con estado de error y se informa al usuario mediante un toast de color danger.
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

  // Helper privado para evitar repetir la creación de toasts en cada caso.
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
