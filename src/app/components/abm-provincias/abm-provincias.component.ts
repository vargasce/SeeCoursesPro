import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ProvinciasService } from 'src/app/core/service/provincias/provincias.service';

@Component({
  selector: 'app-abm-provincias',
  templateUrl: './abm-provincias.component.html',
  styleUrls: ['./abm-provincias.component.css']
})
export class AbmProvinciasComponent implements OnInit {

  provincias:any[] = [];

  constructor(
    private _provinciasService:ProvinciasService,
    private toastr: ToastrService
  ) {

   }

  ngOnInit(): void {
    this.getProvincias();
  }

  getProvincias(){ 
    this._provinciasService.getProvincias().subscribe(
      response => {
        this.provincias = [];
        response.Resultset.forEach((element:any) => {
          this.provincias.push({ // guardo la lista de laboratorios en el array laboratorios
            ...element 
          })
        });
      });     
  }

  eliminarProvincia(id:string){
    this._provinciasService.eliminarProvincia(id).subscribe(
      Response =>{
        if(Response.error == ""){
          this.toastr.success("La Provincia fue eliminado con exito!","Provincia Eliminado",{
            positionClass:'toast-bottom-right'
          });
          this.getProvincias();
        }else{
          this.toastr.error("Ocurrio un error al eliminar la Provincia","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }
      }
    );
  }

}
