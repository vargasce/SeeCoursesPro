import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/core/service/uploadFile/uploadFile.service';
import { environment } from 'src/environments/environment';
import { Imagenes } from 'src/app/core/global/imagenes/imagenes';
import { ItinerarioEntidadService } from 'src/app/core/service/itinerario/itinerario.service';
import { Files } from 'src/app/core/global/imagenes/files/files';
import { FileService } from 'src/app/core/service/files/files.service';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit{
  displayStyle: any[] = [];
  fileList:any[] = [];
  color = "red;"
  imagenFile: Array<File>=[];
  img: Imagenes;
  file :Files;
  @Input() items: any[] = [];
  constructor(
    private _uploadFileService : UploadFileService,
    private _itinerarioService : ItinerarioEntidadService,
    private _fileService:FileService,
    ) 
    { 
      this.img  = new Imagenes(this._uploadFileService);
      this.file  = new Files(this._uploadFileService);
      for (let curso = 0; curso < environment.cursosRecomendados; curso++) {
        this.displayStyle[curso] = "none;"
      }
  }
  ngOnInit(): void {
  }

  openPopup(id:any) {
    this.displayStyle[id] = "block";
    this.color = "red;"
    this._itinerarioService.incrementViewed(Number(id)).subscribe(Response=>{
    },
    reject=>{

    })

  }
  closePopup(id:any) {
    this.displayStyle[id] = "none";
    this.getFilesItinerario(id);
  }

  public getStringImg(imagen:string):string{
    return this.img.bajarImagen(imagen)
  }

  public getStringFile(file:string):string{
    return this.file.bajarFile(file)
  }
  
  getFilesItinerario(id:number){
  
    this.fileList=[];
  
    this._fileService.getFilesByIdItinerario(id).subscribe(Response =>{
  
      Response.ResultSet.forEach((element:any) => {
      
        this.fileList.push({   
          ...element
  
        })
      });
    });
  
  }
}
