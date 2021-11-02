import { Component, Input, OnInit } from '@angular/core';
import { UploadFileService } from 'src/app/core/service/uploadFile/uploadFile.service';
import { environment } from 'src/environments/environment';
import { Imagenes } from 'src/app/core/global/imagenes/imagenes';

@Component({
  selector: 'app-tarjetas',
  templateUrl: './tarjetas.component.html',
  styleUrls: ['./tarjetas.component.css']
})
export class TarjetasComponent implements OnInit{
  displayStyle: any[] = [];
  color = "red;"
  imagenFile: Array<File>=[];
  img: Imagenes;
  @Input() items: any[] = [];
  constructor(
    private _uploadFileService : UploadFileService
    ) 
    { 
      this.img  = new Imagenes(this._uploadFileService);
      for (let curso = 0; curso < environment.cursosRecomendados; curso++) {
        this.displayStyle[curso] = "none;"
      }
  }
  ngOnInit(): void {
    console.log("items "+this.items)
  }

  openPopup(id:any) {
    this.displayStyle[id] = "block";
    this.color = "red;"
  }
  closePopup(id:any) {
    this.displayStyle[id] = "none";
  }

  public getStringImg(imagen:string):string{
    return this.img.bajarImagen(imagen)
  }
}
