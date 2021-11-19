import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { AdministradorService } from 'src/app/core/service/administrador/administrador.service';
import { EntidadService } from 'src/app/core/service/entidad/entidad.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-navbar-entidad',
  templateUrl: './navbar-entidad.component.html',
  styleUrls: ['./navbar-entidad.component.css']
})
export class NavbarEntidadComponent implements OnInit {
  hidden = true;
  contadorNotificaciones=0;
  verNotificaciones = false;
  notificaciones:any[]=[]
  notificacionVista:boolean[]=[];
  

  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private _entidadService:EntidadService
    ) { 
    iconRegistry.addSvgIcon('notification', sanitizer.bypassSecurityTrustResourceUrl('assets/img/notification.svg'));
    iconRegistry.addSvgIcon('logout', sanitizer.bypassSecurityTrustResourceUrl('assets/img/logout.svg'));
  }
 

  ngOnChanges( SimpleChange : any ){
    if( SimpleChange.id.currentValue > 0){
      this._entidadService.updateVistoNotificacion(SimpleChange.id.currentValue).subscribe(Response =>{})
      this.getNotificaciones();
    }    
  }

  ngOnInit(): void {
    this.getNotificaciones();
    this.refreshNotificacion();
  }

  refreshNotificacion(){
    setTimeout(() => {
      this.getNotificaciones(); 
      //localStorage.clear();
     }, 60000);//3600000ms = 1hs
  }
  
  getNotificaciones() {
   let id_entidad = localStorage.getItem("id_entidad");
    this._entidadService.getNotificaciones(Number(id_entidad)).subscribe(
      Response =>{
        this.notificaciones=[];
        Response.ResultSet.forEach((element:any) => {
          if(element.pendiente && !element.visto && !element.es_admin){
            this.notificaciones.push({
              ...element 
            })
          }
        });
        this.contadorDeNotificaciones();
      });
  }
  
  contadorDeNotificaciones(){
    if(this.notificaciones.length==0){
      this.hidden= true
    }
    if(this.notificaciones.length>0){
      this.hidden= false;
    } 
  }

  mostrarNotificaciones() {
    this.verNotificaciones = !this.verNotificaciones
  }

  notificacionVisualizada(id:number){

    let resolve = (element:any) => element.id == id;
    let index = this.notificaciones.findIndex(resolve);
    this.notificacionVista[id]=true; // variable para intercambiar entre la clase que lo marca como "vista " o "no vista"
    this.notificaciones[index].visto=true; // array de notificaciones    
    this._entidadService.updateVistoNotificacion(id).subscribe(Response =>{
    });
  }

  eliminarNotificacion(id:number){
    let resolve = (element:any) => element.id == id;
    let index = this.notificaciones.findIndex(resolve);
    this.notificaciones.splice(index,1);
    this.contadorDeNotificaciones();
    //update de la notificacion id
    // this.getNotificaciones();
  }

  cerrarSesion(){
    localStorage.clear();
    environment.id_entidad = null;
    environment.token = null;
  }

}
