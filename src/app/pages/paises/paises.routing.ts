import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaisesComponent } from './paises.component';
import { InitComponent } from '../init/init.component'
import { AgregarPaisesComponent } from 'src/app/components/agregar-paises/agregar-paises.component';
import { AbmPaisesComponent } from 'src/app/components/abm-paises/abm-paises.component';


const routes: Routes = [
    { path : '', component : PaisesComponent, 
      children : [
        { path : '', component : AbmPaisesComponent },
      ]}
  ];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }