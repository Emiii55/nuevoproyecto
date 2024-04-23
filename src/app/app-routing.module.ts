import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './principal/principal.component';

const routes: Routes = [
  {
    path:"principal",component:PrincipalComponent
    
  },
  //carga perezosa
  //ruta que nos vincula al módulo de inicio y todo su contenido
  //loadChildren: nos indica que habrá una ruta hija
  //.then: función asincronica tipo PROMESA
  {
    path:"",loadChildren:()=>import('./modules/inicio/inicio.module').then(m=>m.InicioModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { } 
