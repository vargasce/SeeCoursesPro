import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItinerarioModel } from 'src/app/core/models/itinerario/itinerario.model';
import { ItinerariosService } from 'src/app/core/service/home-service/home.service';

@Component({
  selector: 'app-filtros',
  templateUrl: './filtros.component.html',
  styleUrls: ['./filtros.component.css']
})
export class FiltrosComponent implements OnInit {

  @Output()
  CursosFiltro = new EventEmitter<any[]>();

  filtro : FormGroup;
  itinerarioModel: ItinerarioModel;
  fechas: any;
  cursos:any[]=[]
  constructor(
    private fb: FormBuilder,
    private _itinerarioService: ItinerariosService
  ) { 
    this.filtro = this.fb.group({
      nombre:[''],
      titulo:[''],
      descripcion:[''],
      observacion:[''],
      fecha_itinerario:[''],
      hora_itinerario:[''],
      hora_itinerario_fin:[''],
      link:[''],
      instructor:['']
    });
    this.itinerarioModel = new ItinerarioModel(0,0,"","","","","","","","","","","",false,false,false,false);
  }

  ngOnInit(): void {
  }

  buscarPorFiltro(){
     this._itinerarioService.filtroItinerario(this.itinerarioModel).subscribe(Response=>{
      console.log(Response);
      Response.ResultSet.forEach((element:any) => {
        this.cursos.push({
          ...element 
        });
    });
      this.CursosFiltro.emit(this.cursos);
    });
    /*this._itinerarioService.getItinerarios().subscribe(Response=>{
      Response.ResultSet.forEach((element:any) => {
        this.cursos.push({
          ...element 
        });
    });
    this.CursosFiltro.emit(this.cursos);
    });*/
  }

}
