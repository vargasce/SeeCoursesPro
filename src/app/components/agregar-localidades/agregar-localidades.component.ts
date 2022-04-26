import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Localidad_ProcedenciaModel } from 'src/app/core/models/localidad_procedencia/localidad_procedencia.model';
import { ProvinciasModel } from 'src/app/core/models/provincias/provincias.model';
import { Localidades_procedenciasService } from 'src/app/core/service/localidades_procedencias/localidades_procedencias.service';
import { PaisService } from 'src/app/core/service/paises/paises.service';
import { ProvinciasService } from 'src/app/core/service/provincias/provincias.service';

@Component({
  selector: 'app-agregar-localidades',
  templateUrl: './agregar-localidades.component.html',
  styleUrls: ['./agregar-localidades.component.css']
})
export class AgregarLocalidadesComponent implements OnInit {

  @ViewChild('id_paisForm') id_paisForm:ElementRef | undefined;
  @ViewChild('id_provinciaForm') id_provinciasForm:ElementRef | undefined;
  
  agregarLocalidades : FormGroup;
  submitted= false;
  loading :boolean = false;
  titulo = 'Agregar Localidad'
  id: number = -1;
  paises: any[] = [];
  provincias: any[] = [];
  localidadModel: Localidad_ProcedenciaModel;

  constructor(
    private fb: FormBuilder,
    private _localidadService: Localidades_procedenciasService,
    private _paisService: PaisService,
    private _provinciasService: ProvinciasService,
    private router:Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
    public renderer:Renderer2,
  ) { 
    this.agregarLocalidades = this.fb.group({
      id_provincia:['',Validators.required],
      localidad:['',Validators.required]
    })
    this.localidadModel = new Localidad_ProcedenciaModel(0,0,"","");
    this.id = Number(this.aRoute.snapshot.paramMap.get('id')); //capturo el id del registro que quiero modificar
  }

  ngOnInit(): void {
    (<HTMLInputElement>document.getElementById('id_provincia')).disabled=true;
    this.esEditar();
    this.obtenerPaises();
  }
  ngAfterViewInit(): void{
    this.eventChange();
  }

  addEditLocalidades(){
    this.submitted = true;
    
    if(this.agregarLocalidades.invalid){
      return;
    }
    if (this.id == 0) { // si el id es 0 agrego un nuevo laboratorio, sino lo edito
      this.addLocalidad();
    } else {
      this.editLocalidades();
    }
  }

  esEditar(){ // si el usuario selecciona editar, traigo el laboratorio en cuestion y lo muestro por pantalla
    if(this.id !== 0){
      this.titulo = 'Editar/Ver Localidad';
      this.loading=true
      this._localidadService.getLocalidadById(this.id).subscribe(Response =>{
        this.localidadModel = Response.ResultSet[0];
        this.loading=false
      })
    }
  }

  addLocalidad(){
    this.loading=true;
    this._localidadService.guardarLocalidad(this.localidadModel).subscribe(Response =>{
      this.loading=false
      if(Response.error == ""){
        this.toastr.success("La Localidad fue agregada con exito!","Localidad Agregada",{
          positionClass:'toast-bottom-right'
        });
      }else{
        this.toastr.error("Ocurrio un error al agregar la Localidad","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      }
    })
    this.router.navigate(['/adminGeneral/localidades']);
    
  }

  editLocalidades(){
    this.loading=true
    this._localidadService.editarLocalidad(this.localidadModel).subscribe(Response =>{
      this.loading=false
      if(Response.error == ""){
        this.toastr.success("La Localidad fue editada con exito!","Localidad Editada",{
          positionClass:'toast-bottom-right'
        });
      }else{
        this.toastr.error("Ocurrio un error al editar la Localidad","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      }
    })
    this.router.navigate(['/adminGeneral/localidades']);
  }

//Parametrizacion
  obtenerPaises(){
    this._paisService.getPaises().subscribe(Response =>{
      this.paises = []
      Response.Resultset.forEach((element:any) => {
        this.paises.push({ 
          ...element 
        })       
      })
    });
  }

  obtenerProvincias(id:number){
    this._provinciasService.getProvinciasByIdPais(id).subscribe(Response =>{
      this.provincias = []
      Response.Resultset.forEach((element:any) => {
        this.provincias.push({ 
          ...element 
        })       
      })
    });
  }

  eventChange(){


    this.renderer.listen(this.id_paisForm?.nativeElement,'change',event =>{
      this.obtenerProvincias(Number((<HTMLInputElement>document.getElementById('id_pais')).value));
      this.localidadModel.id_provincia = 0;

    });

    this.renderer.listen(this.id_paisForm?.nativeElement,'change',event =>{

      (<HTMLInputElement>document.getElementById('id_provincia')).disabled=false;

    });

  }

}
