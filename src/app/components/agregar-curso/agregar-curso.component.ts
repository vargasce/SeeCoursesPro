import { Component, OnInit,Renderer2,ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ItinerarioModel } from 'src/app/core/models/itinerario/itinerario.model';
import { environment } from 'src/environments/environment';
import { Location } from '@angular/common';
import { ItinerarioEntidadService } from 'src/app/core/service/itinerario/itinerario.service';
import { ToastrService } from 'ngx-toastr';
import { EntidadService } from 'src/app/core/service/entidad/entidad.service';
import { fechas } from 'src/app/core/custom/fechas';
import { NotificacionModel } from 'src/app/core/models/notificacion/notificacion.model';
import { EnvioNotificaciones } from 'src/app/core/custom/envio-notificaciones';
import { UploadFileService } from 'src/app/core/service/uploadFile/uploadFile.service';
import { EmailService } from 'src/app/core/service/email/email.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Imagenes } from 'src/app/core/global/imagenes/imagenes';

@Component({
  selector: 'app-agregar-curso',
  templateUrl: './agregar-curso.component.html',
  styleUrls: ['./agregar-curso.component.css'],
  providers:[fechas]
})
export class AgregarCursoComponent implements OnInit {

  @ViewChild('selectorDeImagen') selectorDeImagen:ElementRef | undefined;
  @ViewChild('selectorDeImagenPorDefecto') selectorDeImagenPorDefecto:ElementRef | undefined;

  agregarCurso : FormGroup;
  submitted= false;
  id: number = -1;
  titulo ="Agregar Curso";
  itinerarioModel: ItinerarioModel;
  loading :boolean = false;
  imagenFile: Array<File>=[];
  imagenDefault :any[]=[];
  imagenPropia:boolean =false;
  imagenPorDefecto:boolean = false;
  imagenModel:Array<File> =[];
  img_foto:string="";
  img: Imagenes;

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
    public renderer:Renderer2
    ) {
    this.agregarCurso = this.fb.group({
      nombre:['',Validators.required],
      titulo:['',Validators.required],
      descripcion:['',Validators.required],
      observacion:['',Validators.required],
      fecha_itinerario:['',Validators.required],
      hora_itinerario:['',Validators.required],
      link:['',Validators.required],
      instructor:['',Validators.required]
    });
    this.imagenDefault=[
      {id:'0',descripcion:'imagen default 0'},
      {id:'1',descripcion:'imagen default 1'},
      {id:'2',descripcion:'imagen default 3'},
  ];
    
    this.id = Number(environment.id_entidad) //capturo el id del registro que quiero modificar
    this.itinerarioModel = new ItinerarioModel(0,Number(environment.id_entidad),"","","","","","",this.fechas.currentDate(),"","","",false,false,false,false);
    this.img  = new Imagenes(this._uploadFileService);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void{
    this.eventChange();
  }
  
  addEditCurso() {
    this.submitted = true;
    if (this.agregarCurso.invalid) {
      return;
    }
      this.addCurso();
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
        TO      : ["cristian.ea_91@hotmail.com"], // get de todos los mails de admins
        FROM    : localStorage.getItem("nombre_entidad"),
        EMAIL   : localStorage.getItem("email_entidad"),
        SUBJECT : "Solicitud de nuevo Curso",
        TITULO  : "Solicitud de nuevo Curso",
        MESSAGE : "Le informamos que se ha generado una nueva solicitud de incorporación de curso, por favor verifique la misma en el sistema.",
        OBS     : ""
      }
    };
    console.log(emailObject);
    let id_curso: number;
    this.loading=true
    this.itinerarioModel.id_entidad = Number(localStorage.getItem("id_entidad"));
    this._itinerarioService.guardarItinerario(this.itinerarioModel).subscribe(async Response =>{
      if(Response.error == ""){ // el response me tiene que devolver el id del curso que se creo, asi lo uso en el service de abajo
        try {

          let result = await this._envioNotificacionService.newCurso(Number(environment.id_entidad),Response.ResultSet.id, this.itinerarioModel.observacion,this.itinerarioModel.nombre);  
          
          if( result ){
            this.toastr.success("La solicitud de curso fue registrada con exito!","Solicitud de Curso Registrada",{
              positionClass:'toast-bottom-right'
            });
          } 
          
          data.data.id =Response.ResultSet.id;

          try{

            await this._emailService.enviarMail( emailObject.dataEmail ).toPromise();   

          }catch( err ){
            console.log("error email");
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


  backRouter():void{
    this.location.back();
  }

  fileChangeEventFoto(fileInput : any){
    this.imagenModel= <Array<File>> fileInput.target.files;
    this.previsualizer(this.imagenModel[0]);
  }

  saveImagen(id_entidad:number){
    let send = {
      'file' : this.imagenFile,
      'table': 'entidad',
      'id'   :  id_entidad
    };
  }



  eventChange(){
    this.renderer.listen(this.selectorDeImagen?.nativeElement,'change',event =>{
      if(event.target.value==1){
        this.imagenPropia=true;
        this.imagenPorDefecto=false;
      }else{
        this.imagenPropia=false;
        this.imagenPorDefecto=true;
      }
    });
  }

  onChangeSelect(event:any){
    console.log(event.target.value) 
    switch (event.target.value){
      case "0":
        this.itinerarioModel.imagen= "imagen1.jpg"; 
        break;
      case "1":
        this.itinerarioModel.imagen= "imagen2.jpg"; 
        break;
      case "2":
        this.itinerarioModel.imagen= "imagen3.jpg"; 
        break;
         
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
    
}
