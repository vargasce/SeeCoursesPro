import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { ItinerarioModel } from "../../models/itinerario/itinerario.model";
@Injectable({
    providedIn: 'root'
})
export class ItinerariosService {

    private controller : string = 'itinerario';

    constructor (
        private http: HttpClient
    ){

    }

    getItinerarios(): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "getItinerarioList",
            'data'   : "10"
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    searchItinerarios(termino:string): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "getItinerarioByTitle",
            'data'   : termino
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    getItinerariosByIdEntidad(id:number): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "getItinerarioByIdEntidad",
            'data'   : id
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    filtroItinerario(itinerario:ItinerarioModel): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "filtroItinerario",
            'data'   : itinerario
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
}