import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorModel } from 'src/app/core/models/administrador/administrador.model';
import { EntidadModel } from 'src/app/core/models/entidad/entidad.model';
import { Location } from '@angular/common';
import { PaisService } from 'src/app/core/service/paises/paises.service';
import { ProvinciasService } from 'src/app/core/service/provincias/provincias.service';
import { EntidadService } from 'src/app/core/service/entidad/entidad.service';
import { ToastrService } from 'ngx-toastr';
import { RegistrarEntidadService } from 'src/app/core/service/entidad/entidad-registrar.service';
import { UsuarioModel } from 'src/app/core/models/usuario/usuario.model';
import { UsuarioService } from 'src/app/core/service/usuario/usuario.service';
import { fechas } from 'src/app/core/custom/fechas';
import { EnvioNotificaciones } from 'src/app/core/custom/envio-notificaciones';
import { NotificacionModel } from 'src/app/core/models/notificacion/notificacion.model';
import { UploadFileService } from 'src/app/core/service/uploadFile/uploadFile.service';
import { EmailService } from 'src/app/core/service/email/email.service';


@Component({
  selector: 'app-register-entidad',
  templateUrl: './register-entidad.component.html',
  styleUrls: ['./register-entidad.component.css']
})
export class RegisterEntidadComponent implements OnInit {

  paises: any[]=[];
  provincias: any[]=[];
  registrarEntidad : FormGroup;
  registrarUsuario :FormGroup;
  submitted= false;
  entidadModel: EntidadModel;
  usuarioModel: UsuarioModel;
  loading :boolean = false;
  fecha = new fechas();
  today = this.fecha.currentDate();
  validarPass=true;
  imagenFile: Array<File>=[];


  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router:Router,
    private location : Location,
    private _paisesService: PaisService,
    private _provinciasService: ProvinciasService,
    private _usuarioService: UsuarioService,
    private _registrarEntidadService : RegistrarEntidadService,
    private _uploadFileService : UploadFileService,
    private toastr: ToastrService,
    private _envioNotificacionService: EnvioNotificaciones,
    private _emailService: EmailService
    ) {

    this.registrarEntidad = this.fb.group({
      id_provincia:['',Validators.required],
      id_pais:['',Validators.required],
      descripcion:['',Validators.required],
      web:['',Validators.required],
      email:['',Validators.required],
      nombre:['',Validators.required],
      direccion:['',Validators.required],
      telefono:['',Validators.required],
      imagen:['',Validators.required],
      cuit:['',Validators.required],
      ciudad:['',Validators.required],
      director:['',Validators.required],

    })

    this.registrarUsuario = this.fb.group({
      usuario:['',Validators.required],
      pass:['',Validators.required],
    })
    this.entidadModel = new EntidadModel(0,0,1,1,"","","",false,"","","",[],"","","");
    this.usuarioModel = new UsuarioModel(0,"","","",true);
   }

  ngOnInit(): void {
    //this.getPaises();
    //this.getProvincias();
  }

  addEntidad() {
    this.submitted = true;
    console.log(this.usuarioModel);
    console.log(this.entidadModel);
    if (!this.registrarEntidad.invalid && !this.registrarUsuario.invalid && this.validarPass) {
      this.registrarComoEntidad();
    }else{
      return
    }


  }

  async registrarComoEntidad(){
    let data = {
      'data' : {
        'file' :this.entidadModel.imagen,
        'id'   : 0,
        'tabla': "entidad"
      }
    }
    this.loading=true;
    console.log(this.usuarioModel);
    localStorage.clear();

    this._usuarioService.registrarUsuario(this.usuarioModel).subscribe(Response=>{
      this.entidadModel.id_usuario= Response.ResultSet.id
      let  emailObject = {
      	  dataEmail : {
      	  	TO      : ["cristian.ema_91@hotmail.com"], // get de todos los mails de admins
      		  FROM    : this.entidadModel.nombre,
      		  EMAIL   : this.entidadModel.email,
      		  SUBJECT : "Solicitud de nueva Entidad",
      		  TITULO  : "Solicitud de nueva Entidad",
      		  MESSAGE : "Le informamos que se ha generado una nueva solicitud de incorporación de entidad, por favor verifique la misma en el sistema.",
      		  OBS     : ""
        	}
        };
      this._registrarEntidadService.registrarEntidad(this.entidadModel).subscribe(async Response =>{
        this.loading=false
        if(Response.error == ""){         
          try {
            await this._envioNotificacionService.newEntidad(Response.ResultSet.id, this.entidadModel.nombre);  
            this.toastr.success("La entidad fue registrada con exito!","Entidad Registrada",{
              positionClass:'toast-bottom-right'
            });
            data.data.id =Response.ResultSet.id;
            this._uploadFileService.makeFileRequest(data,"image").then(Result=>{

            }).catch(
              error=>{
                
              }
            )
            this.router.navigate(['/login']);
          } catch (error) {
            this.toastr.error("Ocurrio un error al registrar la Entidad","Ocurrio un error",{
              positionClass:'toast-bottom-right'
            });
            this.router.navigate(['/login']);
          }
            this._emailService.enviarMail(emailObject.dataEmail).subscribe(Response=>{
              console.log(Response);
              if(Response.error !=""){
                this.toastr.error("Ocurrio un error al enviar el email al administrador","Ocurrio un error",{
                  positionClass:'toast-bottom-right'
                });
              }
            });

        }else{
          this.toastr.error("Ocurrio un error al registrar la Entidad","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
          this.router.navigate(['/login']);
        }
      })
    })
  }

  confirmarContrasena(){
    if((<HTMLInputElement>document.getElementById('pass')).value!=(<HTMLInputElement>document.getElementById('confirm_pass')).value){
      this.validarPass = false;
    }else{
      this.validarPass = true;
    }
  }

  getPaises(){
    this._paisesService.getPaises().subscribe(Response=>{
      console.log(Response)
    })
  }

  getProvincias(){
    this._provinciasService.getProvincias().subscribe(Response=>{
      console.log(Response)
    })
  }

  fileChangeEventFoto(fileInput : any){
    this.entidadModel.imagen = <Array<File>> fileInput.target.files;
  }

  saveImagen(id_entidad:number){
    let send = {
      'file' : this.imagenFile,
      'table': 'entidad',
      'id'   :  id_entidad
    };
  }
}
