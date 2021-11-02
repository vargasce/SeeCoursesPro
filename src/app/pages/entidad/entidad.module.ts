import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { EntidadRoutingModule } from "./entidad.routing";


@NgModule({
    declarations : [
        
    ],
    imports : [
        CommonModule,
        FormsModule,
        HttpClientModule,
        EntidadRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class EntidadModule {
    static forRoot(): ModuleWithProviders<any>{
        return{
            ngModule : EntidadModule
        }
    }
}