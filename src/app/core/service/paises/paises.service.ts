import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { PaisesModel } from "../../models/paises/paises.model";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class PaisService {

    private controller : string = 'pais';

    constructor (
        private http: HttpClient
    ){

    }

    getPaises(){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "list-paises",
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    } 
    
    getPaisesById(id:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "list-paisesById",
            'data'   : {
                'id' : id,
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    eliminarPais(id:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "delete-paises",
            'data'   : {
                'id' : id,
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    guardarPais(data:PaisesModel):  Observable<any>{ 
        let headers = { headers : environment.headers };
        let send ={
            'action' : "add-paises",
            'data'   : data
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    editarPaises(id:number,data:PaisesModel):  Observable<any>{  
        let headers = { headers : environment.headers };
        let send ={
            'action' : "update-paises",  
            'data'   : {
                'id' : id,
                'data'   : data
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
}
