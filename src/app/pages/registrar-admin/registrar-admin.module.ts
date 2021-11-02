import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { RegistrarAdminRoutingModule } from "./registrar-admin.routing";


@NgModule({
    declarations : [
    ],
    imports : [
        CommonModule,
        FormsModule,
        HttpClientModule,
        RegistrarAdminRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class RegistrarAdminModule {
    static forRoot(): ModuleWithProviders<any>{
        return{
            ngModule : RegistrarAdminModule
        }
    }
}