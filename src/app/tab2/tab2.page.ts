import { Component } from '@angular/core';

// TODO: comentar
interface DatoPersonal {
  etiqueta: string;
  valor: string;
  icono: string;
}

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page {

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
