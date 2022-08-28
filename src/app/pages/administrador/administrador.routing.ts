import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdministradorComponent } from './administrador.component';
import { InitComponent } from '../init/init.component';


const routes: Routes = [
  { path : '', component : AdministradorComponent }
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
