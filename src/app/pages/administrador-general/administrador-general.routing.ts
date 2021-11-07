import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdministradorGeneralComponent } from './administrador-general.component';
import { SearchComponent } from '../search/search.component';
import { InitComponent } from '../init/init.component'


const routes: Routes = [
    { path : '', component : AdministradorGeneralComponent, 
      children : [
        { path : '', component : InitComponent },
      ]}
  ];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorGeneralRoutingModule { }