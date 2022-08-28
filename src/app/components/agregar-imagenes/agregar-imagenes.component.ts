import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Imagenes } from 'src/app/core/global/imagenes/imagenes';
import { ImagenesModel } from 'src/app/core/models/imagenes/imagenes.model';
import { ActividadesService } from 'src/app/core/service/actividades/actividades.service';
import { ImagenesService } from 'src/app/core/service/imagenes/imagenes.service';
import { UploadFileService } from 'src/app/core/service/uploadFile/uploadFile.service';


@Component({
  selector: 'app-agregar-imagenes',
  templateUrl: './agregar-imagenes.component.html',
  styleUrls: ['./agregar-imagenes.component.css']
})
export class AgregarImagenesComponent implements OnInit {

  agregarImagen : FormGroup;
  submitted= false;
  imagenModel: ImagenesModel;
  loading :boolean = false;
  titulo = 'Agregar Imagenes'
  id: number = -1;
  imagenModelArray:Array<File> =[];
  editImagenBoolean:boolean= false;
  img_foto:string="";
  img: Imagenes;
  editarImagen:boolean= false;
  imagenValidada:boolean= true;
  constructor(
    private fb: FormBuilder,
    private _imagenService: ImagenesService,
    private router:Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    private _uploadFileService:UploadFileService
  ) {
    this.agregarImagen = this.fb.group({
      descripcion:['',Validators.required]
    })
    this.imagenModel = new ImagenesModel(0,"","");
    this.id = Number(this.aRoute.snapshot.paramMap.get('id')); //capturo el id del registro que quiero modificar
    this.img  = new Imagenes(this._uploadFileService);
   }

  ngOnInit(): void {
    this.esEditar();
  }

  public getStringImg(imagen:string):string{
    return this.img.bajarImagen(imagen)
  }

  addEditImagen(){
    this.submitted = true;
    console.log(this.imagenModelArray.length);
    this.validarImagenSubida()
    if(this.agregarImagen.invalid || !this.imagenValidada){
      return;
    }
    if (this.id == 0) { // si el id es 0 agrego un nuevo laboratorio, sino lo edito
      this.addImagen();
    } else {
      this.editImagen();
    }
  }
  validarImagenSubida(){
    
    if (this.imagenModelArray.length == 0 ){

      this.imagenValidada= false;
    }else{

     this.imagenValidada= true;
    }
  }
  esEditar(){ 
    console.log("aaaaaaaaaaaaaaa"+this.id )
    if(this.id !== 0){
      this.titulo = 'Editar/Ver Imagenes';
      this.loading=true
      this.editarImagen = true;
      this._imagenService.getImagenesById(this.id).subscribe(Response =>{
        this.imagenModel = Response.ResultSet[0];
        this.loading=false
      })
    }
  }

  addImagen(){
    this.loading=true
    this._imagenService.guardarImagenes(this.imagenModel).subscribe(Response =>{

      this.loading=false

      if(Response.error == ""){
        let data = {
          'data' : {
            'file' :this.imagenModelArray,
            'id'   : Response.ResultSet[0].id,
            'tabla': "imagen"
          }
        }
        console.log(data);
        this._uploadFileService.makeFileRequest(data,"image").then(
          Result=>{

        }).catch(

          error=>{

            this.toastr.error("Ocurrio un guardar la imagen","Ocurrio un error",{
              positionClass:'toast-bottom-right'
            });

          }
        )
        this.toastr.success("La Imagen fue guardada con exito!","Imagen Guardada",{
          positionClass:'toast-bottom-right'
        });

      }else{

        this.toastr.error("Ocurrio un error al agregar La Imagen","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });

      }
    },
    error=>{

      this.toastr.error("Ocurrio un error al agregar La Imagen","Ocurrio un error",{
        positionClass:'toast-bottom-right'
      });

    })
    this.router.navigate(['/adminGeneral/imagenes']);
    
  }

  editImagen(){
    this.loading=true
    this._imagenService.editarImagenes(this.imagenModel.id,this.imagenModel).subscribe(Response =>{
      this.loading=false
      if(Response.error == ""){
        if(this.imagenModelArray.length > 0){
          
          let data = {
            'data' : {
              'file' :this.imagenModelArray,
              'id'   : this.imagenModel.id,
              'tabla': "imagen"
            }
          }
          console.log(data);
          this._uploadFileService.makeFileRequest(data,"image").then(
            Result=>{
  
          }).catch(
  
            error=>{
  
              this.toastr.error("Ocurrio un guardar la imagen","Ocurrio un error",{
                positionClass:'toast-bottom-right'
              });
  
            }
          )
          this.toastr.success("La Imagen fue guardada con exito!","Imagen Guardada",{
            positionClass:'toast-bottom-right'
          });
  
        }
        this.toastr.success("La Imagen fue editada con exito!","Imagen Editada",{
          positionClass:'toast-bottom-right'
        });
      }else{
        this.toastr.error("Ocurrio un error al editar la Imagen","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      }
    })
    this.router.navigate(['/adminGeneral/imagenes']);
  }

  fileChangeEventFoto(fileInput : any){
    this.editarImagen= false;
    this.imagenModelArray= <Array<File>> fileInput.target.files;
    this.previsualizer(this.imagenModelArray[0]);
  }

  public previsualizer( file : File ){
		let reader = new FileReader;
		reader.onload = (e: any) => {
			this.img_foto = e.target.result;
      this.editImagenBoolean = false;
		};
		reader.readAsDataURL(file);
	}
}
