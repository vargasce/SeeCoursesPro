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
import { ImagenesService } from 'src/app/core/service/imagenes/imagenes.service';
import { ActividadesService } from 'src/app/core/service/actividades/actividades.service';
import { PaisService } from 'src/app/core/service/paises/paises.service';
import { ProvinciasService } from 'src/app/core/service/provincias/provincias.service';
import { LocalidadesService } from 'src/app/core/service/localidades/localidades.service';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { pdfModel } from 'src/app/core/custom/pdfModel';
import { map } from 'rxjs/operators';
import { Files } from 'src/app/core/global/imagenes/files/files';
import { FileService } from 'src/app/core/service/files/files.service';
import { DeleteFile } from 'src/app/core/service/files/deleteFile';
import { ThrowStmt } from '@angular/compiler';



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
  @ViewChild('id_paisForm') id_paisForm:ElementRef | undefined;
  @ViewChild('id_provinciasForm') id_provinciasForm:ElementRef | undefined;

  agregarCurso : FormGroup;
  submitted= false;
  id: number = -1;
  id_curso: number =-1;
  titulo ="Agregar Actividad";
  itinerarioModel: ItinerarioModel;
  loading :boolean = false;
  imagenFile: Array<File>=[];
  imagenDefault :any[]=[];
  fechasNoDisponibles :any[]=[];
  imagenPropia:boolean =false;
  imagenPorDefecto:boolean = false;
  imagenModel:Array<File> =[];
  pdfModel:File[]=[];
  fileList:any[]=[];
  pdfModelArray: Array<pdfModel> = [];
  pdfName:string="";
  img_foto:string="";
  img: Imagenes;
  file :Files;
  imagenExist:boolean = false;
  validarImagen:boolean = true;
  today:string= this.fechas.currentDateConGuionMedio();
  mostrarFechasOcupadas:boolean = false;
  conservarHorario:boolean = false;
  minHoraFin:string=""
  errorFechas:boolean= false;
  editImagen:boolean= false;
  adminMails:string[]=[];
  actividades:any[]=[];
  paises:any[]=[];
  provincias:any[]=[];
  localidades:any[]=[];
  validarPais:boolean = true;
  validarProv:boolean = true;
  validarActividad:boolean = true;
  validarLocalidad:boolean = true;
  mailValido: boolean = true;


  constructor(
    iconRegistry: MatIconRegistry,
    sanitizer: DomSanitizer,
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
    private _adminService:RegistrarAdminService,
    private _imagenService:ImagenesService,
    private _actividadesService:ActividadesService,
    private _paisesService: PaisService,
    private _provinciasService: ProvinciasService,
    private _localidadesService: LocalidadesService,
    private _fileService:FileService,
    private _deleteFileService : DeleteFile
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
      instructor:['',Validators.required],
      id_actividad:['',Validators.required],
      id_pais:['',Validators.required],
      id_provincia:['',Validators.required],
      id_localidad:['',Validators.required],
      telefono_consulta:['',Validators.required],
      email_consulta:['',Validators.required],
    });
    iconRegistry.addSvgIcon('pdf', sanitizer.bypassSecurityTrustResourceUrl('assets/img/pdf.svg'));
    iconRegistry.addSvgIcon('txt', sanitizer.bypassSecurityTrustResourceUrl('assets/img/txt.svg'));
    iconRegistry.addSvgIcon('cross', sanitizer.bypassSecurityTrustResourceUrl('assets/img/cross.svg'));
    this.id = Number(sessionStorage.getItem('id_entidad')) //capturo el id del registro que quiero modificar
    this.itinerarioModel = new ItinerarioModel(0,Number(sessionStorage.getItem('id_entidad')),"","","","","","","",this.fechas.currentDate(),"","","",false,false,false,false,0,0,0,0,"","");
    this.img  = new Imagenes(this._uploadFileService);
    this.file  = new Files(this._uploadFileService);
  }

  async ngOnInit(): Promise<void> {
    (<HTMLInputElement>document.getElementById('hora_itinerario_fin')).disabled=true;
    (<HTMLInputElement>document.getElementById('provincias')).disabled=true;
    (<HTMLInputElement>document.getElementById('localidades')).disabled=true;
    this.getImagenes();
    this.esEditar();
    this.getActividades();
    this.getPaises();
    this.adminMails= await this.getMailsAdministrador();
  }

  ngAfterViewInit(): void{
    this.eventChange();
  }
  


  esEditar(){ 

    if( this.aRoute.snapshot.paramMap.get('id') == null ){

      this.id_curso = 0;

    }else{

      this.id_curso = Number( this.aRoute.snapshot.paramMap.get('id') );
      (<HTMLInputElement>document.getElementById('provincias')).disabled=false;
      (<HTMLInputElement>document.getElementById('localidades')).disabled=false;

    }

    if(this.id_curso !== 0){

      this.titulo = 'Editar Actividad';
      this.loading=true;
      (<HTMLInputElement>document.getElementById('hora_itinerario_fin')).disabled=false;

      this._itinerarioService.getItinerarioById(this.id_curso).subscribe(Response =>{

        this.itinerarioModel = Response.ResultSet;
        this.loading= false;
        let split:number = this.itinerarioModel.imagen.indexOf("imagen");

        this.getProvincias(this.itinerarioModel.id_pais);
        this.getLocalidades(this.itinerarioModel.id_provincia);

        this.getFilesItinerario();

        if(split >0){ // verifico si la imagen que tenia guardada es una imagen por defecto

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
      this.validarPaises();
      this.validarProvincias();
      this.validarLocalidades();
      this.validarActividades();
      this.isMailValid();
    
      if (!this.agregarCurso.invalid && this.validarImagen && !this.errorFechas &&this.validarProv && this.validarPais && this.validarActividad && this.validarLocalidad && this.mailValido) {
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

    let dataFile = {
      'data' : {
        'descripcion':this.pdfName,
        'file' : this.pdfModel[0],
        'id'   : 0,
        'id_entidad':sessionStorage.getItem('id_entidad'),
        'tabla': "files"
      }
    }

    let  emailObject = {
      dataEmail : {
        TO      : this.adminMails, // get de todos los mails de admins
        FROM    : sessionStorage.getItem("nombre_entidad"),
        EMAIL   : sessionStorage.getItem("email_entidad"),
        SUBJECT : "Solicitud de nueva Actividad",
        TITULO  : "Solicitud de nueva Actividad",
        MESSAGE : "Le informamos que se ha generado una nueva solicitud de incorporación de Actividad, por favor verifique la misma en el sistema.",
        OBS     : ""
      }
    };
    let id_curso: number;
    this.loading=true
    this.itinerarioModel.id_entidad = Number(sessionStorage.getItem("id_entidad"));
    this.itinerarioModel.telefono_consulta = this.itinerarioModel.telefono_consulta.toString(); 
    this._itinerarioService.guardarItinerario(this.itinerarioModel).subscribe(async Response =>{

      if(Response.error == ""){ // el response me tiene que devolver el id del curso que se creo, asi lo uso en el service de abajo
        try {

          let result = await this._envioNotificacionService.newCurso(Number(sessionStorage.getItem("id_entidad")),Response.ResultSet.id, this.itinerarioModel.observacion,this.itinerarioModel.nombre);
          if( result ){
            this.toastr.success("La solicitud de Actividad fue registrada con exito!","Solicitud de Actividad Registrada",{
              positionClass:'toast-bottom-right'
            });
          } 
          
          data.data.id =Response.ResultSet.id;
          dataFile.data.id =Response.ResultSet.id;

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
                this.toastr.error("Ocurrio un error al guardar la imagen","Ocurrio un error",{
                  positionClass:'toast-bottom-right'
                });
              }
            )
          }

          if(this.pdfModel!=[]){

              try{

               await Promise.all(this.pdfModel.map( async (value ) =>{
                  
                  dataFile.data.file = value;

                  if(value.name.length >45){

                    dataFile.data.descripcion = value.name.substring(0,45);

                  }else{
                    
                    dataFile.data.descripcion = value.name;
                  }

                  await this._uploadFileService.makeFileRequestFile( dataFile, "file" ).then( response =>{
                    
                  }).catch( _error =>{ 

                      console.log( _error );

                      this.toastr.error("Ocurrio un error al guardar el archivo","Ocurrio un error",{
                        positionClass:'toast-bottom-right'
                    });
                  });
                }));

              }catch( err ){
                console.log(err);
                this.toastr.error("Ocurrio un error al guardar el archivo","Ocurrio un error",{
                  positionClass:'toast-bottom-right'
                });
              }
          }

          this.router.navigate(['/entidad/listarCursos']);

        } catch (error) {
          this.toastr.error("Ocurrio un error al registrar la solicitud de Actividad","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }

      }else{
        this.toastr.error("Ocurrio un error al enviar la solicitud de Actividad","Ocurrio un error",{
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

    let dataFile = {
      'data' : {
        'descripcion':this.pdfName,
        'file' : this.pdfModel[0],
        'id'   : 0,
        'id_entidad':sessionStorage.getItem('id_entidad'),
        'tabla': "files"
      }
    }


    let  emailObject = {
      dataEmail : {
        TO      : this.adminMails, // get de todos los mails de admins
        FROM    : sessionStorage.getItem("nombre_entidad"),
        EMAIL   : sessionStorage.getItem("email_entidad"),
        SUBJECT : "Solicitud de nueva Actividad",
        TITULO  : "Solicitud de nueva Actividad",
        MESSAGE : "Le informamos que se ha generado una nueva solicitud de incorporación de Actividad, por favor verifique la misma en el sistema.",
        OBS     : ""
      }
    };
    let id_curso = this.id_curso;
    this.itinerarioModel.fecha_alta = this.fechas.currentDateConGuionMedio();
    this.loading=true
    this.itinerarioModel.id_entidad = Number(sessionStorage.getItem("id_entidad"));
    this.itinerarioModel.telefono_consulta = this.itinerarioModel.telefono_consulta.toString();
    this._itinerarioService.editarItinerario(id_curso,this.itinerarioModel).subscribe(async Response =>{

      if(Response.error == ""){ // el response me tiene que devolver el id del curso que se creo, asi lo uso en el service de abajo
        try {

          let result = await this._envioNotificacionService.newCurso(Number(sessionStorage.getItem("id_entidad")),id_curso, this.itinerarioModel.observacion,this.itinerarioModel.nombre);
          if( result ){
            this.toastr.success("La solicitud de Actividad fue registrada con exito!","Solicitud de Actividad Registrada",{
              positionClass:'toast-bottom-right'
            });
          } 
          
          data.data.id =id_curso;
          dataFile.data.id =this.id_curso;

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

          if(this.pdfModel!=[]){

            try{

             await Promise.all(this.pdfModel.map( async (value ) =>{
                
                dataFile.data.file = value;

                if(value.name.length >100){

                  dataFile.data.descripcion = value.name.substring(0,100);

                }else{
                  
                  dataFile.data.descripcion = value.name;
                }

                await this._uploadFileService.makeFileRequestFile( dataFile, "file" ).then( response =>{
                  
                }).catch( _error =>{ 

                    console.log( _error );

                    this.toastr.error("Ocurrio un error al guardar el archivo","Ocurrio un error",{
                      positionClass:'toast-bottom-right'
                  });
                });
              }));

            }catch( err ){
              console.log(err);
              this.toastr.error("Ocurrio un error al guardar el archivo","Ocurrio un error",{
                positionClass:'toast-bottom-right'
              });
            }
        }

        this.router.navigate(['/entidad/listarCursos']);

        } catch (error) {
          this.toastr.error("Ocurrio un error al registrar la solicitud de Actividad","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }

      }else{
        this.toastr.error("Ocurrio un error al enviar la solicitud de Actividad","Ocurrio un error",{
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

  fileChangeEventFile(fileInput : any){
    
    this.pdfModel = [];
    for(let i = 0; i<  fileInput.target.files.length;i++ ){
      this.pdfModel.push(fileInput.target.files[i]);
    }

  }

  eventChange(){

    this.renderer.listen(this.selectorDeImagen?.nativeElement,'change',event =>{

      this.itinerarioModel.imagen="";
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

    this.renderer.listen(this.id_paisForm?.nativeElement,'change',event =>{

      this.getProvincias(Number(this.itinerarioModel.id_pais));
      this.itinerarioModel.id_provincia = 0;
      this.itinerarioModel.id_localidad = 0;
      this.localidades.splice(0,this.localidades.length);

    });

    this.renderer.listen(this.id_paisForm?.nativeElement,'change',event =>{

      (<HTMLInputElement>document.getElementById('provincias')).disabled=false;


    });

    this.renderer.listen(this.id_provinciasForm?.nativeElement,'change',event =>{

      (<HTMLInputElement>document.getElementById('localidades')).disabled=false;
      this.getLocalidades(Number(this.itinerarioModel.id_provincia));

    });
  }

  
  getImagenes(){ 

    this.imagenDefault = [];
    this._imagenService.getImagenes().subscribe( response =>{ 
      this.imagenDefault.push( ... response.ResultSet ) });     

  }

  onChangeSelect(event: any) {

    this.imagenExist = true;
    this.itinerarioModel.imagen = event.target.value;

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

  public getStringFile(file:string):string{
    return this.file.bajarFile(file)
  }

  validarCargaImagen(){
if(this.itinerarioModel.imagen != ""){
  this.validarImagen=true;
}else{
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
      }else{
        if(this.imagenPropia && this.itinerarioModel.imagen ==""){
          this.validarImagen = false;
        }
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
  getActividades(){
    this._actividadesService.getActividades().subscribe(Response=>{
      this.actividades.push( ... Response.ResultSet.rows )
    })
  }

  getPaises(){
    this._paisesService.getPaises().subscribe(Response=>{
      this.paises = [];
      Response.Resultset.forEach((element:any) => {
        this.paises.push({ // guardo la lista de laboratorios en el array laboratorios
          ...element
        })
      });
    })
  }

  getProvincias(id_pais:number){
    this.provincias = [];
    this._provinciasService.getProvinciasByIdPais(id_pais).subscribe(Response=>{
      Response.Resultset.forEach((element:any) => {
        this.provincias.push({ // guardo la lista de laboratorios en el array laboratorios
          ...element
        })
      });
    })
  }

  getLocalidades(id_provincia:number){
    this.localidades = [];
    this._localidadesService.getLocalidadesByIdProvincia(id_provincia).subscribe(Response=>{
      Response.Resultset.forEach((element:any) => {
        this.localidades.push({ // guardo la lista de laboratorios en el array laboratorios
          ...element
        })
      });
    })
  }

  eliminarFile(id:number){
      this._deleteFileService.deleteFile(id).subscribe(Response=>{
      if(Response.error==""){

        this.toastr.success("Se elimino el archivo exitosamente!","Archivo Eliminado!",{
          positionClass:'toast-bottom-right'
        });
        
      }else{
        this.toastr.error("Ocurrio un error al eliminar el archivo","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });

      }
      this.getFilesItinerario();
    },
    error =>{
      this.toastr.error("Ocurrio un error al eliminar el archivo","Ocurrio un error",{
        positionClass:'toast-bottom-right'
      });
    })

  }

  validarPaises(){
    if(this.itinerarioModel.id_pais==0){
      this.validarPais = false;
    }else{
      this.validarPais = true;
    }
  }

  validarProvincias(){
    if(this.itinerarioModel.id_provincia==0){
      this.validarProv = false;
    }else{
      this.validarProv = true;
    }
  }
  validarActividades(){
    if(this.itinerarioModel.id_actividad==0){
      this.validarActividad = false;
    }else{
      this.validarActividad = true;
    }
  }

  validarLocalidades(){
    if(this.itinerarioModel.id_localidad==0){
      this.validarLocalidad = false;
    }else{
      this.validarLocalidad = true;
    }
  }

  getFilesItinerario(){
    this.fileList=[];
    this._fileService.getFilesByIdItinerario(this.itinerarioModel.id).subscribe(Response =>{

      Response.ResultSet.forEach((element:any) => {
      
        this.fileList.push({   
          ...element

        })
      });
    });
  }

  isMailValid(): boolean {
    alert("hola")
    let mail = (<HTMLInputElement>document.getElementById('mail')).value;
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.mailValido = regexp.test(mail);
    return this.mailValido
  }
    
}
