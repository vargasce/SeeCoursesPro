import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ItinerariosService } from 'src/app/core/service/home-service/home.service';
import { DialogEliminarCursoComponent } from '../dialog-eliminar-curso/dialog-eliminar-curso.component';

@Component({
  selector: 'app-delete-cursos',
  templateUrl: './delete-cursos.component.html',
  styleUrls: ['./delete-cursos.component.css']
})
export class DeleteCursosComponent implements OnInit {
  cursos: any[] = [];
  constructor(
    private _itinerariosService: ItinerariosService,
    private toastr: ToastrService,
    public dialogo: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getCursos();
  }
  getCursos() {
    this._itinerariosService.getItinerariosTotal().subscribe(

      Response => {

        this.cursos = [];
        Response.ResultSet.forEach((element: any) => {

          this.cursos.push({
            ...element
          })

        });
      });
  }

  eliminarCurso(id: number) {
    this._itinerariosService.finalizarItinerario(id).subscribe(
      Response => {
        if (Response.error == "") {
          this.toastr.success("La Actividad fue eliminada con exito!", "Actividad Eliminada", {
            positionClass: 'toast-bottom-right'
          });
          this.getCursos();
        } else {
          this.toastr.error("Ocurrio un error al eliminar la activadad", "Ocurrio un error", {
            positionClass: 'toast-bottom-right'
          });
        }
      },
      error => {
        this.toastr.error("Ocurrio un error al eliminar la activadad", "Ocurrio un error", {
          positionClass: 'toast-bottom-right'
        });
      })
  }
  dialogFechaCurso(id: number){
    this.dialogo
    .open(DialogEliminarCursoComponent, {
      data: `Esta seguro que eliminar la Actividad?`
    })
    .afterClosed()
    .subscribe(Response => {
      if(Response == true){
        this.eliminarCurso(id);
      }
    });
  }

}
