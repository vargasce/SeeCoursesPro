import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdministradorComponent } from './administrador.component';
import { InitComponent } from '../init/init.component';


const routes: Routes = [
  { path : '', component : AdministradorComponent, 
    children : [
      { path : '', component : InitComponent },
     //{ path : 'Solicitudes', component : HomeComponent },
      //{ path : 'Entidades', component : SearchComponent }
    ]}
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorRoutingModule { }
