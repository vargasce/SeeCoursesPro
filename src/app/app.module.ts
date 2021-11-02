import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { ItinerariosService } from './core/service/home-service/home.service';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdministradorService } from './core/service/administrador/administrador.service';
import { EntidadService } from './core/service/entidad/entidad.service';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    PagesModule.forRoot(),
    BrowserAnimationsModule,
    ToastrModule.forRoot(),

  ],
  providers: [
    ItinerariosService,
    AdministradorService,
    EntidadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
