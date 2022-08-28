import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { PaisesModel } from "../../models/paises/paises.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class RolesService {

    private controller : string = 'list';

    constructor (
        private http: HttpClient
    ){

    }

    getRoles(){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "listRoles",
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
}