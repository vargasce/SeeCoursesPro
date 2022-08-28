import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar-admin-general',
  templateUrl: './navbar-admin-general.component.html',
  styleUrls: ['./navbar-admin-general.component.css']
})
export class NavbarAdminGeneralComponent implements OnInit {

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    // Note that we provide the icon here as a string literal here due to a limitation in
// Stackblitz. If you want to provide the icon from a URL, you can use:
// `iconRegistry.addSvgIcon('thumbs-up', sanitizer.bypassSecurityTrustResourceUrl('icon.svg'));`
iconRegistry.addSvgIcon('login', sanitizer.bypassSecurityTrustResourceUrl('assets/img/login.svg'));
}

  ngOnInit(): void {
  }

}
