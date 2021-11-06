import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { PaisesRoutingModule } from "./paises.routing";


@NgModule({
    declarations : [
    ],
    imports : [
        CommonModule,
        FormsModule,
        HttpClientModule,
        PaisesRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class PaisesModule {
    static forRoot(): ModuleWithProviders<any>{
        return{
            ngModule : PaisesModule
        }
    }
}