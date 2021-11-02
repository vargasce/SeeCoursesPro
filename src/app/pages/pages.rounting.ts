import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
//import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path : 'home', loadChildren : () => import('./home/home.module').then( seec => seec.HomeModule ) },
  { path : 'admin', loadChildren : () => import('./administrador/administrador.module').then( reference => reference.AdministradorModule ) },
  { path : 'entidad', loadChildren : () => import('./entidad/entidad.module').then( reference => reference.EntidadModule)},
  { path : 'login', loadChildren : () => import('./seleccion-de-login/seleccion-de-login.module').then( reference => reference.SleccionDeLoginModule)},
  { path : 'registrarEntidad', loadChildren : () => import('./registrar-entidad/registrar-entidad.module').then( reference => reference.RegistrarEntidadModule)},
  { path : 'registrarAdmin', loadChildren : () => import('./registrar-admin/registrar-admin.module').then( reference => reference.RegistrarAdminModule)}
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
