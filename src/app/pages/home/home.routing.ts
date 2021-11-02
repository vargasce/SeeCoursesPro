import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { SearchComponent } from '../search/search.component';
import { InitComponent } from '../init/init.component'

const routes: Routes = [
  { path : '', component : HomeComponent, 
    children : [
      { path : '', component : InitComponent },
      { path : 'list', component : HomeComponent },
      { path : 'search', component : SearchComponent }
    ]}
];
 
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
