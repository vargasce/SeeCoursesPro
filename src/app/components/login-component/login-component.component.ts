import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  constructor(
    private fb: FormBuilder, 
    private _LoginService: LoginService,
    private _navegador : Router,
  ) { 
    this.logearUsuario = this.fb.group({
      user:['',Validators.required],
      password:['',Validators.required],
    })
  }

  ngOnInit(): void {
    console.log(this.tipo)
  }

  loginUsuario(tipo:string){
    this.submitted = true; 
    this._LoginService.login(this.logearUsuario.value.user,this.logearUsuario.value.password,tipo).subscribe(
      response => {
        if( response.error == "" ){
          localStorage.setItem('token',response.Resultset.token);//token
          localStorage.setItem('user',this.logearUsuario.value.user);//user
          localStorage.setItem('nombre_entidad',response.Resultset.user.nombre_entidad); //nombre 
          localStorage.setItem('email_entidad',response.Resultset.user.email); // email
          //this.sesionExpirada();
          if(tipo == "admin"){
            
            this._navegador.navigate(['/admin']);
          }else{
            localStorage.setItem('id_entidad',response.Resultset.user.id_entidad)//user
            this._navegador.navigate(['/entidad/listarCursos']);
          }
        }
      },
      error => {
        this.usuarioIncorrecto= true;
        console.log('Gestionar error');
        console.log(error);
      });
  }

  sesionExpirada(){
    setTimeout(() => {
      alert("La Sesión expiró")
     // localStorage.clear();
      this._navegador.navigate(['/']);
     }, 60000);//3600000ms = 1hs
  }

}
