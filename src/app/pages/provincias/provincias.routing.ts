import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProvinciasComponent } from './provincias.component';
import { SearchComponent } from '../search/search.component';
import { InitComponent } from '../init/init.component'


const routes: Routes = [
    { path : '', component : ProvinciasComponent, 
      children : [
        { path : '', component : InitComponent },
      ]}
  ];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinciasRoutingModule { }