import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EntidadComponent } from './entidad.component'; 
//import { InitComponent } from '../init/init.component';
//import { AgregarCursoComponent } from 'src/app/components/agregar-curso/agregar-curso.component';
import { AddCursoComponent } from '../add-curso/add-curso.component';
import { ListarCursosComponent } from '../../components/listar-cursos/listar-cursos.component';


const routes: Routes = [
  { path : '', component : EntidadComponent, 
    children : [
      { path : 'listarCursos', component : ListarCursosComponent },
      { path : 'agregarCurso', component : AddCursoComponent },
    ]}
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadRoutingModule { }
