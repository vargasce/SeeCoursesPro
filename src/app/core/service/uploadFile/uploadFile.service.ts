import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';


@Injectable({
    providedIn: 'root'
})

export class UploadFileService {
    
    //private controller : string = 'paises';
    public Url:string;

    constructor (
        public _http:HttpClient
    ){
        this.Url = environment.apiURL;
    }

    /** FILE REQUEST
   * @observations 
   * @param path url donde esta la imagen
   * @param files imagen
   * @param name nombre de la imagen
   */
  
  makeFileRequest( data : any , name : string){
	let files = <Array<File>> data.data.file;
    return new Promise(function(resolve, reject){

		let url = environment.apiURL;
        let formData = new FormData();
        let xhr = new XMLHttpRequest();

        for(var i= 0 ; i < files.length; i++){
            formData.append( name, files[i], files[i].name);
        }

        formData.append('id',data.data.id);
        formData.append('tabla',data.data.tabla);

        xhr.onreadystatechange = function () {
            if(xhr.readyState == 4){                        //espera una respuesta
                if(xhr.status == 200){                      //si la respuesta es positiva
                    resolve(JSON.parse(xhr.response));
                }else{
                    reject(xhr.response)
                }
            }
        }

        xhr.open('POST',url+"upload",true);
        xhr.send(formData);

   })
}

makeFileRequestFile( data : any , name : string){
    console.log(data);
  let files = <File> data.data.file;
  return new Promise(function(resolve, reject){

      let url = environment.apiURL;
      let formData = new FormData();
      let xhr = new XMLHttpRequest();


      formData.append( name, files, files.name);

      formData.append('id',data.data.id);
      formData.append('tabla',data.data.tabla);
      formData.append('id_entidad',data.data.id_entidad);
      formData.append('descripcion',data.data.descripcion);

      xhr.onreadystatechange = function () {
          if(xhr.readyState == 4){                        //espera una respuesta
              if(xhr.status == 200){                      //si la respuesta es positiva
                  resolve(JSON.parse(xhr.response));
              }else{
                  reject(xhr.response)
              }
          }
      }

      xhr.open('POST',url+"uploadFiles",true);
      xhr.send(formData);

 })
}

}