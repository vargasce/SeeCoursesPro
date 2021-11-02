import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorModel } from 'src/app/core/models/administrador/administrador.model';
import { UsuarioModel } from 'src/app/core/models/usuario/usuario.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  registrarAdmin : FormGroup;
  submitted= false;
  adminModel: AdministradorModel
  loading :boolean = false;
  usuarioModel: UsuarioModel;
  registrarUsuario:FormGroup;
  validarPass=true;

  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router:Router,
    private location : Location,
    private toastr: ToastrService
    ) {
    this.registrarAdmin = this.fb.group({
      pass:['',Validators.required],
      pass_extremo:['',Validators.required],
      usuario:['',Validators.required],

    })

    this.registrarUsuario = this.fb.group({
      usuario:['',Validators.required],
      pass:['',Validators.required],
    })

    this.adminModel = new AdministradorModel(0,"","","",true,"");
    this.usuarioModel = new UsuarioModel(0,"","","",true);
   }

  ngOnInit(): void {
  }

  addAdmin() {
    this.submitted = true;
    console.log(this.usuarioModel);
    console.log(this.adminModel);
    if (!this.registrarAdmin.invalid && !this.registrarUsuario.invalid && this.validarPass ) {
      this.registrarAdministrador();
    }else{
      return
    }


  }

  confirmarContrasena(){
    if((<HTMLInputElement>document.getElementById('pass')).value!=(<HTMLInputElement>document.getElementById('confirm_pass')).value){
      this.validarPass = false;
    }else{
      this.validarPass = true;
    }
  }

  registrarAdministrador(){
    
  }
}
