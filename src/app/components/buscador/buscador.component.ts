import { Component, OnInit } from '@angular/core';
import { ItinerariosService } from 'src/app/core/service/home-service/home.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent  {
  cursos: any[] = [];
  constructor(private _ItinerariosService:ItinerariosService) { }

  buscar(termino: string){
    this.cursos =[];
    this._ItinerariosService.searchItinerarios(termino)
      .subscribe(Response =>{
        Response.ResultSet.forEach((element:any) => {
          this.cursos.push({
            ...element 
          })
        });
      });
  }

}
