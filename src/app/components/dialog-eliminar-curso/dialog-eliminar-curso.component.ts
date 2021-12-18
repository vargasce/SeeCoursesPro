import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-dialog-eliminar-curso',
  templateUrl: './dialog-eliminar-curso.component.html',
  styleUrls: ['./dialog-eliminar-curso.component.css']
})
export class DialogEliminarCursoComponent implements OnInit {

  completarObservacion:boolean = true;
  constructor(
    public dialogo: MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      this.dialogo.close(true);

    }

  ngOnInit() {
  }
}
