import { Component, OnInit } from '@angular/core';
import { Imagenes } from 'src/app/core/global/imagenes/imagenes';
import { EntidadService } from 'src/app/core/service/entidad/entidad.service';
import { ItinerariosService } from 'src/app/core/service/home-service/home.service';
import { UploadFileService } from 'src/app/core/service/uploadFile/uploadFile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {

  cursos:any[]=[];
  cursosFinalizados:any[]=[];
  cursosPendientes:any[]=[];
  cursosRechazados:any[]=[];
  displayStyle: any[] = [];
  img: Imagenes;
  constructor(
    private _itinerariosService: ItinerariosService,
    private _uploadFileService : UploadFileService
  ) { 
    this.img  = new Imagenes(this._uploadFileService);
  }

  ngOnInit(): void {
    this.getCursos();
  }


  getCursos(){
    let id = Number(localStorage.getItem("id_entidad"));
    if(id != null){
      this._itinerariosService.getItinerariosByIdEntidad(id).subscribe(
        Response =>{
          
          this.cursos=[];
          this.cursosFinalizados=[];
          this.cursosPendientes=[];
          this.cursosRechazados=[];
  
          Response.ResultSet.forEach((element:any) => {
  
            if(element.validado && !element.finalizado && !element.rechazado && element.noti_pendiente){
              this.cursos.push({
                ...element 
              })
            } 
  
            if(!element.validado && element.noti_pendiente){
              this.cursosPendientes.push({
                ...element 
              })
            }
            if(element.finalizado && element.noti_pendiente){
              this.cursosFinalizados.push({
                ...element 
              })
            }
            if(element.rechazado && element.noti_pendiente){
                this.cursosRechazados.push({
                  ...element 
                })
            }
  
          });
          console.log(this.cursosRechazados)
        }); 
    }
   
      
  }
  openPopup(id:number) {
    this.displayStyle[id] = "block";
  }
  closePopup(id:number) {
    this.displayStyle[id] = "none";
  }

  public getStringImg(imagen:string):string{
    return this.img.bajarImagen(imagen)
  }
  
}
