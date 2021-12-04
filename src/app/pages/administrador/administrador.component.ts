import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { DialogoConfirmacionComponent } from 'src/app/components/dialogo-confirmacion/dialogo-confirmacion.component';
import { fechas } from 'src/app/core/custom/fechas';
import { Imagenes } from 'src/app/core/global/imagenes/imagenes';
import { NotificacionModel } from 'src/app/core/models/notificacion/notificacion.model';
import { Usuario_AdminModel } from 'src/app/core/models/usuario_admin/usuario_admin.model';
import { AdministradorService } from 'src/app/core/service/administrador/administrador.service';
import { EmailService } from 'src/app/core/service/email/email.service';
import { PaisService } from 'src/app/core/service/paises/paises.service';
import { UploadFileService } from 'src/app/core/service/uploadFile/uploadFile.service';
import { Usuario_AdminService } from 'src/app/core/service/user_admin/user_admin.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styleUrls: ['./administrador.component.css']
})
export class AdministradorComponent implements OnInit {

  public id : number = 0;
  notificaciones:any[]=[];
  entidades:any[]=[];
  administrador:any[]=[];
  displayStyle: any[] = [];
  displayStyleModal:string = "";
  img: Imagenes;
  emailAdministrador:string | null="";
  usuarioModel: Usuario_AdminModel;
  registrarUsuario:FormGroup;
  validarPass=true;
  passActualizado:boolean = true;
  loading :boolean = false;
  submitted= false;
  rol:string|null="";

  constructor(
    private _administradorService:AdministradorService,
    private _uploadFileService : UploadFileService,
    private _emailService : EmailService,
    private toastr: ToastrService,
    private _paisService:PaisService,
    public dialogo: MatDialog,
    private fb: FormBuilder,
    private _usuarioAdminService:Usuario_AdminService,
    )
    { 
      this.registrarUsuario = this.fb.group({
        contrasenia:['',Validators.required],
      })
      this.img  = new Imagenes(this._uploadFileService);
      this.usuarioModel = new Usuario_AdminModel(0,0,0,"","","",false,true);
      this.rol=localStorage.getItem('rol');
  }


  ngOnInit(): void {
    this.getNotificaciones();
    this.comprobarPassActualizado();
    this.emailAdministrador= localStorage.getItem('email_administrador');

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

  comprobarPassActualizado(){
    if(localStorage.getItem('usadmin_passactualizado') == "false"){
      this.passActualizado = false;
    }else{
      this.passActualizado = true;
    }
  }

  confirmarContrasena(){
    if((<HTMLInputElement>document.getElementById('contrasenia')).value!=(<HTMLInputElement>document.getElementById('confirm_pass')).value){
      this.validarPass = false;
    }else{
      this.validarPass = true;
    }
  }

  validarPassword(){
    this.submitted = true;
    this.confirmarContrasena();
    if (!this.registrarUsuario.invalid && this.validarPass) {
      this.actualizarPass();
    }else{
      return
    }
  }
  
  actualizarPass(){
    this.loading=true;
    let id_administrador = Number(localStorage.getItem('id_administrador'));
    let pass = this.usuarioModel.contrasenia;
    this.passActualizado = true; localStorage.setItem('usadmin_passactualizado','true')
      this._usuarioAdminService.actualizarPassAdmin(id_administrador,pass).subscribe(Response=>{
        this.loading = false;
        this._usuarioAdminService.actualizarBoleanoPassAdmin(id_administrador).subscribe(Response=>{
        });
      });
  }

  openPopup(id:number) {
    this.displayStyle[id] = "block";
  }
  closePopup(id:number) {
    this.displayStyle[id] = "none";
  }


  rechazarEntidadesDialog(id:number,id_entidad:number, id_curso:number,es_curso:boolean,email_entidad:string): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `Esta seguro que quiere rechazar la solicitud?`
      })
      .afterClosed()
      .subscribe((observacion: string) => {
        if (observacion) {
          this.rechazarEntidades(id,id_entidad,id_curso,es_curso,email_entidad,observacion);
        } 
      });
  }

  rechazarCursosDialog(id:number,id_entidad:number, id_curso:number,es_curso:boolean,email_entidad:string): void {
    this.dialogo
      .open(DialogoConfirmacionComponent, {
        data: `Esta seguro que quiere rechazar la solicitud?`
      })
      .afterClosed()
      .subscribe((observacion: string) => {
        if (observacion) {
          this.rechazarSolicitudesDeCursos(id,id_entidad,id_curso,es_curso,email_entidad,observacion);
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
       "Curso aprobado",
       "Sin Observaciones",
       today,
    );

    let  emailObject = {
      dataEmail : {
        TO      : [email_entidad], // get de todos los mails de admins
        FROM    : "Administrador",
        EMAIL   : this.emailAdministrador,
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

  rechazarSolicitudesDeCursos(id:number,id_entidad:number, id_curso:number,es_curso:boolean,email_entidad:string,observacion:string){
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
       "Curso rechazado",
       observacion,
       today,
    );
    let  emailObject = {
      dataEmail : {
        TO      : [email_entidad], // get de todos los mails de entidad
        FROM    : "Administrador",
        EMAIL   : this.emailAdministrador,
        SUBJECT : "Solicitud de curso rechazada",
        TITULO  : "Solicitud de curso rechazada",
        MESSAGE : "Le informamos que se ha rechazado la solicitud de incorporación de curso.",
        OBS     : observacion
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
       "Entidad Aprobada",
       "Sin Observaciones",
       today,
    );
    let  emailObject = {
      dataEmail : {
        TO      : [email_entidad], // get de todos los mails de admins
        FROM    : "Administrador",
        EMAIL   : this.emailAdministrador,
        SUBJECT : "Solicitud de entidad aprobada",
        TITULO  : "Solicitud de entidad aprobada",
        MESSAGE : "Le informamos que se ha aprobado la solicitud de incorporación de entidad.",
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
      });
      this._administradorService.enviarNotificacionEntidad(notif).subscribe(Response =>{
        this.getNotificaciones();
      });
    });

    this.id = id;
  }

  rechazarEntidades(id:number,id_entidad:number, id_curso:number,es_curso:boolean,email_entidad:string, observacion:string){
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
       "Entidad rechazada",
       observacion,
       today,
    );
    let  emailObject = {
      dataEmail : {
        TO      : [email_entidad], // get de todos los mails de entidad
        FROM    : "Administrador",
        EMAIL   : this.emailAdministrador,
        SUBJECT : "Solicitud de entidad rechazada",
        TITULO  : "Solicitud de entidad rechazada",
        MESSAGE : "Le informamos que se ha rechazado la solicitud de incorporación de entidad.",
        OBS     : observacion
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
