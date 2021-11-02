import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { EntidadModel } from "../../models/entidad/entidad.model";
import { UsuarioModel } from "../../models/usuario/usuario.model";
@Injectable({
    providedIn: 'root'
})
export class RegistrarAdminService {

    private controller : string = 'administrador';

    constructor (
        private http: HttpClient
    ){

    }

    registrarAdmin(entidad:EntidadModel){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "addAdministrador",
            'data'   : entidad
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }


    

}