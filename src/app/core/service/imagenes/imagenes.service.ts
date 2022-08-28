import { Injectable } from "@angular/core";
import { HttpClient, HttpHandler, HttpHeaders } from "@angular/common/http";
import { environment } from '../../../../environments/environment';
import { Observable } from "rxjs";
import { ActividadesModel } from "../../models/actividades/actividades.model";
import { ImagenesModel } from "../../models/imagenes/imagenes.model";

@Injectable({
    providedIn: 'root'
})
export class ImagenesService {

    private controller : string = 'imagen';

    constructor (
        private http: HttpClient
    ){

    }

    getImagenes(){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "list-imagen",
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    } 
    
    getImagenesById(id:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "get-imagen",
            'data'   : {
                'id' : id,
            }            
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    eliminarImagenes(id:number){
        let headers = { headers : environment.headers };
        let send ={
            'action' : "delete-imagen",
            'data'   : {
                'id' : id,
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    guardarImagenes(data:ImagenesModel):  Observable<any>{ 
        let headers = { headers : environment.headers };
        let send ={
            'action' : "add-imagen",
            'data'   : {
                'descripcion': data.descripcion,
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }

    editarImagenes(id:number,data:ImagenesModel):  Observable<any>{  
        let headers = { headers : environment.headers };
        let send ={
            'action' : "update-imagen",  
            'data'   : {
                'id' : id,
                'descripcion'   : data.descripcion
            }
        }
        return this.http.post<any>( environment.apiURL + this.controller , send, headers );
    }
}
