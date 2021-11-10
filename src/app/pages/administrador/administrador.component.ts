import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogoConfirmacionComponent } from 'src/app/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { fechas } from 'src/app/core/custom/fechas';
import { Imagenes } from 'src/app/core/global/imagenes/imagenes';
import { NotificacionModel } from 'src/app/core/models/notificacion/notificacion.model';
import { AdministradorService } from 'src/app/core/service/administrador/administrador.service';
import { EmailService } from 'src/app/core/service/email/email.service';
import { PaisService } from 'src/app/core/service/paises/paises.service';
import { UploadFileService } from 'src/app/core/service/uploadFile/uploadFile.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  public id : number = 0;
  notificaciones:any[]=[];
  entidades:any[]=[];
  displayStyle: any[] = [];
  displayStyleModal:string = "";
  img: Imagenes;

  constructor(
    private _administradorService:AdministradorService,
    private _uploadFileService : UploadFileService,
    private _emailService : EmailService,
    private toastr: ToastrService,
    private _paisService:PaisService,
    public dialogo: MatDialog
    )
    { 
      this.img  = new Imagenes(this._uploadFileService);

  }

  ngOnInit(): void {
    this.getNotificaciones();
    //this.getPaisPorId("1");
  }

  getPaisPorId(id:string):string{
    this._paisService.getPaisesById(1).subscribe(Response=>{
      console.log(Response);
    })
    return "bolivia"
  }


  getNotificaciones(){
    this.notificaciones=[];
    this.entidades=[];
   this._administradorService.getNotificaciones().subscribe(
      Response =>{
        Response.ResultSet.forEach((element:any) => {
          if(element.pendiente && element.es_admin){
            if(element.es_curso && element.verificado_entidad_table){
              this.notificaciones.push({
                ...element 
              })
            }
            if(!element.es_curso && !element.verificado_entidad_table){
              this.entidades.push({
                ...element 
              })
            }
          }
        });
      }); 


  }
  openPopup(id:number) {
    this.displayStyle[id] = "block";
  }
  closePopup(id:number) {
    this.displayStyle[id] = "none";
  }

  openModal() {
    this.displayStyleModal = "block";
  }

  acceptModal(){
    this.displayStyleModal = "none";
  }
  closeModal() {
    this.displayStyleModal = "none";

  }

  mostrarDialogo(): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `Esta seguro que quiere rechazar la entidad?`
      })
      .afterClosed()
      .subscribe((confirmado: string) => {
        console.log(confirmado);
        if (confirmado) {
          alert("¡A mí también!");
        } else {
          alert("Deberías probarlo, a mí me gusta :)");
        }
      });
  }
  
  aprobarSolicitudesDeCursos(id:number,id_entidad:number, id_curso:number,es_curso:boolean,email_entidad:string){  

    let fecha = new fechas();
    var today = fecha.currentDate();  //netodo ok
    let notif : NotificacionModel;
    notif = new NotificacionModel(
       0,
       id_entidad,
       1,
       id_curso,
       false,
       false,
       false,
       true,
       "Solicitud de Curso aprobada",
       "Sin Observaciones",
       today,
    );

    let  emailObject = {
      dataEmail : {
        TO      : [email_entidad], // get de todos los mails de admins
        FROM    : "Administrador",
        EMAIL   : "cristian.ema_91@hotmail.com",
        SUBJECT : "Solicitud de curso aprobada",
        TITULO  : "Solicitud de curso aprobada",
        MESSAGE : "Le informamos que se ha aprobado la solicitud de incorporación de curso.",
        OBS     : ""
      }
    };

    this._administradorService.aprobarNotificacion(id,es_curso).subscribe(Response =>{
      this._emailService.enviarMail(emailObject.dataEmail).subscribe(Response=>{
        if(Response.error !=""){
          this.toastr.error("Ocurrio un error al enviar el email a la entidad","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }
      })
      this._administradorService.enviarNotificacionEntidad(notif).subscribe(Response =>{
        this.getNotificaciones();
      });
    });

    
    this.id = id;
  }

  rechazarSolicitudesDeCursos(id:number,id_entidad:number, id_curso:number,es_curso:boolean,email_entidad:string){
    let fecha = new fechas();
    var today = fecha.currentDate();
    let notif : NotificacionModel;
    notif = new NotificacionModel(
       0,
       id_entidad,
       1,
       id_curso,
       false,
       false,
       true,
       true,
       "Solicitud de Curso rechazada",
       "Sin Observaciones",
       today,
    );
    let  emailObject = {
      dataEmail : {
        TO      : [email_entidad], // get de todos los mails de entidad
        FROM    : "Administrador",
        EMAIL   : "cristian.ema_91@hotmail.com",
        SUBJECT : "Solicitud de curso rechazada",
        TITULO  : "Solicitud de curso rechazada",
        MESSAGE : "Le informamos que se ha rechazado la solicitud de incorporación de curso.",
        OBS     : ""
      }
    };
    this._administradorService.rechazarNotificacion(id,es_curso).subscribe(Response =>{
      this._emailService.enviarMail(emailObject.dataEmail).subscribe(Response=>{
        if(Response.error !=""){
          this.toastr.error("Ocurrio un error al enviar el email a la entidad","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }
      })
      this._administradorService.enviarNotificacionEntidad(notif).subscribe(Response =>{
        this.getNotificaciones();
      });
    });
    
    
    this.id = id;
  }

  aprobarEntidades(id:number,id_entidad:number, id_curso:number,es_curso:boolean,email_entidad:string){
    let fecha = new fechas();
    var today = fecha.currentDate();
    let notif : NotificacionModel;
    notif = new NotificacionModel(
       0,
       id_entidad,
       1,
       id_curso,
       false,
       false,
       false,
       true,
       "Solicitud de Entidad Aprobada",
       "Sin Observaciones",
       today,
    );
    let  emailObject = {
      dataEmail : {
        TO      : [email_entidad], // get de todos los mails de admins
        FROM    : "Administrador",
        EMAIL   : "gonzalezjuani239@gmail.com",
        SUBJECT : "Solicitud de entidad aprobada",
        TITULO  : "Solicitud de entidad aprobada",
        MESSAGE : "Le informamos que se ha aprobado la solicitud de incorporación de entidad.",
        OBS     : ""
      }
    };
    //console.log(emailObject);
    this._administradorService.aprobarNotificacion(id,es_curso).subscribe(Response =>{
      this._emailService.enviarMail(emailObject.dataEmail).subscribe(Response=>{
        if(Response.error !=""){
          this.toastr.error("Ocurrio un error al enviar el email a la entidad","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }
      });
      this._administradorService.enviarNotificacionEntidad(notif).subscribe(Response =>{
        this.getNotificaciones();
      });
    });

    this.id = id;
  }

  rechazarEntidades(id:number,id_entidad:number, id_curso:number,es_curso:boolean,email_entidad:string){
    let fecha = new fechas();
    var today = fecha.currentDate();
    let notif : NotificacionModel;
    notif = new NotificacionModel(
       0,
       id_entidad,
       1,
       id_curso,
       false,
       false,
       false,
       true,
       "Solicitud de Entidad rechazada",
       "Sin Observaciones",
       today,
    );
    let  emailObject = {
      dataEmail : {
        TO      : [email_entidad], // get de todos los mails de entidad
        FROM    : "Administrador",
        EMAIL   : "cristian.ema_91@hotmail.com",
        SUBJECT : "Solicitud de entidad rechazada",
        TITULO  : "Solicitud de entidad rechazada",
        MESSAGE : "Le informamos que se ha rechazado la solicitud de incorporación de entidad.",
        OBS     : ""
      }
    };
    
    this._administradorService.rechazarNotificacion(id,es_curso).subscribe(Response =>{
      this._emailService.enviarMail(emailObject.dataEmail).subscribe(Response=>{
        if(Response.error !=""){
          this.toastr.error("Ocurrio un error al enviar el email a la entidad","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }
      });
      this._administradorService.enviarNotificacionEntidad(notif).subscribe(Response =>{
        this.getNotificaciones();
      });
    });

    this.id = id;
  }


  enviarNotificacionEntidad(){
    
  }
/** EVENT EMMITER NAVBAR ADMIN UPDATE GRID
 * 
 */
 public updateGrid(){
  this.getNotificaciones();
 }

 public getStringImg(imagen:string):string{
  return this.img.bajarImagen(imagen)
}
}
