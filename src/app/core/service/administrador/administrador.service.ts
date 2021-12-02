import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { NotificacionModel } from "../../models/notificacion/notificacion.model";
@Injectable({
    providedIn: 'root'
})
export class AdministradorService {

    private controller : string = 'notificacion';

    constructor (
        private http: HttpClient
    ){

    }

    getNotificaciones(): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "getNotificacion",
            'filtro' : {
                id:null
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }



    aprobarNotificacion(id:number,es_curso:boolean): Observable<any>{ //si la notificacion es de curso, la aprueba en la tabla de cursos, y si es de entidad la aprueba en la tabla de entidad
        let headers = { headers : environment.headers };
        let send ={
            'action' : "updatePendingNotificacion",
            'data'   : {
                'id':id,
                'es_curso': es_curso
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }


    rechazarNotificacion(id:number,es_curso:boolean): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "updateRejectedNotificacion",
            'data'   : {
                'id':id,
                'es_curso': es_curso
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

    enviarNotificacionEntidad(notificacion: NotificacionModel){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "addNotificacion",
            'data'   : notificacion
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
    

}