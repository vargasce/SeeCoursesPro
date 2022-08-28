import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { LocalidadesComponent } from './localidades.component'; 
import { InitComponent } from '../init/init.component'
import {  AbmLocalidadesComponent} from 'src/app/components/abm-localidades/abm-localidades.component';


const routes: Routes = [
    { path : '', component : LocalidadesComponent, 
      children : [
        { path : '', component : AbmLocalidadesComponent },
      ]}
  ];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocalidadesRoutingModule { }