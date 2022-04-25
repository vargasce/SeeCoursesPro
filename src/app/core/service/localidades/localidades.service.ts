import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { ProvinciasModel } from "../../models/provincias/provincias.model";

@Injectable({
    providedIn: 'root'
})
export class LocalidadesService {

    private controller : string = 'localidad';

    constructor (
        private http: HttpClient
    ){

    }

    getLocalidadesByIdProvincia(id:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "list-localidadesById",
            'data'   : {
                'id_provincia': id
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

   
    getLocalidadById(id:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "get-provinciaById",
            'data' : {
                'id' : id
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    
}
