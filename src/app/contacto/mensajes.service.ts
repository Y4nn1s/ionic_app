import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser';
import { Mensaje } from './mensaje.model';

// Servicio que centraliza la lógica de envío de correos mediante EmailJS
// y la persistencia del histórico de mensajes en localStorage.

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  // Claves de configuración de EmailJS.
  private readonly SERVICE_ID = 'service_abokv1l';
  private readonly TEMPLATE_ID = 'template_m9nknru';
  private readonly PUBLIC_KEY = 'r0DqgsBTseaEhsT51';

  // Clave bajo la cual se guarda el histórico de mensajes en localStorage
  private readonly STORAGE_KEY = 'ionic_app_mensajes_enviados';

  constructor() {}

  // Dispara el envío real del correo mediante el SDK de EmailJS.
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

  // Guarda un mensaje en el histórico local.
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
  limpiarHistorial(): void {
    localStorage.removeItem(this.STORAGE_KEY);
  }

  // Genera un identificador único basado en el timestamp actual y un componente aleatorio.
  generarId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substring(2, 8);
  }
}
