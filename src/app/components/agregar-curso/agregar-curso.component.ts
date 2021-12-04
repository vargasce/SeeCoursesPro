import { Component, OnInit,Renderer2,ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItinerarioModel } from 'src/app/core/models/itinerario/itinerario.model';
import { Location } from '@angular/common';
import { ItinerarioEntidadService } from 'src/app/core/service/itinerario/itinerario.service';
import { ToastrService } from 'ngx-toastr';
import { fechas } from 'src/app/core/custom/fechas';
import { EnvioNotificaciones } from 'src/app/core/custom/envio-notificaciones';
import { UploadFileService } from 'src/app/core/service/uploadFile/uploadFile.service';
import { EmailService } from 'src/app/core/service/email/email.service';
import { Imagenes } from 'src/app/core/global/imagenes/imagenes';
import { MatDialog } from '@angular/material/dialog';
import { DialogoFechasComponent } from '../dialogo-fechas/dialogo-fechas.component';
import { RegistrarAdminService } from 'src/app/core/service/administrador/admin-registrar.service';



@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.css'],
  providers:[fechas]
})
export class AgregarCursoComponent implements OnInit {

  @ViewChild('selectorDeImagen') selectorDeImagen:ElementRef | undefined;
  @ViewChild('hora_itinerario') hora_itinerario:ElementRef | undefined;
  @ViewChild('hora_itinerario_fin') hora_itinerario_fin:ElementRef | undefined;
  @ViewChild('selectorDeImagenPorDefecto') selectorDeImagenPorDefecto:ElementRef | undefined;

  agregarCurso : FormGroup;
  submitted= false;
  id: number = -1;
  id_curso: number =-1;
  titulo ="Agregar Curso";
  itinerarioModel: ItinerarioModel;
  loading :boolean = false;
  imagenFile: Array<File>=[];
  imagenDefault :any[]=[];
  fechasNoDisponibles :any[]=[];
  imagenPropia:boolean =false;
  imagenPorDefecto:boolean = false;
  imagenModel:Array<File> =[];
  img_foto:string="";
  img: Imagenes;
  imagenExist:boolean = false;
  validarImagen:boolean = true;
  today:string= this.fechas.currentDateConGuionMedio();
  mostrarFechasOcupadas:boolean = false;
  conservarHorario:boolean = false;
  minHoraFin:string=""
  errorFechas:boolean= false;
  editImagen:boolean= false;
  adminMails:string[]=[];


  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router:Router,
    private location : Location,
    private _itinerarioService : ItinerarioEntidadService,
    private toastr: ToastrService,
    private _envioNotificacionService : EnvioNotificaciones,
    private _uploadFileService : UploadFileService,
    private _emailService : EmailService,
    private fechas :fechas,
    public renderer:Renderer2,
    public dialogo: MatDialog,
    private _adminService:RegistrarAdminService
    ) {
    this.agregarCurso = this.fb.group({
      nombre:['',Validators.required],
      titulo:['',Validators.required],
      descripcion:['',Validators.required],
      observacion:['',Validators.required],
      fecha_itinerario:['',Validators.required],
      hora_itinerario:['',Validators.required],
      hora_itinerario_fin:['',Validators.required],
      link:['',Validators.required],
      instructor:['',Validators.required]
    });
    this.imagenDefault=[
      {id:'0',descripcion:'imagen default 0'},
      {id:'1',descripcion:'imagen default 1'},
      {id:'2',descripcion:'imagen default 3'},
  ];
    
    this.id = Number(localStorage.getItem('id_entidad')) //capturo el id del registro que quiero modificar
    this.itinerarioModel = new ItinerarioModel(0,Number(localStorage.getItem('id_entidad')),"","","","","","","",this.fechas.currentDate(),"","","",false,false,false,false);
    this.img  = new Imagenes(this._uploadFileService);
  }

  async ngOnInit(): Promise<void> {
    (<HTMLInputElement>document.getElementById('hora_itinerario_fin')).disabled=true;
    this.esEditar();
    this.adminMails= await this.getMailsAdministrador();
  }

  ngAfterViewInit(): void{
    this.eventChange();
  }
  

  esEditar(){ 

    //if(location.href.split("/",6)[5]==undefined){
    if( this.aRoute.snapshot.paramMap.get('id') == null ){
      this.id_curso = 0;
    }else{
      this.id_curso = Number( this.aRoute.snapshot.paramMap.get('id') );
      //this.id_curso = Number(location.href.split("/",6)[5]);
    }

    if(this.id_curso !== 0){

      this.titulo = 'Editar Curso';
      this.loading=true;
      (<HTMLInputElement>document.getElementById('hora_itinerario_fin')).disabled=false;

      this._itinerarioService.getItinerarioById(this.id_curso).subscribe(Response =>{

        this.itinerarioModel = Response.ResultSet;
        this.loading= false;
        let slipt:any = this.itinerarioModel.imagen.split(" ",1);

        if(slipt[0] =="defaultImageItinerario"){ // verifico si la imagen que tenia guardada es una imagen por defecto

          (<HTMLInputElement>document.getElementById('selectorDeImagen')).value = "2";
          this.imagenPorDefecto = true;
          this.img_foto = "";
          this.imagenExist = true;

        }else{

          (<HTMLInputElement>document.getElementById('selectorDeImagen')).value = "1";
          this.imagenPropia = true;
          this.imagenPorDefecto = false;
          this.img_foto = "";
          this.imagenExist = true;
          this.editImagen = true;
        }
        this.getStringImg(this.itinerarioModel.imagen);
      })
    }
  }


  verificarFechaCurso(){
    return new Promise( ( resolve, rejec ) =>{

      this.fechasNoDisponibles=[];
      this._itinerarioService.getAvailabilityDate(this.itinerarioModel).subscribe(Response=>{

        if(Response.ResultSet.length == 0){

          this.mostrarFechasOcupadas=false;
          this.conservarHorario=true;

        }else{

          this.dialogFechaCurso();
          this.mostrarFechasOcupadas=true;
          Response.ResultSet.forEach((element:any) => {

            this.fechasNoDisponibles.push({ // guardo la lista de laboratorios en el array laboratorios  
              ...element 
            })
          });
        }
        resolve(true);
      }, 
      error =>{
        rejec(false);
      });
    });
    
  }

  dialogFechaCurso(){
    this.dialogo
    .open(DialogoFechasComponent, {
      data: `Esta seguro que quiere conservar el horario? Ya hay cursos en ese rango`
    })
    .afterClosed()
    .subscribe(Response => {
      if(Response == true){
        this.conservarHorario=true;
        if (this.id_curso == 0) { // si el id es 0 agrego un nuevo laboratorio, sino lo edito
          this.addCurso();
        } else {
          this.editCurso();
        }
      }
    });
  }


  async addEditCurso() {

    try{

      this.submitted = true;
      this.validarCargaImagen();
    
      if (!this.agregarCurso.invalid && this.validarImagen && !this.errorFechas ) {
        let fechasVerificadas = await this.verificarFechaCurso();
        if(fechasVerificadas && this.conservarHorario){
          if (this.id_curso == 0) { // si el id es 0 agrego un nuevo laboratorio, sino lo edito
            this.addCurso();
          } else {
            this.editCurso();
          }
        }
      }else{
        return
      }

    }catch( error ){
      throw error;
    }    
      
  }

  addCurso(){
    (<HTMLInputElement>document.getElementById('btn-submit')).disabled=true;
    this.loading=true;
    let data = {
      'data' : {
        'file' :this.imagenModel,
        'id'   : 0,
        'tabla': "itinerario"
      }
    }
    let  emailObject = {
      dataEmail : {
        TO      : this.adminMails, // get de todos los mails de admins
        FROM    : localStorage.getItem("nombre_entidad"),
        EMAIL   : localStorage.getItem("email_entidad"),
        SUBJECT : "Solicitud de nuevo Curso",
        TITULO  : "Solicitud de nuevo Curso",
        MESSAGE : "Le informamos que se ha generado una nueva solicitud de incorporación de curso, por favor verifique la misma en el sistema.",
        OBS     : ""
      }
    };
    let id_curso: number;
    this.loading=true
    this.itinerarioModel.id_entidad = Number(localStorage.getItem("id_entidad"));
    this._itinerarioService.guardarItinerario(this.itinerarioModel).subscribe(async Response =>{

      if(Response.error == ""){ // el response me tiene que devolver el id del curso que se creo, asi lo uso en el service de abajo
        try {

          let result = await this._envioNotificacionService.newCurso(Number(localStorage.getItem("id_entidad")),Response.ResultSet.id, this.itinerarioModel.observacion,this.itinerarioModel.nombre);
          if( result ){
            this.toastr.success("La solicitud de curso fue registrada con exito!","Solicitud de Curso Registrada",{
              positionClass:'toast-bottom-right'
            });
          } 
          
          data.data.id =Response.ResultSet.id;

          try{

            await this._emailService.enviarMail( emailObject.dataEmail ).toPromise();   

          }catch( err ){
            this.toastr.error("Ocurrio un error al enviar el email al administrador","Ocurrio un error",{
              positionClass:'toast-bottom-right'
            });            
          }

          if(!this.imagenPorDefecto){
            this._uploadFileService.makeFileRequest(data,"image").then(Result=>{}).catch(
              error=>{
                this.toastr.error("Ocurrio un guardar la imagen","Ocurrio un error",{
                  positionClass:'toast-bottom-right'
                });
              }
            )
          }
          this.router.navigate(['/entidad/listarCursos']);

        } catch (error) {
          this.toastr.error("Ocurrio un error al registrar la solicitud de curso","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }

      }else{
        this.toastr.error("Ocurrio un error al enviar la solicitud de curso","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
        (<HTMLInputElement>document.getElementById('btn-submit')).disabled=false;
      }
    })

  }

  editCurso(){
    (<HTMLInputElement>document.getElementById('btn-submit')).disabled=true;
    this.loading=true;
    let data = {
      'data' : {
        'file' :this.imagenModel,
        'id'   : 0,
        'tabla': "itinerario"
      }
    }
    let  emailObject = {
      dataEmail : {
        TO      : this.adminMails, // get de todos los mails de admins
        FROM    : localStorage.getItem("nombre_entidad"),
        EMAIL   : localStorage.getItem("email_entidad"),
        SUBJECT : "Solicitud de nuevo Curso",
        TITULO  : "Solicitud de nuevo Curso",
        MESSAGE : "Le informamos que se ha generado una nueva solicitud de incorporación de curso, por favor verifique la misma en el sistema.",
        OBS     : ""
      }
    };
    let id_curso = this.id_curso;
    this.itinerarioModel.fecha_alta = this.fechas.currentDateConGuionMedio();
    this.loading=true
    this.itinerarioModel.id_entidad = Number(localStorage.getItem("id_entidad"));
    this._itinerarioService.editarItinerario(id_curso,this.itinerarioModel).subscribe(async Response =>{

      if(Response.error == ""){ // el response me tiene que devolver el id del curso que se creo, asi lo uso en el service de abajo
        try {

          let result = await this._envioNotificacionService.newCurso(Number(localStorage.getItem("id_entidad")),id_curso, this.itinerarioModel.observacion,this.itinerarioModel.nombre);
          if( result ){
            this.toastr.success("La solicitud de curso fue registrada con exito!","Solicitud de Curso Registrada",{
              positionClass:'toast-bottom-right'
            });
          } 
          
          data.data.id =id_curso;

          try{

            await this._emailService.enviarMail( emailObject.dataEmail ).toPromise();   

          }catch( err ){
            this.toastr.error("Ocurrio un error al enviar el email al administrador","Ocurrio un error",{
              positionClass:'toast-bottom-right'
            });            
          }

          if(!this.imagenPorDefecto){
            this._uploadFileService.makeFileRequest(data,"image").then(Result=>{}).catch(
              error=>{
                this.toastr.error("Ocurrio un guardar la imagen","Ocurrio un error",{
                  positionClass:'toast-bottom-right'
                });
              }
            )
          }
          this.router.navigate(['/entidad/listarCursos']);

        } catch (error) {
          this.toastr.error("Ocurrio un error al registrar la solicitud de curso","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }

      }else{
        this.toastr.error("Ocurrio un error al enviar la solicitud de curso","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
        (<HTMLInputElement>document.getElementById('btn-submit')).disabled=false;
      }
    },
    error=>{
      this.toastr.error("Ocurrio un error","Ocurrio un error",{
        positionClass:'toast-bottom-right'
      });
    })
  }

  backRouter():void{
    this.location.back();
  }



  saveImagen(id_entidad:number){
    let send = {
      'file' : this.imagenFile,
      'table': 'entidad',
      'id'   :  id_entidad
    };
  }


  fileChangeEventFoto(fileInput : any){
    this.imagenModel= <Array<File>> fileInput.target.files;
    this.previsualizer(this.imagenModel[0]);
  }

  eventChange(){
    this.renderer.listen(this.selectorDeImagen?.nativeElement,'change',event =>{
      if(event.target.value==1){
        this.imagenPropia=true;
        this.imagenPorDefecto=false;
        this.editImagen = false;
      }else{
        this.img_foto="";
        this.imagenPropia=false;
        this.imagenPorDefecto=true;
        this.editImagen = false;
      }
    });
  }

  onChangeSelect(event: any) {

    this.imagenExist = true;
    switch (event.target.value) {
      case "0":
        this.itinerarioModel.imagen = "defaultImageItinerario 1.jpg";
        break;
      case "1":
        this.itinerarioModel.imagen = "defaultImageItinerario 2.jpg";
        break;
      case "2":
        this.itinerarioModel.imagen = "defaultImageItinerario 3.jpg";
        break;
      case "3":
        this.itinerarioModel.imagen = "defaultImageItinerario 4.jpg";
        break;
      case "4":
        this.itinerarioModel.imagen = "defaultImageItinerario 5.jpg";
        break;
      case "5":
        this.itinerarioModel.imagen = "defaultImageItinerario 6.jpg";
        break;

    }
  }

  onChangeHora(event:any){

    this.minHoraFin =event.target.value;
    (<HTMLInputElement>document.getElementById('hora_itinerario_fin')).disabled=false;
    let hora_itinerario=(<HTMLInputElement>document.getElementById('hora_itinerario')).value;
    (<HTMLInputElement>document.getElementById('hora_itinerario_fin')).value = this.minHoraFin;
  }

  onChangeHoraFin(event:any){
    let hora_comienzo=(<HTMLInputElement>document.getElementById('hora_itinerario')).value
    let hora_fin=(<HTMLInputElement>document.getElementById('hora_itinerario_fin')).value
    this.errorFechas = this.fechas.validarHorarios(hora_comienzo,hora_fin) ? true : false;
  }
  
  /** PREVISUALIZAR IMAGEN.
	* @Observations : Previsualiza la imgen seleccionada por el usuario,
	* renderiza la imagen en tiempo real.
	*/ 
	public previsualizer( file : File ){
		let reader = new FileReader;
		reader.onload = (e: any) => {
			this.img_foto = e.target.result;
      this.editImagen = false;
		};
		reader.readAsDataURL(file);
	}

  public getStringImg(imagen:string):string{
    return this.img.bajarImagen(imagen)
  }

  validarCargaImagen(){

    if((this.imagenPorDefecto == false) && (this.imagenPropia == false)){
      this.validarImagen=false;
    }else{
      if(this.imagenPorDefecto){
        if(this.itinerarioModel.imagen == ""){
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

   getMailsAdministrador():Promise<string[]>{ //retorna el mail de todos los administradores
    return new Promise((resolve,reject)=>{
      this._adminService.getEmailAdmin().subscribe(
        Response=>{
          resolve(Response.ResultSet)
        },
        error=>{
          reject([])
          this.toastr.error("Ocurrio un error al obtener los mails de administrador","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        });
    }) 
  }
    
}
