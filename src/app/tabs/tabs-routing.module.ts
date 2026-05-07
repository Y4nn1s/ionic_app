
// El rol de este archivo es configurar las rutas hijas del componente pestañas

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

// Se define una constante de tipo 'Routes'.
// Angular utilizará esto como una especie de mapa siempre que el usuario se intente mover por la aplicación
const routes: Routes = [
  {
    path: 'tabs', // Es la ruta padre e indica que las secciones (inicio, informacion personal y contacto) estarán bajo la dirección base /tabs/
    
    // Se le indica que el "esqueleto" visual que debe cargar es el componente 'TabsPage'
    component: TabsPage,

    // Comienza la definición de las rutas hijas.
    // Esto posibilita que la navbar quede fija aunque se navegue las otras vistas (inicio, información personal, contacto)
    children: [
      {
        path: 'inicio', // Ruta hija inicio

        // Con 'loadChildren' se aplica un patrón de diseño que se llama "Lazy Loading".
        // Se evita la lentitud cargando toda la aplicación de golpe
        // haciendo que Angular descargue solo el código del modulo 'inicio' cuando el usuario entre en esa ruta
        loadChildren: () => import('../inicio/inicio.module').then(m => m.InicioPageModule)
      },
      {
        path: 'informacion-personal', // Ruta hija información personal
        loadChildren: () => import('../informacion-personal/informacion-personal.module').then(m => m.InformacionPersonalPageModule)
      },
      {
        path: 'contacto', // Ruta hija contacto
        loadChildren: () => import('../contacto/contacto.module').then(m => m.ContactoPageModule)
      },
      {
        // Regla de redirección interna:
        // Se encarga de redirigir al usuario a inicio si llega a entrar a '/tabs' sin especificar pestaña
        path: '',
        redirectTo: '/tabs/inicio',

        // Este parámetro exige que la url esté totalmente vacía después de '/tabs' para que se cumpla el redireccionamiento
        pathMatch: 'full'
      }
    ]
  },
  {

    // Regla de redirección externa o global para el manejo de errores
    // Cuando el usuario abre la aplicación en ("/") redirige de inmediato a la ruta "inicio".
    // Así se evitan pantallas en blanco o errores 404.
    path: '',
    redirectTo: '/tabs/inicio',
    pathMatch: 'full'
  }
];

@NgModule({

  // Usando 'forChild', las rutas hijas se registran dentro del módulo principal.
  // Aquí Angular sabrá que estas rutas pertenecen al componente "TabsPage"
  imports: [RouterModule.forChild(routes)],
})
export class TabsPageRoutingModule {}
