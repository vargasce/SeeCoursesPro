import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
@Injectable({
    providedIn: 'root'
})
export class EmailService {

    private controller : string = 'email';

    constructor (
        private http: HttpClient
    ){

    }

    enviarMail(emailObject:object){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "sendEmail",
            'data'   : emailObject
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }


    

}