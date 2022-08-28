import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { ItinerarioModel } from "../../models/itinerario/itinerario.model";
@Injectable({
    providedIn: 'root'
})
export class DeleteFile {

    private controller : string = 'deleteFile';

    constructor (
        private http: HttpClient
    ){

    }

    deleteFile(id:number): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'data'   : {
                'id':id
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

}