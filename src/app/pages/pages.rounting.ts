import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CanActivateAdmin } from '../core/guard/guardAdmin';
//import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path : '', loadChildren : () => import('./home/home.module').then( seec => seec.HomeModule ) },
  { path : 'home', loadChildren : () => import('./home/home.module').then( seec => seec.HomeModule ) },
  { path : 'admin', loadChildren : () => import('./administrador/administrador.module').then( reference => reference.AdministradorModule ), canActivate : [CanActivateAdmin] },
  { path : 'entidad', loadChildren : () => import('./entidad/entidad.module').then( reference => reference.EntidadModule), canActivate : [ CanActivateAdmin ]},
  { path : 'login', loadChildren : () => import('./seleccion-de-login/seleccion-de-login.module').then( reference => reference.SleccionDeLoginModule)},
  { path : 'registrarEntidad', loadChildren : () => import('./registrar-entidad/registrar-entidad.module').then( reference => reference.RegistrarEntidadModule)},
  { path : 'registrarAdmin', loadChildren : () => import('./registrar-admin/registrar-admin.module').then( reference => reference.RegistrarAdminModule), canActivate : [ CanActivateAdmin ]},
  { path : 'programadorActualizarClave', loadChildren : () => import('./actualizar-clave-programador/actualizar-clave-programador.module').then( reference => reference.ActualizarClaveProgramadorModule)},
  { path : 'adminGeneral', loadChildren : () => import('./administrador-general/administrador-general.module').then( reference => reference.AdministradorGeneralModule), canActivate : [ CanActivateAdmin ]}
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
