import { Component, OnInit, OnChanges, Input, SimpleChange, Output, EventEmitter } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';
import { AdministradorService } from 'src/app/core/service/administrador/administrador.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-navbar-admin',
  templateUrl: './navbar-admin.component.html',
  styleUrls: ['./navbar-admin.component.css']
})
export class NavbarAdminComponent implements OnInit {
  hidden = true;
  contadorNotificaciones=0;
  verNotificaciones = false;
  notificaciones:any[]=[]
  notificacionVista:boolean[]=[];
  adminGeneralRol:number = 0;
  
  @Input() id: number=0;
  @Output() updateGrid = new EventEmitter<void>();

  constructor(
    iconRegistry: MatIconRegistry, 
    sanitizer: DomSanitizer,
    private _administradorService:AdministradorService
    ) { 
    iconRegistry.addSvgIcon('notification', sanitizer.bypassSecurityTrustResourceUrl('assets/img/notification.svg'));
    iconRegistry.addSvgIcon('logout', sanitizer.bypassSecurityTrustResourceUrl('assets/img/logout.svg'));
  }
 

  ngOnChanges( SimpleChange : any ){
    if( SimpleChange.id.currentValue > 0){
      this._administradorService.updateVistoNotificacion(SimpleChange.id.currentValue).subscribe(Response =>{})
      this.getNotificaciones();
    }    
  }

  ngOnInit(): void {
    this.getNotificaciones();
    this.verRol();
  }

  verRol() {
    switch (sessionStorage.getItem('rol')) {
      
      case '1':
        this.adminGeneralRol = 1;
        break;

      case '2':
        this.adminGeneralRol = 2;
        break;

      case '99':
        this.adminGeneralRol = 99;
        break;
    }
  }
  getNotificaciones() {
        this._administradorService.getNotificaciones().subscribe(
      Response =>{
        this.notificaciones=[];
        Response.ResultSet.forEach((element:any) => {
          if(element.pendiente && !element.visto && element.es_admin){
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
    this._administradorService.updateVistoNotificacion(id).subscribe(Response =>{
      this.updateGrid.emit();
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
    sessionStorage.clear();
    environment.id_entidad = null;
    environment.token = null;
  }

}
