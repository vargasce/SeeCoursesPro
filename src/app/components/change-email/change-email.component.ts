import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Usuario_AdminService } from 'src/app/core/service/user_admin/user_admin.service';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.css']
})
export class ChangeEmailComponent implements OnInit {

  datosPersonales : FormGroup;
  submitted= false;
  loading :boolean = false;
  titulo = 'Modificar Datos Personales'
  email:string="";
  mailValido:boolean = true;

  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private _userAdminService:Usuario_AdminService,
    private router:Router
  ) {
    this.datosPersonales = this.fb.group({
      email:['',Validators.required]
    })
   }

  ngOnInit(): void {
  }

  addEditDatosPersonales(){
    this.submitted = true;
    this.isMailValid();
    if(this.datosPersonales.invalid || !this.mailValido){
      return;
    }
    else{
      this.editEmail();
    }

  }


  editEmail(){
    this.loading=true
    this._userAdminService.updateMail(sessionStorage.getItem('id_administrador'),this.email).subscribe(Response =>{
      console.log(Response)
      this.loading=false
      if(Response.error == ""){
        this.toastr.success("El Email fue editado con exito!","Email Editado",{
          positionClass:'toast-bottom-right'
        });
      }else{
        this.toastr.error("Ocurrio un error al editar el Email","Ocurrio un error",{
          positionClass:'toast-bottom-right'
        });
      }
    })
    this.router.navigate(['/adminGeneral']);
  }

  isMailValid():boolean {
    let mail= (<HTMLInputElement>document.getElementById('email')).value;
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.mailValido=regexp.test(mail);
    return  this.mailValido
  }
}
