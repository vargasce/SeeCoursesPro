import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { ProvinciasModel } from "../../models/provincias/provincias.model";

@Injectable({
    providedIn: 'root'
})
export class ProvinciasService {

    private controller : string = 'provincia';

    constructor (
        private http: HttpClient
    ){

    }

    getProvinciasByIdPais(id:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "list-provinciasById",
            'data'   : {
                'id_pais': id
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    getProvincias(){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "list-provincias",
            'data' : {
                'id_pais' : 1
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    getProvinciaById(id:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "get-provinciaById",
            'data' : {
                'id' : id
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    eliminarProvincia(id:string){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "delete-provincias",
            'data'   : {
                'id' : id
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    editarProvincia(id_pais:number,id:number,descripcion:string){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "update-provincias",
            'data'   : {
                'id': id,
                'descripcion': descripcion,
                'id_pais': id_pais
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    guardarProvincia(provincia:ProvinciasModel){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "add-provincias",
            'data'   : {
                'data': provincia
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
}
