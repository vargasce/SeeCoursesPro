import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-entidad',
  templateUrl: './entidad.component.html',
  styleUrls: ['./entidad.component.css']
})
export class EntidadComponent implements OnInit {
  cursos:any[]=[];
  cursosFinalizados:any[]=[];
  cursosPendientes:any[]=[];
  cursosRechazados:any[]=[];
  displayStyle: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  openPopup(id:number) {
    this.displayStyle[id] = "block";
  }
  closePopup(id:number) {
    this.displayStyle[id] = "none";
  }


}
