import { Component, OnInit } from '@angular/core';
import { ItinerariosService } from 'src/app/core/service/home-service/home.service';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styleUrls: ['./buscador.component.css']
})
export class BuscadorComponent  {
  cursos: any[] = [];
  cursosFiltro: any[] = [];
  filtros:boolean = false;
  sinResultados:boolean= false;
  sinResultadosFiltro:boolean = false;
  constructor(private _ItinerariosService:ItinerariosService) { }

  buscar(termino: string){
    this.sinResultados = false;
    this.cursos =[];
    this._ItinerariosService.searchItinerarios(termino)
      .subscribe(Response =>{
        console.log(Response);
        if(Response.ResultSet!="There is not data!!!"){
          Response.ResultSet.forEach((element:any) => {
            this.cursos.push({
              ...element 
            })
          });
        }else{
          this.sinResultados = true;
        }
      });
  }

  ocultarMostrarFiltros(){
    (<HTMLInputElement>document.getElementById('buscador')).disabled = !this.filtros;
    this.filtros= !this.filtros;
    (<HTMLInputElement>document.getElementById('buscador')).value ="";
    this.sinResultados=false;
    this.sinResultadosFiltro= false;
    this.cursosFiltro =[];
  }
  getCursosFiltro(cusosFiltro:any[]){
    this.cursosFiltro = cusosFiltro;
    if(this.cursosFiltro.length>0){
      this.sinResultadosFiltro= false;
    }else{
      this.sinResultadosFiltro= true;
    }
  }
}
