// Modelo que define la estructura de un mensaje enviado desde el formulario de contacto.
// Se utiliza tanto para el envío vía EmailJS como para el almacenamiento local.

export interface Mensaje {
  id: string;              // Identificador único generado en el envío
  nombre: string;          // Nombre del remitente (campo del formulario)
  correo: string;          // Correo del remitente y destinatario del envío
  mensaje: string;         // Cuerpo del mensaje
  fechaEnvio: string;      // Fecha y hora del envío en formato ISO
  estado: 'enviado' | 'error';  // Resultado del intento de envío
}
