import { Component, OnInit } from '@angular/core';
import { ItinerariosService } from 'src/app/core/service/home-service/home.service';

@Component({
  selector: 'app-init',
  templateUrl: './init.component.html',
  styleUrls: ['./init.component.css']
})
export class InitComponent implements OnInit {

  itinerarios: any[] = [];
  filtros:boolean = false;

  constructor(private _ItinerariosService: ItinerariosService) { 
    this._ItinerariosService.getItinerarios()
      .subscribe( Response =>{
        this.itinerarios = [];
        console.log(Response.ResultSet)
        Response.ResultSet.forEach((element:any) => {
          this.itinerarios.push({ 
            ...element 
          })
        });
      });
      
  }
  ngOnInit(): void {
  }
}
/**/
