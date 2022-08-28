import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ActividadesModel } from 'src/app/core/models/actividades/actividades.model';
import { ActividadesService } from 'src/app/core/service/actividades/actividades.service';

@Component({
  selector: 'app-agregar-actividades',
  templateUrl: './agregar-actividades.component.html',
  styleUrls: ['./agregar-actividades.component.css']
})
export class AgregarActividadesComponent implements OnInit {

  agregarActividad : FormGroup;
  submitted= false;
  actividadModel: ActividadesModel;
  loading :boolean = false;
  titulo = 'Agregar Actividades'
  id: number = -1;

  constructor(
    private fb: FormBuilder,
    private _actividadesService: ActividadesService,
    private router:Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
  ) {
    this.agregarActividad = this.fb.group({
      descripcion:['',Validators.required]
    })
    this.actividadModel = new ActividadesModel(0,"");
    this.id = Number(this.aRoute.snapshot.paramMap.get('id')); //capturo el id del registro que quiero modificar
   }

  ngOnInit(): void {
    this.esEditar();
  }

  addEditActividad(){
    this.submitted = true;
    
    if(this.agregarActividad.invalid){
      return;
    }
    if (this.id == 0) { // si el id es 0 agrego un nuevo laboratorio, sino lo edito
      this.addActividad();
    } else {
      this.editActividad();
    }
  }

  esEditar(){ 
    if(this.id !== 0){
      this.titulo = 'Editar/Ver Actividades';
      this.loading=true
      this._actividadesService.getActividadById(this.id).subscribe(Response =>{
        this.actividadModel = Response.ResultSet[0];
        this.loading=false
      })
    }
  }

  addActividad(){
    this.loading=true
    this._actividadesService.guardarActividad(this.actividadModel).subscribe(Response =>{
      this.loading=false
      if(Response.error == ""){
        this.toastr.success("La Actividad fue agregada con exito!","Actividad Agregada",{
          positionClass:'toast-bottom-right'
        });
      }else{
        this.toastr.error("Ocurrio un error al agregar La Actividad","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      }
    })
    this.router.navigate(['/adminGeneral/actividades']);
    
  }

  editActividad(){
    this.loading=true
    this._actividadesService.editarActividad(this.actividadModel.id,this.actividadModel).subscribe(Response =>{
      this.loading=false
      if(Response.error == ""){
        this.toastr.success("La Actividad fue editada con exito!","Actividad Editada",{
          positionClass:'toast-bottom-right'
        });
      }else{
        this.toastr.error("Ocurrio un error al editar la Actividad","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      }
    })
    this.router.navigate(['/adminGeneral/actividades']);
  }


}
