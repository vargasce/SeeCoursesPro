import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogo-confirmacion',
  templateUrl: './dialogo-confirmacion.component.html',
  styleUrls: ['./dialogo-confirmacion.component.css']
})
export class DialogoConfirmacionComponent implements OnInit {
  completarObservacion:boolean = true;
  constructor(
    public dialogo: MatDialogRef<DialogoConfirmacionComponent>,
    @Inject(MAT_DIALOG_DATA) public mensaje: string) { }

    cerrarDialogo(): void {
      this.dialogo.close(false);
    }
    confirmado(): void {
      if((<HTMLInputElement>document.getElementById('observacion')).value == ""){
        this.completarObservacion = false;
      }else{
        this.completarObservacion = true;
        this.dialogo.close((<HTMLInputElement>document.getElementById('observacion')).value);
      }

    }

  ngOnInit() {
  }

}
