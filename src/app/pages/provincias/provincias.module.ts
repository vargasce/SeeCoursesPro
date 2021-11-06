import { NgModule, ModuleWithProviders, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { ProvinciasRoutingModule } from "./provincias.routing";


@NgModule({
    declarations : [
    ],
    imports : [
        CommonModule,
        FormsModule,
        HttpClientModule,
        ProvinciasRoutingModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    schemas : [ CUSTOM_ELEMENTS_SCHEMA ]
})

export class ProvinciasModule {
    static forRoot(): ModuleWithProviders<any>{
        return{
            ngModule : ProvinciasModule
        }
    }
}