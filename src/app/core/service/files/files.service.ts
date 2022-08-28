import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FileService {

    private controller : string = 'list';

    constructor (
        private http: HttpClient
    ){

    }

    getFilesByIdItinerario(id_itinerario:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "getListFiles",
            'data'   : { 
                'id_itinerario':id_itinerario
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }


}