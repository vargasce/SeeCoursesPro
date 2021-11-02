import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { SeleccionDeLoginComponent } from './seleccion-de-login.component';
import { SearchComponent } from '../search/search.component';
import { InitComponent } from '../init/init.component'


const routes: Routes = [
    { path : '', component : SeleccionDeLoginComponent, 
      children : [
        { path : '', component : InitComponent },
      ]}
  ];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeleccionDeLoginRoutingModule { }
