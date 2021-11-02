import { DOCUMENT } from '@angular/common';
import { Component, OnInit, OnDestroy, ViewEncapsulation, Inject} from '@angular/core';


@Component({
  selector: 'app-login-selector',
  templateUrl: './login-selector.component.html',
  styleUrls: ['./login-selector.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginSelectorComponent implements OnInit, OnDestroy {
  tipo:string ="";
  login:boolean = false;
 constructor( @Inject(DOCUMENT) private _document:any ) {}

  ngOnInit() {
     //this._document.body.style.background = '#4a4a4a';
}
  ngOnDestroy() {
    // remove the class form body tag
    //this._document.body.style.background = '#ffff';
  }

  admin(){
    this.tipo ="admin";
    this.mostrarLogin();
  }

  usuario(){
    this.tipo ="usuario";
    this.mostrarLogin();
  }

  mostrarLogin(){
    this.login = true;
  }
}
