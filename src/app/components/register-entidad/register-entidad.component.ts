import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
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
import { Imagenes } from 'src/app/core/global/imagenes/imagenes';



@Component({
  selector: 'app-register-entidad',
  templateUrl: './register-entidad.component.html',
  styleUrls: ['./register-entidad.component.css']
})
export class RegisterEntidadComponent implements OnInit {

  @ViewChild('selectorDeImagenEntidad') selectorDeImagenEntidad:ElementRef | undefined;
  @ViewChild('selectorDeImagenPorDefecto') selectorDeImagenPorDefecto:ElementRef | undefined;
  @ViewChild('id_paisForm') id_paisForm:ElementRef | undefined;

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
  imagenDefault :any[]=[];
  imagenPropia:boolean =false;
  imagenPorDefecto:boolean = false;
  imagenModel:Array<File> =[];
  img_foto:string="";
  img: Imagenes;
  imagenExist:boolean = false;
  cuitValido:boolean = true;
  mailValido:boolean = true;
  validarPais:boolean = true;
  validarProv:boolean = true;
  validarImagen:boolean = true;

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
    private _emailService: EmailService,
    public renderer:Renderer2
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
      cuit:['',Validators.required],
      ciudad:['',Validators.required],
      director:['',Validators.required],

    });
    this.imagenDefault=[
      {id:'0',descripcion:'imagen default 0'},
      {id:'1',descripcion:'imagen default 1'},
      {id:'2',descripcion:'imagen default 3'},
  ];

    this.registrarUsuario = this.fb.group({
      usuario:['',Validators.required],
      pass:['',Validators.required],
    })
    this.entidadModel = new EntidadModel(0,0,0,0,"","","",false,"","","","","","","");
    this.usuarioModel = new UsuarioModel(0,"","","",true);
    this.img  = new Imagenes(this._uploadFileService);
   }

  ngOnInit(): void {
    this.getPaises();
    (<HTMLInputElement>document.getElementById('provincias')).disabled=true;
  }

  ngAfterViewInit(): void{
    this.eventChange();
  }

  addEntidad() {
    this.submitted = true;
    this.cuitValido = this.isCuitValid();
    this.mailValido = this.isMailValid();
    this.validarPaises();
    this.validarProvincias();
    this.validarCargaImagen();
    this.confirmarContrasena();
    if (this.cuitValido && this.mailValido &&this.validarProv && this.validarPais && this.validarImagen){
      if (!this.registrarEntidad.invalid && !this.registrarUsuario.invalid && this.validarPass) {
        this.registrarComoEntidad();
      } else {
        return
      }
    }
  }


  async registrarComoEntidad(){
    let data = {
      'data' : {
        'file' :this.imagenModel,
        'id'   : 0,
        'tabla': "entidad"
      }
    }
    this.loading=true;
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

            if(!this.imagenPorDefecto){
              this._uploadFileService.makeFileRequest(data,"image").then(Result=>{}).catch(
                error=>{
                  this.toastr.error("Ocurrio un guardar la imagen","Ocurrio un error",{
                    positionClass:'toast-bottom-right'
                  });
                }
              )
            }
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
    console.log(this.entidadModel);
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
      this.paises = [];
      Response.Resultset.forEach((element:any) => {
        this.paises.push({ // guardo la lista de laboratorios en el array laboratorios
          ...element
        })
      });
      this.entidadModel.id_pais=0;
    })
  }

  getProvincias(id_provincia:number){
    this._provinciasService.getProvinciasByIdPais(id_provincia).subscribe(Response=>{
      this.provincias = [];
      Response.Resultset.forEach((element:any) => {
        this.provincias.push({ // guardo la lista de laboratorios en el array laboratorios
          ...element
        })
      });
      console.table( this.provincias );
    })
  }



 fileChangeEventFoto(fileInput : any){
    this.imagenModel= <Array<File>> fileInput.target.files;
    this.previsualizer(this.imagenModel[0]);
  }

  eventChange(){
    this.renderer.listen(this.selectorDeImagenEntidad?.nativeElement,'change',event =>{
      if(event.target.value==1){
        this.imagenPropia=true;
        this.imagenPorDefecto=false;
      }else{
        this.imagenPropia=false;
        this.imagenPorDefecto=true;
      }
    });

    this.renderer.listen(this.id_paisForm?.nativeElement,'change',event =>{
      (<HTMLInputElement>document.getElementById('provincias')).disabled=false;
      this.getProvincias(Number(this.entidadModel.id_pais));

    });

  }

  onChangeSelect(event:any){
    this.imagenExist=true;
    switch (event.target.value){
      case "0":
        this.entidadModel.imagen= "imagen1.jpg";
        break;
      case "1":
        this.entidadModel.imagen= "imagen2.jpg";
        break;
      case "2":
        this.entidadModel.imagen= "imagen3.jpg";
        break;

    }
  }

  validarCargaImagen(){

    if((this.imagenPorDefecto == false) && (this.imagenPropia == false)){
      this.validarImagen=false;
    }else{
      if(this.imagenPorDefecto){
        if(this.entidadModel.imagen == ""){
          this.validarImagen= false;
        }else{
          this.validarImagen=true;
        }
      }else{
        if(this.imagenPropia){
          if(this.imagenModel.length == 0){
            this.validarImagen= false;
          }else{
            this.validarImagen=true;
          }
        }
      }
    }
  }

  validarPaises(){
    if(this.entidadModel.id_pais==0){
      this.validarPais = false;
    }else{
      this.validarPais = true;
    }
  }

  validarProvincias(){
    if(this.entidadModel.id_provincia==0){
      this.validarProv = false;
    }else{
      this.validarProv = true;
    }
  }

  /** PREVISUALIZAR IMAGEN.
	* @Observations : Previsualiza la imgen seleccionada por el usuario,
	* renderiza la imagen en tiempo real.
	*/
	public previsualizer( file : File ){
		let reader = new FileReader;
		reader.onload = (e: any) => {
			this.img_foto = e.target.result;
		};
		reader.readAsDataURL(file);
	}

  public getStringImg(imagen:string):string{
    return this.img.bajarImagen(imagen)
  }


  isCuitValid():boolean {
    let cuit= (<HTMLInputElement>document.getElementById('cuit')).value;
    const regexCuit = /^(20|23|27|30|33)([0-9]{9}|-[0-9]{8}-[0-9]{1})$/g;
    this.cuitValido=regexCuit.test(cuit);
    return  this.cuitValido
  }
  
  isMailValid():boolean {
    let mail= (<HTMLInputElement>document.getElementById('mail')).value;
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.mailValido=regexp.test(mail);
    return  this.mailValido
  }
}
