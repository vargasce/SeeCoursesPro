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
import { PaisesComponent } from './paises/paises.component';
import { ProvinciasComponent } from './provincias/provincias.component';
import { AdministradorGeneralComponent } from './administrador-general/administrador-general.component';
import { AddPaisesComponent } from './add-paises/add-paises.component';
import { AddProvinciasComponent } from './add-provincias/add-provincias.component';
//import { ComponentsModule } from '../components/components.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { DialogoConfirmacionComponent } from "../components/dialogo-confirmacion/dialogo-confirmacion.component";
import { AddActividadesComponent } from './add-actividades/add-actividades.component';
import { ActividadesComponent } from './actividades/actividades.component';
import { ActualizarClaveProgramadorComponent } from './actualizar-clave-programador/actualizar-clave-programador.component';
import { ImagenesComponent } from './imagenes/imagenes.component';
import { EmailComponent } from './email/email.component';
import { EliminarCursosComponent } from './eliminar-cursos/eliminar-cursos.component';
import { AddImagenComponent } from './add-imagen/add-imagen.component';
import { EntidadesListComponent } from './entidades-list/entidades-list.component';
import { LocalidadesComponent } from './localidades/localidades.component';


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
        PaisesComponent,
        ProvinciasComponent,
        AdministradorGeneralComponent,
        AddPaisesComponent,
        AddProvinciasComponent,
        AddActividadesComponent,
        ActividadesComponent,
        ActualizarClaveProgramadorComponent,
        ImagenesComponent,
        EmailComponent,
        EliminarCursosComponent,
        AddImagenComponent,
        EntidadesListComponent,
        LocalidadesComponent,


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
