import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { NotificacionModel } from "../../models/notificacion/notificacion.model";
import { EntidadModel } from "../../models/entidad/entidad.model";
@Injectable({
    providedIn: 'root'
})
export class EntidadService {

    private controller : string = 'notificacion';

    constructor (
        private http: HttpClient
    ){

    }

    getNotificaciones(id?:number): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "getListPendingNotificacionEntidad",
            'data' : {
                'id':id
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }


    updateVistoNotificacion(id:number): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "updateVistoNotificacion",
            'data'   : id
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    enviarNotificacionAdministrador(notificacion: NotificacionModel){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "addNotificacion",
            'data'   : notificacion
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    registrarEntidad(entidad:EntidadModel){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "addEntidad",
            'data'   : entidad
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
    

}