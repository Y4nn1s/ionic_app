import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: 'inicio.page.html',
  styleUrls: ['inicio.page.scss'],
  standalone: false,
})
export class InicioPage {

  // TODO: comentar
  nombreEstudiante: string = 'Yannis Iturriago Martínez';

  // TODO: comentar
  fechaActual: Date = new Date();

  constructor() {}

}
