import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class PaisService {

    private controller : string = 'paises';

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
}