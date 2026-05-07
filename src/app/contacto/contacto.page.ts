import { Component } from '@angular/core';

// Importa la herramienta que permite generar mensajes flotantes en pantalla llamados "toasts"
import { ToastController } from '@ionic/angular';

// Se define la estructura que tiene cada medio de contacto: una etiqueta, un valor y un ícono (todo en string)
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
export class ContactoPage {

  // Muestra la lista con mis medios de contacto en el orden establecido: correo, teléfono, github y ubicacion
  mediosContacto: MedioContacto[] = [
    { etiqueta: 'Correo electrónico', valor: 'y.itur1m@gmail.com', icono: 'mail-outline' },
    { etiqueta: 'Teléfono', valor: 'Disponible bajo solicitud', icono: 'call-outline' },
    { etiqueta: 'GitHub', valor: 'Y4nn1s', icono: 'logo-github' },
    { etiqueta: 'Ubicación', valor: 'Caracas, Parroquia San Agustín, Venezuela', icono: 'location-outline' }
  ];

  // Variables que guardarán el input del usuario (por defecto están vacías)
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';

  // El constructor es el que recibe el ToastController para así exponer los mensajes flotantes desde esta misma página
  constructor(private toastController: ToastController) {}

  // Una función que se activa al presionar el botón "Enviar"
  async enviarMensaje() {

    // Si faltara llenar algún campo o no hay ningún input en los campos de texto,
    // se muestra un "toast" de advertencia que detiene la función
    if (!this.nombre || !this.correo || !this.mensaje) {
      const toast = await this.toastController.create({
        message: 'Por favor, complete todos los campos antes de enviar.',
        duration: 2500,
        position: 'bottom',
        color: 'warning'
      });
      await toast.present();
      return;
    }

    // Si todos los campos están completos, se muestra un "toast" de éxito.
    // Nota: Esto es solo una simulación. Realmente no envía nada a ningún lado, solo es práctica con el framework
    const toast = await this.toastController.create({
      message: 'Mensaje enviado correctamente',
      duration: 2500,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();

    // Permite automáticamente que se limpien los campos y queden vacíos después de enviar.
    this.nombre = '';
    this.correo = '';
    this.mensaje = '';
  }

}
