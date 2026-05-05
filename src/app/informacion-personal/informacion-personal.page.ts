import { Component } from '@angular/core';

// TODO: comentar
interface DatoPersonal {
  etiqueta: string;
  valor: string;
  icono: string;
}

@Component({
  selector: 'app-informacion-personal',
  templateUrl: 'informacion-personal.page.html',
  styleUrls: ['informacion-personal.page.scss'],
  standalone: false,
})
export class InformacionPersonalPage {

  // TODO: comentar
  datosPersonales: DatoPersonal[] = [
    { etiqueta: 'Nombre completo', valor: 'Yannis Iturriago Martínez', icono: 'person-outline' },
    { etiqueta: 'Cédula', valor: 'V29797308', icono: 'card-outline' },
    { etiqueta: 'Carrera', valor: 'PNF en Informática', icono: 'school-outline' },
    { etiqueta: 'Semestre', valor: 'Sexto', icono: 'calendar-outline' },
    { etiqueta: 'Universidad', valor: 'Universidad Nacional Experimental en Telecomunicaciones e Informática (UNETI)', icono: 'business-outline' }
  ];

  constructor() {}

}
