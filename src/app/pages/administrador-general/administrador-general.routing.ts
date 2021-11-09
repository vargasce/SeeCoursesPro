import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdministradorGeneralComponent } from './administrador-general.component';
import { InitComponent } from '../init/init.component'
import { ProvinciasComponent } from '../provincias/provincias.component';
import { AdministradorComponent } from '../administrador/administrador.component';
import { AgregarPaisesComponent } from 'src/app/components/agregar-paises/agregar-paises.component';
import { PaisesComponent } from '../paises/paises.component';
import { AgregarProvinciasComponent } from 'src/app/components/agregar-provincias/agregar-provincias.component';


const routes: Routes = [
    { path : '', component : AdministradorGeneralComponent, 
      children : [
        { path : '', component : AdministradorComponent },
        { path : 'paises', component: PaisesComponent },
        { path : 'provincias', component: ProvinciasComponent },
        { path : 'agregarPaises', component : AgregarPaisesComponent },
        { path : 'paises/editarPaises/:id', component : AgregarPaisesComponent },
        { path : 'agregarProvincias', component : AgregarProvinciasComponent },
        { path : 'provincias/editarProvincias/:id', component : AgregarProvinciasComponent },

      ]}
  ];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorGeneralRoutingModule { }