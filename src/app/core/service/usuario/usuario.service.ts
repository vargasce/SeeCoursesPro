import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { UsuarioModel } from "../../models/usuario/usuario.model";

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {

    private controller : string = 'usuario';

    constructor (
        private http: HttpClient
    ){

    }


    registrarUsuario(usuario:UsuarioModel){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "addUsuario",
            'data'   : usuario
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
}