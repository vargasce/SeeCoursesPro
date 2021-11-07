import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TarjetasComponent } from './tarjetas/tarjetas.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { NavbarAdminComponent } from './navbar-admin/navbar-admin.component';
import {MatIconModule} from '@angular/material/icon';
import {MatBadgeModule} from '@angular/material/badge';
import { LoginComponentComponent } from './login-component/login-component.component';
import { LoginSelectorComponent } from './login-selector/login-selector.component';
import { NavbarEntidadComponent } from './navbar-entidad/navbar-entidad.component';
import { AgregarCursoComponent } from './agregar-curso/agregar-curso.component';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { RegisterEntidadComponent } from './register-entidad/register-entidad.component';
import { ImgTestComponent } from './img-test/img-test.component';
import { AbmPaisesComponent } from './abm-paises/abm-paises.component';
import { AbmProvinciasComponent } from './abm-provincias/abm-provincias.component';
import { NavbarAdminGeneralComponent } from './navbar-admin-general/navbar-admin-general.component';



@NgModule({
    declarations : [
        NavbarComponent,
        TarjetasComponent,
        BuscadorComponent,
        NavbarAdminComponent,
        LoginComponentComponent,
        LoginSelectorComponent,
        NavbarEntidadComponent,
        AgregarCursoComponent,
        ListarCursosComponent,
        RegisterAdminComponent,
        RegisterEntidadComponent,
        ImgTestComponent,
        AbmPaisesComponent,
        AbmProvinciasComponent,
        NavbarAdminGeneralComponent,
        

       
    ],
    imports : [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatIconModule,
        MatBadgeModule,
    ],
    exports : [
        NavbarComponent,
        TarjetasComponent,
        BuscadorComponent,
        NavbarAdminComponent,
        NavbarEntidadComponent,
        LoginComponentComponent,
        LoginSelectorComponent,
        AgregarCursoComponent,
        RegisterAdminComponent,
        RegisterEntidadComponent,
        ImgTestComponent,
        AbmPaisesComponent,
        AbmProvinciasComponent,
        NavbarAdminGeneralComponent

    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ComponentsModule {
    static forRoot() : ModuleWithProviders<any>{
        return{
            ngModule : ComponentsModule
        }
    }
}
