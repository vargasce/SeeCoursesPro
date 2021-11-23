import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActividadesService } from 'src/app/core/service/actividades/actividades.service';

@Component({
  selector: 'app-abm-actividades',
  templateUrl: './abm-actividades.component.html',
  styleUrls: ['./abm-actividades.component.css']
})
export class AbmActividadesComponent implements OnInit {

  actividades:any[] = [];
  constructor(
    private _activdadService:ActividadesService,
    private toastr: ToastrService
  ) { 

  }

  ngOnInit(): void {
    this.getActivdad();
  }

  getActivdad(){ 
    this.actividades = [];
    this._activdadService.getActividades().subscribe( response => this.actividades.push( ... response.ResultSet.rows ) );     
  }

  eliminarActividad(id:number){
    this._activdadService.eliminarActividad(id).subscribe(
      Response =>{
        if(Response.error == ""){
          this.toastr.success("La actividad fue eliminada con exito!","Actividad Eliminada",{
            positionClass:'toast-bottom-right'
          });
          this.getActivdad();
        }else{
          this.toastr.error("Ocurrio un error al eliminar la actividad","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }
      },
      error =>{
      }
    );
  }

}
