import { Component } from '@angular/core';

// Define la estructura o el orden que debe tener la lista de datos personales.
// En este caso, una etiqueta, un valor y un ícono. Todo como dato tipo "cadena de texto"
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

  // Se introducen los datos de acuerdo al tipo de dato correspondiente junto con su ícono
  datosPersonales: DatoPersonal[] = [
    { etiqueta: 'Nombre completo', valor: 'Yannis Iturriago Martínez', icono: 'person-outline' },
    { etiqueta: 'Cédula', valor: 'V29797308', icono: 'card-outline' },
    { etiqueta: 'Carrera', valor: 'PNF en Informática', icono: 'school-outline' },
    { etiqueta: 'Semestre', valor: 'Sexto', icono: 'calendar-outline' },
    { etiqueta: 'Universidad', valor: 'Universidad Nacional Experimental en Telecomunicaciones e Informática (UNETI)', icono: 'business-outline' }
  ];

  constructor() {}

}
