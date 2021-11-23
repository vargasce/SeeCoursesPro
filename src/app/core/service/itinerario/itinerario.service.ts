import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { NotificacionModel } from "../../models/notificacion/notificacion.model";
import { ItinerarioModel } from "../../models/itinerario/itinerario.model";
@Injectable({
    providedIn: 'root'
})
export class ItinerarioEntidadService {

    private controller : string = 'itinerario';

    constructor (
        private http: HttpClient
    ){

    }

    getItinerarioById(id:number): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "getItinerarioById",
            'data'   : id
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    getItinerarioByIdEntidad(): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "getItinerarioByIdEntidad",
            'data'   : localStorage.getItem('id_entidad')
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    guardarItinerario(data:ItinerarioModel):  Observable<any>{ 
        let headers = { headers : environment.headers };
        let send ={
            'action' : "addItinerario",
            'token'  : localStorage.getItem('token'),  
            'data'   : data
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    getItinerarios(data:ItinerarioModel):  Observable<any>{ 
        let headers = { headers : environment.headers };
        let send ={
            'action' : "getItinerarioList"
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    getAvailabilityDate(itinerario:ItinerarioModel):  Observable<any>{ 
        let headers = { headers : environment.headers };
        let send ={
            'action' : "getAvailabilityDate",
            'data'   : {
                'fecha_itinerario': itinerario.fecha_itinerario,
                'hora_itinerario' : itinerario.hora_itinerario,
                'hora_itinerario_fin': itinerario.hora_itinerario_fin
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

}