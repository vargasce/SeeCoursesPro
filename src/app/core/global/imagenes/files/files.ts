import { environment } from "src/environments/environment";
import { UploadFileService } from "src/app/core/service/uploadFile/uploadFile.service"; 

export class Files{
    imagenFile: Array<File>=[];
    constructor(
      private _uploadFileService : UploadFileService,
  
    ) { }

    fileChangeEventFoto(fileInput : any){
        this.imagenFile = <Array<File>> fileInput.target.files;
    }
    
    
    
    public bajarFile(File:string):string{
        console.log(`${environment.apiURL}/getArchivo/${File}`);
        return  `${environment.apiURL}/getArchivo/${File}`;
    }



}