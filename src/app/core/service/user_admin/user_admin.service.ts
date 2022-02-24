import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { NotificacionModel } from "../../models/notificacion/notificacion.model";
@Injectable({
    providedIn: 'root'
})
export class Usuario_AdminService {

    private controller : string = 'usuario_admin';

    constructor (
        private http: HttpClient
    ){

    }

    actualizarPassAdmin(id:number,pass:string): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "update_password",
            'data' : {
                'id':id,
                'contrasenia':pass,
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    actualizarPassAdminForget(id:number,pass:string): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "update_password_forget",
            'data' : {
                'id':id,
                'contrasenia':pass,
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    actualizarBoleanoPassAdmin(id:number): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "update_password_status",
            'data' : {
                'id':id,
                'value':true,
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
    
    public verifyUserToken ( token: string | null ): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "verifyUserToken",
            'token' : token,
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    public updateMail ( id:string | null , email: string): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "update-email",
            'data' : {
                'id':id,
                'email':email
            },
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    verifyUser(username : string): Observable<any>{
        let headers = { headers : environment.headers };
        let send ={
            'action' : "verifyUser",
            'name' : username
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }


    validarDni(dni:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "verifyDni",
            'dni': dni
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

}