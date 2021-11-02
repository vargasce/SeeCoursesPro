import { Component, OnInit } from '@angular/core';
import { ComponentsModule } from 'src/app/components/components.module';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  nuevasCanciones: any[] = [];

  constructor() { 

  }

  ngOnInit(): void {
  }

}
