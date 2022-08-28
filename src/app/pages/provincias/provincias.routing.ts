import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ProvinciasComponent } from './provincias.component';
import { SearchComponent } from '../search/search.component';
import { InitComponent } from '../init/init.component'
import { AgregarProvinciasComponent } from 'src/app/components/agregar-provincias/agregar-provincias.component';
import { AbmProvinciasComponent } from 'src/app/components/abm-provincias/abm-provincias.component';


const routes: Routes = [
    { path : '', component : ProvinciasComponent, 
      children : [
        { path : '', component : AbmProvinciasComponent },
      ]}
  ];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProvinciasRoutingModule { }