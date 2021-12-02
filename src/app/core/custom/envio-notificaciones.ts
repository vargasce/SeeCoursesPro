import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NotificacionModel } from "../models/notificacion/notificacion.model";
import { NotificacionService } from "../service/notificaciones/notificacion.service";
import { fechas } from "./fechas";

@Injectable({providedIn:'root'})
export class EnvioNotificaciones  {

    constructor (
        private http: HttpClient,
        private _notificacionService :NotificacionService
    ){

    }

    public async newEntidad(id_entidad:number, nombre:string):Promise<boolean>{
        let fecha = new fechas();
        var today = fecha.currentDate();
        var notificacion = new NotificacionModel(0,id_entidad,1,0,false,true,false,true,"Solicitud de entidad: " + nombre,"",today);
        return new Promise( ( resolve, reject ) =>{
            this._notificacionService.addNotificacion(notificacion).subscribe(
                Response=>{
                    resolve(true);
                },
                Error =>{
                    reject(false);
                }
                );
        });        
    }

    public async newCurso(id_entidad:number,id_curso:number,observacion:string,nombre:string):Promise<boolean>{
        let fecha = new fechas();
        var today = fecha.currentDate();
        var notificacion = new NotificacionModel(0,id_entidad,1,id_curso,false,true,true,true,"Solicitud de Curso: "+ nombre,observacion,today);
        return new Promise( ( resolve, reject ) =>{
            this._notificacionService.addNotificacion(notificacion).subscribe(
                Response=>{
                    console.log("RESPONSE NEWCURSO; "+Response);
                    resolve(true);
                },
                Error =>{
                    reject(false);
                }
                );
        });        
    }

    public async aprobarEntidad(id_entidad:number, id_curso:number,es_curso:boolean):Promise<boolean>{
        let fecha = new fechas();
        var today = fecha.currentDate();
        var notificacion = new NotificacionModel(0,id_entidad,1,id_curso,false,false,false,true,"Entidad aprobada","Sin Observaciones",today);
        return new Promise( ( resolve, reject ) =>{
            this._notificacionService.addNotificacion(notificacion).subscribe(
                Response=>{
                    resolve(true);
                },
                Error =>{
                    reject(false);
                }
                );
        });        
    }
}
