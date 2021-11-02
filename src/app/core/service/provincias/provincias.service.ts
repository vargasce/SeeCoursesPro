import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProvinciasService {

    private controller : string = 'provincias';

    constructor (
        private http: HttpClient
    ){

    }

    getProvincias(){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "list-provincias",
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
}