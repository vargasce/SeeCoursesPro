import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { UsuarioModel } from "../../models/usuario/usuario.model";
import { Usuario_AdminModel } from "../../models/usuario_admin/usuario_admin.model";
import { Observable } from "rxjs";

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

    registrarUsuarioAdmin(usuario:Usuario_AdminModel){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "addUsuarioAdmin",
            'data'   : usuario
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    verifyUser(username : string): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "verifyUser",
            'name' : username
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
}