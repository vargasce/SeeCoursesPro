import { Component, OnInit } from '@angular/core';
import { RegistrarEntidadService } from 'src/app/core/service/entidad/entidad-registrar.service';

@Component({
  selector: 'app-listar-entidades',
  templateUrl: './listar-entidades.component.html',
  styleUrls: ['./listar-entidades.component.css']
})
export class ListarEntidadesComponent implements OnInit {
entidades: any[] = [];
vector: Array<number> = [0];
take:number = 10;
skip:number = 0;
indice:number = 1;
paginas:number = 0;
  constructor(private _entidadesService:RegistrarEntidadService) { }

  ngOnInit(): void {
    this.getEntidades();
  }
  getEntidades() {
    this.getEntidadesGenerico(this.skip,this.take);
  }

  getEntidadesGenerico(Skip:number, Take:number ){
    this._entidadesService.getEntidades(Skip,Take).subscribe(

      Response => {

        this.entidades = [];
        Response.ResultSet.rows.forEach((element: any) => {

          this.entidades.push({
            ...element
          })

        });
       this.paginas= Number(Response.ResultSet.count)/this.take;
       this.paginas = Math.ceil(this.paginas);
       this.paginar();
      });
  }

  paginar(){
    for(let i = 0; i<this.paginas; i++){
      this.vector[i]=i+1;
    }
  }

  indexPagina(indice:number){
    console.log(indice);
    this.skip = this.take * indice -this.take;
    this.indice = indice;
    this.getEntidadesGenerico(this.skip,this.take);
  }

  next(){
    this.indice++;
    if(!(this.indice > this.paginas)){

      let skip = this.indice * this.take - this.take;
      this.getEntidadesGenerico(skip,this.take);

    }else{
      this.indice--;
    }
  }

  previous(){
    this.indice = (this.indice-1) < 1? 1 : this.indice -1;
    let skip = this.indice * this.take - this.take;
    this.getEntidadesGenerico(skip,this.take);
  }

}
