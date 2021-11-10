import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProvinciasModel } from 'src/app/core/models/provincias/provincias.model';
import { PaisService } from 'src/app/core/service/paises/paises.service';
import { ProvinciasService } from 'src/app/core/service/provincias/provincias.service';

@Component({
  selector: 'app-agregar-provincias',
  templateUrl: './agregar-provincias.component.html',
  styleUrls: ['./agregar-provincias.component.css']
})
export class AgregarProvinciasComponent implements OnInit {

  agregarProvincias : FormGroup;
  submitted= false;
  provinciasModel: ProvinciasModel;
  loading :boolean = false;
  titulo = 'Agregar Provincias'
  id: number = -1;
  paises: any[] = [];

  constructor(
    private fb: FormBuilder,
    private _provinciasService: ProvinciasService,
    private _paisService: PaisService,
    private router:Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
  ) { 
    this.agregarProvincias = this.fb.group({
      id_pais:['',Validators.required],
      descripcion:['',Validators.required]
    })
    this.provinciasModel = new ProvinciasModel(0,0,"");
    this.id = Number(this.aRoute.snapshot.paramMap.get('id')); //capturo el id del registro que quiero modificar
  }

  ngOnInit(): void {
    this.esEditar();
    this.obtenerPaises();
  }


  addEditProvincias(){
    this.submitted = true;
    
    if(this.agregarProvincias.invalid){
      return;
    }
    if (this.id == 0) { // si el id es 0 agrego un nuevo laboratorio, sino lo edito
      this.addProvincia();
    } else {
      this.editProvincia();
    }
  }

  esEditar(){ // si el usuario selecciona editar, traigo el laboratorio en cuestion y lo muestro por pantalla
    if(this.id !== 0){
      this.titulo = 'Editar/Ver Provincias';
      this.loading=true
      this._provinciasService.getProvinciaById(this.id).subscribe(Response =>{
        console.log(Response.ResultSet)
        this.provinciasModel = Response.ResultSet[0];
        this.loading=false
      })
    }
  }

  addProvincia(){
    this.loading=true;
    this._provinciasService.guardarProvincia(this.provinciasModel).subscribe(Response =>{
      this.loading=false
      if(Response.error == ""){
        this.toastr.success("La Provincia fue agregada con exito!","Provincia Agregado",{
          positionClass:'toast-bottom-right'
        });
      }else{
        this.toastr.error("Ocurrio un error al agregar la Provincia","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      }
    })
    this.router.navigate(['/adminGeneral/provincias']);
    
  }

  editProvincia(){
    this.loading=true
    this._provinciasService.editarProvincia(this.provinciasModel.id_pais,this.provinciasModel.id,this.provinciasModel.descripcion).subscribe(Response =>{
      this.loading=false
      if(Response.error == ""){
        this.toastr.success("La Provincia fue editada con exito!","Provincia Editada",{
          positionClass:'toast-bottom-right'
        });
      }else{
        this.toastr.error("Ocurrio un error al editar la Provincia","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      }
    })
    this.router.navigate(['/adminGeneral/provincias']);
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

}
