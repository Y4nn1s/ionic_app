import { Component } from '@angular/core';
// TODO: comentar
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-contacto',
  templateUrl: 'contacto.page.html',
  styleUrls: ['contacto.page.scss'],
  standalone: false,
})
export class ContactoPage {

  // TODO: comentar
  nombre: string = '';
  correo: string = '';
  mensaje: string = '';

  // TODO: comentar
  constructor(private toastController: ToastController) {}

  // TODO: comentar
  async enviarFormulario() {
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
