import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false,
})
export class Tab1Page {

  // TODO: comentar
  nombreEstudiante: string = 'Yannis Iturriago Martínez';

  // TODO: comentar
  fechaActual: Date = new Date();

  constructor() {}

}
