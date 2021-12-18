import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdministradorGeneralComponent } from './administrador-general.component';
import { InitComponent } from '../init/init.component'
import { ProvinciasComponent } from '../provincias/provincias.component';
import { AdministradorComponent } from '../administrador/administrador.component';
import { AgregarPaisesComponent } from 'src/app/components/agregar-paises/agregar-paises.component';
import { PaisesComponent } from '../paises/paises.component';
import { AgregarProvinciasComponent } from 'src/app/components/agregar-provincias/agregar-provincias.component';
import { ActividadesComponent } from '../actividades/actividades.component';
import { AgregarActividadesComponent } from 'src/app/components/agregar-actividades/agregar-actividades.component';
import { ActualizarClaveProgramadorComponent } from '../actualizar-clave-programador/actualizar-clave-programador.component';
import { ImagenesComponent } from '../imagenes/imagenes.component';
import { EmailComponent } from '../email/email.component';
import { EliminarCursosComponent } from '../eliminar-cursos/eliminar-cursos.component';
import { AgregarImagenesComponent } from 'src/app/components/agregar-imagenes/agregar-imagenes.component';



const routes: Routes = [
    { path : '', component : AdministradorGeneralComponent, 
      children : [
        { path : '', component : AdministradorComponent },
        { path : 'paises', component: PaisesComponent },
        { path : 'provincias', component: ProvinciasComponent },
        { path : 'actividades', component: ActividadesComponent },
        { path : 'agregarPaises', component : AgregarPaisesComponent },
        { path : 'paises/editarPaises/:id', component : AgregarPaisesComponent },
        { path : 'agregarProvincias', component : AgregarProvinciasComponent },
        { path : 'provincias/editarProvincias/:id', component : AgregarProvinciasComponent },
        { path : 'agregarActividades', component : AgregarActividadesComponent },
        { path : 'actividades/editarActividades/:id', component : AgregarActividadesComponent },
        { path : 'programadorActualizarClave', component : ActualizarClaveProgramadorComponent },
        { path : 'imagenes', component : ImagenesComponent },
        { path : 'email', component : EmailComponent },
        { path : 'eliminarCurso', component : EliminarCursosComponent },
        { path : 'agregarImagenes', component : AgregarImagenesComponent },
        { path : 'imagenes/editarImagenes/:id', component : AgregarImagenesComponent },

      ]}
  ];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdministradorGeneralRoutingModule { }