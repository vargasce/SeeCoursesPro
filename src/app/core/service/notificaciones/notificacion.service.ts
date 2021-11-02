import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { NotificacionModel } from "../../models/notificacion/notificacion.model";
@Injectable({
    providedIn: 'root'
})
export class NotificacionService {

    private controller : string = 'notificacion';

    constructor (
        private http: HttpClient
    ){

    }


    addNotificacion(notificacion: NotificacionModel){ //envio notificacion al admin de que cree una entidad
        let headers = { headers : environment.headers };
        let send ={
            'action' : "addNotificacion",
            'data'   : notificacion
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
    

}