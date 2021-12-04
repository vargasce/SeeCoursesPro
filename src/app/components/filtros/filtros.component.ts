import { Component, OnInit,EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ItinerarioModel } from 'src/app/core/models/itinerario/itinerario.model';
import { RegistrarEntidadService } from 'src/app/core/service/entidad/entidad-registrar.service';
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
  cursos:any[]=[];
  entidades:any[]=[];
  constructor(
    private fb: FormBuilder,
    private _itinerarioService: ItinerariosService,
    private _entidadService:RegistrarEntidadService
  ) { 
    this.filtro = this.fb.group({
      nombre:[''],
      descripcion:[''],
      observacion:[''],
      fecha_itinerario:[''],
      instructor:[''],
      titulo:[''],
      id_entidad:['']
    });
    this.itinerarioModel = new ItinerarioModel(0,0,"","","","","","","","","","","",false,false,false,false);
  }

  ngOnInit(): void {
    this.obtenerEntidades();
  }

  buscarPorFiltro() {
    
    let dataString: { [id: string]: string } = {};

    for (const [key, value] of Object.entries(this.itinerarioModel)) {
      if (value && typeof value == "string") {
        dataString[key.toString()] = value;
      }
    }
    this._itinerarioService.filtroItinerario(dataString).subscribe(Response => {
      this.cursos=[];
      Response.ResultSet.rows.forEach((element: any) => {
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

  obtenerEntidades(){
    this._entidadService.getNombres().subscribe(Response =>{
      this.entidades = []
      Response.ResultSet.forEach((element:any) => {
        this.entidades.push({ 
          ...element 
        })       
      })
    });
  }

}
