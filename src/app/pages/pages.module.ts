import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { PagesRoutingModule } from './pages.rounting';
import { ComponentsModule } from "../components/components.module";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from './search/search.component';
import { AdministradorComponent } from "./administrador/administrador.component";
import { InitComponent } from './init/init.component';
import { EntidadComponent } from "./entidad/entidad.component";
import { LoginComponent } from './login/login.component';
import { SeleccionDeLoginComponent } from './seleccion-de-login/seleccion-de-login.component';
import { AddCursoComponent } from './add-curso/add-curso.component';
import { RegistrarEntidadComponent } from './registrar-entidad/registrar-entidad.component';
import { RegistrarAdminComponent } from './registrar-admin/registrar-admin.component';
//import { ComponentsModule } from '../components/components.module';

//IMPORTS YOUR PAGES MAIN FOR SYSTEM 
@NgModule({
    declarations : [
        HomeComponent,
        SearchComponent,
        AdministradorComponent,
        InitComponent,
        EntidadComponent,
        LoginComponent,
        SeleccionDeLoginComponent,
        AddCursoComponent,
        RegistrarEntidadComponent,
        RegistrarAdminComponent,

    ],
    imports : [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PagesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        ComponentsModule,
        ComponentsModule.forRoot()
    ],
    schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class PagesModule {
    static forRoot(): ModuleWithProviders<any>{
        return{
            ngModule : PagesModule
        }
    }
}
