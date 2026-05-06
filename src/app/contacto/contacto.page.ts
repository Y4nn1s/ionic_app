import { Component } from '@angular/core';
// TODO: comentar
import { ToastController } from '@ionic/angular';

// TODO: comentar
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

  // TODO: comentar
  mediosContacto: MedioContacto[] = [
    { etiqueta: 'Correo electrónico', valor: 'y.itur1m@gmail.com', icono: 'mail-outline' },
    { etiqueta: 'Teléfono', valor: 'Disponible bajo solicitud', icono: 'call-outline' },
    { etiqueta: 'GitHub', valor: 'Y4nn1s', icono: 'logo-github' },
    { etiqueta: 'Ubicación', valor: 'Caracas, Parroquia San Agustín, Venezuela', icono: 'location-outline' }
  ];

  // TODO: comentar
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';

  // TODO: comentar
  constructor(private toastController: ToastController) {}

  // TODO: comentar
  async enviarMensaje() {
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

    const toast = await this.toastController.create({
      message: 'Mensaje enviado correctamente',
      duration: 2500,
      position: 'bottom',
      color: 'success'
    });
    await toast.present();

    this.nombre = '';
    this.correo = '';
    this.mensaje = '';
  }

}
