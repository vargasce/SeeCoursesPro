import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { PaisesModel } from 'src/app/core/models/paises/paises.model';
import { PaisService } from 'src/app/core/service/paises/paises.service';

@Component({
  selector: 'app-agregar-paises',
  templateUrl: './agregar-paises.component.html',
  styleUrls: ['./agregar-paises.component.css']
})
export class AgregarPaisesComponent implements OnInit {

  agregarPaises : FormGroup;
  submitted= false;
  paisesModel: PaisesModel;
  loading :boolean = false;
  titulo = 'Agregar Paises'
  id: number = -1;

  constructor(
    private fb: FormBuilder,
    private _paisesService: PaisService,
    private router:Router,
    private toastr: ToastrService,
    private aRoute: ActivatedRoute,
  ) {
    this.agregarPaises = this.fb.group({
      descripcion:['',Validators.required]
    })
    this.paisesModel = new PaisesModel(0,"");
    this.id = Number(this.aRoute.snapshot.paramMap.get('id')); //capturo el id del registro que quiero modificar
   }

  ngOnInit(): void {
    this.esEditar();
  }

  addEditPaises(){
    this.submitted = true;
    
    if(this.agregarPaises.invalid){
      return;
    }
    if (this.id == 0) { // si el id es 0 agrego un nuevo laboratorio, sino lo edito
      this.addPais();
    } else {
      this.editPais();
    }
  }

  esEditar(){ 
    if(this.id !== 0){
      this.titulo = 'Editar/Ver Paises';
      this.loading=true
      this._paisesService.getPaisesById(this.id).subscribe(Response =>{
        console.log(Response)
        this.paisesModel = Response.Resultset[0];
        this.loading=false
      })
    }
  }

  addPais(){
    this.loading=true
    this._paisesService.guardarPais(this.paisesModel).subscribe(Response =>{
      this.loading=false
      if(Response.error == ""){
        this.toastr.success("El Pais fue agregado con exito!","Pais Agregado",{
          positionClass:'toast-bottom-right'
        });
      }else{
        this.toastr.error("Ocurrio un error al agregar el Pais","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      }
    })
    this.router.navigate(['/home/paises']);
    
  }

  editPais(){
    this.loading=true
    this._paisesService.editarPaises(this.paisesModel.id,this.paisesModel).subscribe(Response =>{
      this.loading=false
      if(Response.error == ""){
        this.toastr.success("El Pais fue editado con exito!","Pais Editado",{
          positionClass:'toast-bottom-right'
        });
      }else{
        this.toastr.error("Ocurrio un error al editar el Pais","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      }
    })
    this.router.navigate(['/home/paises']);
  }

}
