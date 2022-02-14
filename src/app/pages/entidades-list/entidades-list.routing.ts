import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { EntidadesListComponent } from './entidades-list.component';



const routes: Routes = [
    { path : '', component : EntidadesListComponent}
  ];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EntidadesListRoutingModule { }