import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class LoginService {

    private controller : string = 'login';

    constructor (
        private http: HttpClient
    ){

    }

    login(user:string,password:string,tipo:string){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "login",
            'data'   : {"usuario":user,"pass":password},
            'tipo'   : tipo
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    loginProgramador(user:string,password:string,tipo:string){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "loginAdmin",
            'data'   : {"usuario":user,"pass":password},
            'tipo'   : tipo
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
}