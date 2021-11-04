import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class ProvinciasService {

    private controller : string = 'provincia';

    constructor (
        private http: HttpClient
    ){

    }

    getProvincias(id:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "list-provincias",
            'data'   : {
                'id_pais': id
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
}
