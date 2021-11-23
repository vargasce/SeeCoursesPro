import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { Observable } from "rxjs";
import { ActividadesModel } from "../../models/actividades/actividades.model";

@Injectable({
    providedIn: 'root'
})
export class ActividadesService {

    private controller : string = 'actividad';

    constructor (
        private http: HttpClient
    ){

    }

    getActividades(){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "list-actividad",
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    } 
    
    getActividadById(id:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "get-actividad",
            'data'   : {
                'id' : id,
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    eliminarActividad(id:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "delete-actividad",
            'data'   : {
                'id' : id,
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    guardarActividad(data:ActividadesModel):  Observable<any>{ 
        let headers = { headers : environment.headers };
        let send ={
            'action' : "add-actividad",
            'data'   : {
                'descripcion': data.descripcion,
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    editarActividad(id:number,data:ActividadesModel):  Observable<any>{  
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
