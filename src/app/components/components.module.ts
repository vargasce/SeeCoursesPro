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
import { AgregarPaisesComponent } from './agregar-paises/agregar-paises.component';
import { AgregarProvinciasComponent } from './agregar-provincias/agregar-provincias.component';
import { DialogoConfirmacionComponent } from './dialogo-confirmacion/dialogo-confirmacion.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DialogoFechasComponent } from './dialogo-fechas/dialogo-fechas.component';
import { AbmActividadesComponent } from './abm-actividades/abm-actividades.component';
import { AgregarActividadesComponent } from './agregar-actividades/agregar-actividades.component';
import { FiltrosComponent } from './filtros/filtros.component';
import { ActualizarClaveComponent } from './actualizar-clave/actualizar-clave.component';
import { ImagenesPorDefectoComponent } from './imagenes-por-defecto/imagenes-por-defecto.component';
import { DeleteCursosComponent } from './delete-cursos/delete-cursos.component';
import { ChangeEmailComponent } from './change-email/change-email.component';
import { AgregarImagenesComponent } from './agregar-imagenes/agregar-imagenes.component';
import { DialogEliminarCursoComponent } from './dialog-eliminar-curso/dialog-eliminar-curso.component';
import { ListarEntidadesComponent } from './listar-entidades/listar-entidades.component';



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
        AgregarPaisesComponent,
        AgregarProvinciasComponent,
        DialogoConfirmacionComponent,
        DialogoFechasComponent,
        AbmActividadesComponent,
        AgregarActividadesComponent,
        FiltrosComponent,
        ActualizarClaveComponent,
        ImagenesPorDefectoComponent,
        DeleteCursosComponent,
        ChangeEmailComponent,
        AgregarImagenesComponent,
        DialogEliminarCursoComponent,
        ListarEntidadesComponent,
        

       
    ],
    imports : [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        MatIconModule,
        MatBadgeModule,
        MatDialogModule,
        MatButtonModule,
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
        NavbarAdminGeneralComponent,
        AgregarPaisesComponent,
        AgregarProvinciasComponent,
        DialogoConfirmacionComponent,
        AbmActividadesComponent,
        AgregarActividadesComponent,
        FiltrosComponent,
        ActualizarClaveComponent,
        ImagenesPorDefectoComponent,
        ChangeEmailComponent,
        ListarEntidadesComponent,
        DeleteCursosComponent

    ],
    entryComponents: [
        DialogoConfirmacionComponent// <--- Aquí
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
