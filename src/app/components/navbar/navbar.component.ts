import { Component, OnInit } from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    // Note that we provide the icon here as a string literal here due to a limitation in
// Stackblitz. If you want to provide the icon from a URL, you can use:
// `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
iconRegistry.addSvgIcon('login', sanitizer.bypassSecurityTrustResourceUrl('assets/img/login.svg'));
}

  ngOnInit(): void {
  }

}
