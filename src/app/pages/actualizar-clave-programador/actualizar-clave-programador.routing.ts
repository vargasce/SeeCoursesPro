import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { InitComponent } from '../init/init.component'
import { AgregarPaisesComponent } from 'src/app/components/agregar-paises/agregar-paises.component';
import { AbmPaisesComponent } from 'src/app/components/abm-paises/abm-paises.component';
import { ActualizarClaveProgramadorComponent } from './actualizar-clave-programador.component';


const routes: Routes = [
    { path : '', component : ActualizarClaveProgramadorComponent}
  ];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ActualizarClaveProgramadorRoutingModule { }