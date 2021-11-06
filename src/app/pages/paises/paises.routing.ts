import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PaisesComponent } from './paises.component';
import { InitComponent } from '../init/init.component'


const routes: Routes = [
    { path : '', component : PaisesComponent, 
      children : [
        { path : '', component : InitComponent },
      ]}
  ];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaisesRoutingModule { }