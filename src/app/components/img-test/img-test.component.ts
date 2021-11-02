import { Component, OnInit } from '@angular/core';
import { ItinerarioModel } from 'src/app/core/models/itinerario/itinerario.model';
import { UploadFileService } from 'src/app/core/service/uploadFile/uploadFile.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-img-test',
  templateUrl: './img-test.component.html',
  styleUrls: ['./img-test.component.css']
})
export class ImgTestComponent implements OnInit {

  imagenFile: Array<File>=[];
  constructor(
    private _uploadFileService : UploadFileService,

  ) { }

  ngOnInit(): void {
  }


  fileChangeEventFoto(fileInput : any){
    this.imagenFile = <Array<File>> fileInput.target.files;
    console.log(this.imagenFile);
    
  }


  subirImagen(){
    let send = {
      'data' : {
        'file' :this.imagenFile,
        'id'   : 29,
        'tabla': "entidad"
      }
    };
    this._uploadFileService.makeFileRequest(send,"image").then(Result=>{
      console.log(Result)
    }).catch(
      error =>{
        console.log(error);
      }
    );
  }


  public bajarImagen():string{
    let imagen: string="TSba30XGSrTMUJta2DVmSo3I.png";
    return  `${environment.apiURL}godownImg/${imagen}`;
  }

}
