import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { EntidadModel } from "../../models/entidad/entidad.model";
import { UsuarioModel } from "../../models/usuario/usuario.model";
@Injectable({
    providedIn: 'root'
})
export class RegistrarEntidadService {

    private controller : string = 'entidad';

    constructor (
        private http: HttpClient
    ){

    }

    registrarEntidad(entidad:EntidadModel){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "addEntidad",
            'token'  : localStorage.getItem('token'),  
            'data'   : entidad
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    validarCuitUnique( cuit : string ){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "verifyCuit",
            'cuit'   : cuit
        }

        return this.http.post<any>( environment.apiURL + this.controller, send, headers  );
    }

    getNombres(){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "getEntidadSelect",
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    

}