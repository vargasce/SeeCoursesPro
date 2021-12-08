import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario_AdminModel } from 'src/app/core/models/usuario_admin/usuario_admin.model';
import { Usuario_AdminService } from 'src/app/core/service/user_admin/user_admin.service';

@Component({
  selector: 'app-actualizar-clave',
  templateUrl: './actualizar-clave.component.html',
  styleUrls: ['./actualizar-clave.component.css']
})
export class ActualizarClaveComponent implements OnInit {
  
  registrarUsuario:FormGroup;
  usuarioModel: Usuario_AdminModel;
  loading= false;
  validarPass=true;
  submitted = false;
  
  constructor(
    private fb: FormBuilder,
    private _usuarioAdminService:Usuario_AdminService,
    private toastr: ToastrService,
  ) 
  {
    this.registrarUsuario = this.fb.group({
      contrasenia:['',Validators.required],
    })
    this.usuarioModel = new Usuario_AdminModel(0,0,0,"","","",false,true);
   }

  ngOnInit(): void { 
  }

  
  actualizarPass(){
    this.loading=true;
    let id_administrador = Number(localStorage.getItem('id_administrador'));
    let pass = this.usuarioModel.contrasenia;
      this._usuarioAdminService.actualizarPassAdminForget(id_administrador,pass).subscribe(Response=>{
        this.loading = false;
        console.log(Response)
        if(Response.error==""){
          this.toastr.success("La Contraseña fue cambiada con exito!","Contraseña Cambiada",{
            positionClass:'toast-bottom-right'
          });
        }else{
          this.toastr.error("Ocurrio un error al cambiar La Contraseña","Ocurrio un error",{
            positionClass:'toast-bottom-right'
          });
        }
      },error=>{
        this.toastr.error("Ocurrio un error al cambiar La Contraseña","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      });
  }

  confirmarContrasena(){
    if((<HTMLInputElement>document.getElementById('contrasenia')).value!=(<HTMLInputElement>document.getElementById('confirm_pass')).value){
      this.validarPass = false;
    }else{
      this.validarPass = true;
    }
  }

  validarPassword(){
    this.submitted = true;
    this.confirmarContrasena();
    if (!this.registrarUsuario.invalid && this.validarPass) {
      this.actualizarPass();
    }else{
      return
    }
  }
}
