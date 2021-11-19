import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogoConfirmacionComponent } from '../dialogo-confirmacion/dialogo-confirmacion.component';

@Component({
  selector: 'app-dialogo-fechas',
  templateUrl: './dialogo-fechas.component.html',
  styleUrls: ['./dialogo-fechas.component.css']
})
export class DialogoFechasComponent implements OnInit {

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
