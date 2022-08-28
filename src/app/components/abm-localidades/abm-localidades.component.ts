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
  vector: Array<number> = [0];
  array: Array<number> = [1,2,3,4,5,6,7,8,9,10];
  take:number = 10;
  skip:number = 0;
  indice:number = 1;
  paginas:number = 0;
  count:number = 0;

  constructor(
    private _localidadesService:Localidades_procedenciasService,
    private toastr: ToastrService
  ) { 

  }

  ngOnInit(): void {
    this.getLocalidades();
  }

  getLocalidades() {
    this.getLocalidadesGenerico(this.skip,this.take);
  }

  getLocalidadesGenerico(Skip:number, Take:number ){
    this._localidadesService.getLocalidades(Skip,Take).subscribe(

      Response => {
        this.localidades = [];
        this.count = Response.ResultSet.count;
        Response.ResultSet.rows.forEach((element: any) => {

          this.localidades.push({
            ...element
          }) 

        });
       this.paginas= Number(Response.ResultSet.count)/this.take;
       this.paginas = Math.ceil(this.paginas);
       console.log("paginas: "+this.paginas);
       this.paginar();
      });
  }

  eliminarLocalidad(id:number){
    this._localidadesService.eliminarLocalidad(id).subscribe(
      Response =>{
        if(Response.error == ""){
          this.toastr.success("La Localidad fue eliminada con exito!","Localidad Eliminada",{
            positionClass:'toast-bottom-right'
          });
          this.getLocalidadesGenerico(this.skip,this.take);
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

  paginar(){
    for(let i = 0; i<this.paginas; i++){
      this.vector[i]=i+1;
    }
  }

  indexPagina(indice:number){
    this.skip = this.take * indice -this.take;
    //this.indice = indice;
    console.log( this.indice);
    console.log(this.skip);
    console.log(this.take);
    this.getLocalidadesGenerico(this.skip,this.take);
  }

  next(){
    this.array = new Array();
    this.indice++;
    let length = ((this.indice * 10) - 10); // indice  - 10 - 10 
    let i = 0;
    if(length < this.paginas){
      for(i; i<10; i++){
        if(!( length + i + 1 > this.paginas)){
          this.array[i]=length + i + 1;
        }       
      }
    }else{
      this.indice--;
      let lengthAux = ((this.indice * 10) - 10); // indice  - 10 - 10 
      for(i; i<10; i++){
        if(!( length + i + 1 > this.paginas)){
          this.array[i]=length + i + 1;
        }       
      }
    }
  }

  previous(){
    this.array = new Array();
    this.indice--;
    let length = ((this.indice * 10) - 10); // indice  - 10 - 10 
    let i = 0;
    if(this.indice > 0){
      for(i; i<10; i++){
        this.array[i]=length + i + 1;
      }
    }else{
      this.indice++;
      let lengthAux = ((this.indice * 10) - 10); // indice  - 10 - 10 
      for(i; i<10; i++){
        this.array[i]=lengthAux + i + 1;
      }
    }
  }
}
