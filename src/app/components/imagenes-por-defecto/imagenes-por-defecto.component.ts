import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ImagenesService } from 'src/app/core/service/imagenes/imagenes.service';

@Component({
  selector: 'app-imagenes-por-defecto',
  templateUrl: './imagenes-por-defecto.component.html',
  styleUrls: ['./imagenes-por-defecto.component.css']
})
export class ImagenesPorDefectoComponent implements OnInit {

  imagenes:any[] = [];
  constructor(
    private _imagenService:ImagenesService,
    private toastr: ToastrService
  ) { }


  ngOnInit(): void {
    this.getImagenes();
  }

  getImagenes(){ 
    this.imagenes = [];
    this._imagenService.getImagenes().subscribe( response => this.imagenes.push( ... response.ResultSet ) );     
  }

  eliminarImagenes(id:number){
    this._imagenService.eliminarImagenes(id).subscribe(
      Response =>{
        if(Response.error == ""){
          this.toastr.success("La Imagen fue eliminada con exito!","Imagen Eliminada",{
            positionClass:'toast-bottom-right'
          });
          this.getImagenes();
        }else{
          this.toastr.error("Ocurrio un error al eliminar la Imagen","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }
      },
      error =>{
        this.toastr.error("No se puedo eliminar la Imagen","Ocurrio un error",{
          positionClass:'toast-bottom-right'});
      }
    );
  }
}
