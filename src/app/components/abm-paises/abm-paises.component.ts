import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { PaisService } from 'src/app/core/service/paises/paises.service';

@Component({
  selector: 'app-abm-paises',
  templateUrl: './abm-paises.component.html',
  styleUrls: ['./abm-paises.component.css']
})
export class AbmPaisesComponent implements OnInit {
  paises:any[] = [];
  constructor(
    private _paisService:PaisService,
    private toastr: ToastrService
  ) { 

  }

  ngOnInit(): void {
    this.getPaises();
  }

  getPaises(){ 
    this._paisService.getPaises().subscribe(
      response => {
        this.paises = [];
        response.Resultset.forEach((element:any) => {
          this.paises.push({ // guardo la lista de laboratorios en el array laboratorios
            ...element 
          })
        });
      });     
  }

  eliminarPais(id:number){
    this._paisService.eliminarPais(id).subscribe(
      Response =>{
        if(Response.error == ""){
          this.toastr.success("El Pais fue eliminado con exito!","Pais Eliminado",{
            positionClass:'toast-bottom-right'
          });
          this.getPaises();
        }else{
          this.toastr.error("Ocurrio un error al eliminar el Pais","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }
      }
    );
  }

}

