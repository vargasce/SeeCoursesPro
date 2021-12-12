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
    let user = localStorage.getItem('user');
    if(user!=null){
      this.toastr.error("Por favor cierre la sesion anterior para iniciar una nueva","Ya hay un usuario logeado en esta pc",{
        positionClass:'toast-bottom-right'
      });
    }else{
      if(!this.cheked){
        this._LoginService.login(this.logearUsuario.value.user,this.logearUsuario.value.password,tipo).subscribe(
          response => {
            if( response.error == "" ){
              console.log(response);
              localStorage.setItem('token',response.Resultset.token);//token
              localStorage.setItem('user',this.logearUsuario.value.user);//user
              //this.sesionExpirada();
              if(tipo == "admin"){
                localStorage.setItem('rol',response.Resultset.user.rol_usadmin);
                localStorage.setItem('email_administrador',response.Resultset.user.email_administrador); // rol
                localStorage.setItem('usadmin_passactualizado',response.Resultset.user.usadmin_passactualizado)
                localStorage.setItem('id_administrador',response.Resultset.user.id_administrador) 
                this._navegador.navigate(['/admin']);
              }else{
                localStorage.setItem('id_entidad',response.Resultset.user.id_entidad)//user
                localStorage.setItem('nombre_entidad',response.Resultset.user.nombre_entidad); //nombre 
                localStorage.setItem('email_entidad',response.Resultset.user.email); // email
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
              localStorage.setItem('token',response.Resultset.token);//token
              localStorage.setItem('user',this.logearUsuario.value.user);//user
              //this.sesionExpirada();
              if(tipo == "admin"){
                localStorage.setItem('rol',"99");
                localStorage.setItem('email_administrador',response.Resultset.user.email_administrador); // rol
                localStorage.setItem('usadmin_passactualizado',response.Resultset.user.usadmin_passactualizado)
                localStorage.setItem('id_administrador',response.Resultset.user.id_administrador) 
                this._navegador.navigate(['/admin']);
              }else{
                localStorage.setItem('id_entidad',response.Resultset.user.id_entidad)//user
                localStorage.setItem('nombre_entidad',response.Resultset.user.nombre_entidad); //nombre 
                localStorage.setItem('email_entidad',response.Resultset.user.email); // email
                this._navegador.navigate(['/entidad/listarCursos']);
              }
            }
          },
          error => {
            this.usuarioIncorrecto= true;
          });
      }
    }
    
    
  }

  sesionExpirada(){
    setTimeout(() => {
      alert("La Sesión expiró")
     // localStorage.clear();
      this._navegador.navigate(['/']);
     }, 60000);//3600000ms = 1hs
  }

  checkbox(){
    this.cheked = !this.cheked;
    console.log(this.cheked);
  }
}
