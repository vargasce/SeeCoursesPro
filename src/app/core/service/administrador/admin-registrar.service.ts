import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { EntidadModel } from "../../models/entidad/entidad.model";
import { UsuarioModel } from "../../models/usuario/usuario.model";
import { AdministradorModel } from "../../models/administrador/administrador.model";
import { Usuario_AdminModel } from "../../models/usuario_admin/usuario_admin.model";
@Injectable({
    providedIn: 'root'
})
export class RegistrarAdminService {

    private controller : string = 'administrador';

    constructor (
        private http: HttpClient
    ){

    }

    registrarAdmin_userAdmin(admin:AdministradorModel, userAdmin:Usuario_AdminModel){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "addAdministrador",
            'data'   : {
                'administrador':admin,
                'usuario':userAdmin,
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }


    

}