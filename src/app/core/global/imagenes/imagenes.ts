import { environment } from "src/environments/environment";
import { UploadFileService } from "../../service/uploadFile/uploadFile.service";

export class Imagenes{
    imagenFile: Array<File>=[];
    constructor(
      private _uploadFileService : UploadFileService,
  
    ) { }

    fileChangeEventFoto(fileInput : any){
        this.imagenFile = <Array<File>> fileInput.target.files;
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
        }).catch(
          error =>{
            console.log(error);
          }
        );
    }
    
    
    public bajarImagen(imagen:string):string{
        return  `${environment.apiURL}godownImg/${imagen}`;
    }



}
