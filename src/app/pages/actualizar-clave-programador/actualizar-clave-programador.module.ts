import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ActualizarClaveProgramadorRoutingModule } from "./actualizar-clave-programador.routing";


@NgModule({
    declarations : [
    ],
    imports : [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ActualizarClaveProgramadorRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ActualizarClaveProgramadorModule {
    static forRoot(): ModuleWithProviders<any>{
        return{
            ngModule : ActualizarClaveProgramadorModule
        }
    }
}