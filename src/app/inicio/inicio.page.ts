import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  standalone: false,
})
export class InicioPage {

  // Como añadido, quise implementar esta función para demostrar que el controlador se comunica con la interfaz.
  // Al declarar la variable "fechaActual" y el dato dinámico, captura el momento exacto
  // en el que el usuario entra a la pantalla de inicio
  fechaActual: Date = new Date();

  constructor() {}

}
