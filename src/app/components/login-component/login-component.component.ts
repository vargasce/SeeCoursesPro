import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { relativeTimeThreshold } from 'moment';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from 'src/app/core/service/login/login.service';


@Component({
  selector: 'app-login-component',
  templateUrl: './login-component.component.html',
  styleUrls: ['./login-component.component.css']
})
export class LoginComponentComponent implements OnInit {
  @Input() tipo:string = "";

  logearUsuario : FormGroup;
  submitted= false;
  timeLeft: number = 60;
  usuarioIncorrecto:boolean=false;
  cheked:boolean = false;
  constructor(
    private fb: FormBuilder, 
    private _LoginService: LoginService,
    private _navegador : Router,
    private toastr: ToastrService,
  ) { 
    this.logearUsuario = this.fb.group({
      user:['',Validators.required],
      password:['',Validators.required],
    })
  }

  ngOnInit(): void {
  }

  loginUsuario(tipo:string){
    this.submitted = true; 
    let user = sessionStorage.getItem('user');
      if(!this.cheked){
        this._LoginService.login(this.logearUsuario.value.user,this.logearUsuario.value.password,tipo).subscribe(
          response => {
            if( response.error == "" ){
              sessionStorage.setItem('token',response.Resultset.token);//token
              sessionStorage.setItem('user',this.logearUsuario.value.user);//user
              //this.sesionExpirada();
              if(tipo == "admin"){
                sessionStorage.setItem('rol',response.Resultset.user.rol_usadmin);
                sessionStorage.setItem('email_administrador',response.Resultset.user.email_administrador); // rol
                sessionStorage.setItem('usadmin_passactualizado',response.Resultset.user.usadmin_passactualizado);
                sessionStorage.setItem('id_administrador',response.Resultset.user.id_administrador) ;
                this._navegador.navigate(['/admin']);
              }else{
                sessionStorage.setItem('id_entidad',response.Resultset.user.id_entidad)//user
                sessionStorage.setItem('nombre_entidad',response.Resultset.user.nombre_entidad); //nombre 
                sessionStorage.setItem('email_entidad',response.Resultset.user.email); // email
                this._navegador.navigate(['/entidad/listarCursos']);
              }
            }
          },
          error => {
            this.usuarioIncorrecto= true;
          });
      }else{
        this._LoginService.loginProgramador(this.logearUsuario.value.user,this.logearUsuario.value.password,tipo).subscribe(
          response => {
            if( response.error == "" ){
              //let sesionObject = {'token': response.Resultset.token, 'user':this.logearUsuario.value.user,}
              sessionStorage.setItem('token',response.Resultset.token);//token
              sessionStorage.setItem('user',this.logearUsuario.value.user);//user
              //this.sesionExpirada();
              if(tipo == "admin"){
                sessionStorage.setItem('rol',"99");
                sessionStorage.setItem('email_administrador',response.Resultset.user.email_administrador); // rol
                sessionStorage.setItem('usadmin_passactualizado',response.Resultset.user.usadmin_passactualizado)
                sessionStorage.setItem('id_administrador',response.Resultset.user.id_administrador) 
                this._navegador.navigate(['/admin']);
              }else{
                sessionStorage.setItem('id_entidad',response.Resultset.user.id_entidad)//user
                sessionStorage.setItem('nombre_entidad',response.Resultset.user.nombre_entidad); //nombre 
                sessionStorage.setItem('email_entidad',response.Resultset.user.email); // email
                this._navegador.navigate(['/entidad/listarCursos']);
              }
            }
          },
          error => {
            this.usuarioIncorrecto= true;
          });
      }
    
    
  }

  sesionExpirada(){
    setTimeout(() => {
      alert("La Sesión expiró")
     // sessionStorage.clear();
      this._navegador.navigate(['/']);
     }, 60000);//3600000ms = 1hs
  }

  checkbox(){
    this.cheked = !this.cheked;
  }
}
