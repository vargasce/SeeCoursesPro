import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { AdministradorGeneralRoutingModule } from "./administrador-general.routing";


@NgModule({
    declarations : [
    ],
    imports : [
        CommonModule,
        FormsModule,
        HttpClientModule,
        AdministradorGeneralRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class AdministradorGeneralModule {
    static forRoot(): ModuleWithProviders<any>{
        return{
            ngModule : AdministradorGeneralModule
        }
    }
}