import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Localidades_procedenciasService } from 'src/app/core/service/localidades_procedencias/localidades_procedencias.service';
import { PaisService } from 'src/app/core/service/paises/paises.service';

@Component({
  selector: 'app-abm-localidades',
  templateUrl: './abm-localidades.component.html',
  styleUrls: ['./abm-localidades.component.css']
})
export class AbmLocalidadesComponent implements OnInit {
  localidades:any[] = [];
  constructor(
    private _localidadesService:Localidades_procedenciasService,
    private toastr: ToastrService
  ) { 

  }

  ngOnInit(): void {
    this.getLocalidades(0,10);
  }

  getLocalidades(Skip:number, Take:number){ 
    this._localidadesService.getLocalidades(Skip,Take).subscribe(
      response => {
        console.log(response);
        this.localidades = [];
        response.ResultSet.forEach((element:any) => {
          this.localidades.push({ // guardo la lista de laboratorios en el array laboratorios
            ...element 
          })
        });
      });     
  }

  eliminarLocalidad(id:number){
    this._localidadesService.eliminarLocalidad(id).subscribe(
      Response =>{
        if(Response.error == ""){
          this.toastr.success("La Localidad fue eliminada con exito!","Localidad Eliminada",{
            positionClass:'toast-bottom-right'
          });
          this.getLocalidades(0,10);
        }else{
          this.toastr.error("Ocurrio un error al eliminar la Localidad","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }
      },
      error =>{
        this.toastr.error("No se pueden eliminar localidades que ya estan en uso dentro del sistema","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      }
    );
  }
}
