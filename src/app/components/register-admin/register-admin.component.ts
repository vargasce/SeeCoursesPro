import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AdministradorModel } from 'src/app/core/models/administrador/administrador.model';
import { UsuarioModel } from 'src/app/core/models/usuario/usuario.model';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from 'src/app/core/service/usuario/usuario.service';
import { RegistrarAdminService } from 'src/app/core/service/administrador/admin-registrar.service';
import { fechas } from 'src/app/core/custom/fechas';
import { Usuario_AdminModel } from 'src/app/core/models/usuario_admin/usuario_admin.model';
import { RolesService } from 'src/app/core/service/roles/roles.service';
import { Usuario_AdminService } from 'src/app/core/service/user_admin/user_admin.service';

@Component({
  selector: 'app-register-admin',
  templateUrl: './register-admin.component.html',
  styleUrls: ['./register-admin.component.css']
})
export class RegisterAdminComponent implements OnInit {

  registrarAdmin: FormGroup;
  submitted = false;
  adminModel: AdministradorModel
  loading: boolean = false;
  usuarioModel: Usuario_AdminModel;
  registrarUsuario: FormGroup;
  validarPass = true;
  fecha = new fechas();
  today = this.fecha.currentDate();
  roles: any[] = [];
  dniValido: boolean = true;
  validarRol: boolean = true;
  mailValido: boolean = true;
  usuarioExistente = false;
  dniExistente = false;



  constructor(
    private fb: FormBuilder,
    private aRoute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private toastr: ToastrService,
    private _usuarioService: Usuario_AdminService,
    private _adminService: RegistrarAdminService,
    private _roles: RolesService,
  ) {
    this.registrarAdmin = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.required],
      dni: ['', Validators.required],

    })

    this.registrarUsuario = this.fb.group({
      usuario: ['', Validators.required],
      contrasenia: ['', Validators.required],
      id_rol: ['', Validators.required],
    })

    this.adminModel = new AdministradorModel(0, this.today, true, "", "", "", "");
    this.usuarioModel = new Usuario_AdminModel(0, 0, 0, "", "", "", false, true);
  }

  ngOnInit(): void {
    this.getRoles();
  }

  isMailValid(): boolean {
    let mail = (<HTMLInputElement>document.getElementById('mail')).value;
    const regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    this.mailValido = regexp.test(mail);
    return this.mailValido
  }

  async addAdmin() {
    this.submitted = true;
    this.confirmarContrasena();
    this.validarRoles();
    this.isMailValid();
     //await this.validarDni(Number(this.adminModel.dni));
    this.usuarioExistente = await this.validarUserName();
    if (!this.usuarioExistente) {
      if (!this.registrarAdmin.invalid && !this.registrarUsuario.invalid && this.validarPass && this.validarRol && this.mailValido && this.dniValido && !this.dniExistente) {
        this.registrarAdministrador();
      } else {
        return
      }
    }



  }

  confirmarContrasena() {
    if ((<HTMLInputElement>document.getElementById('contrasenia')).value != (<HTMLInputElement>document.getElementById('confirm_pass')).value) {
      this.validarPass = false;
    } else {
      this.validarPass = true;
    }
  }


  async registrarAdministrador() {
    this.loading = true;
    this.adminModel.dni = this.adminModel.dni.toString();
    (<HTMLInputElement>document.getElementById('btn-submit')).disabled = true;
    this._adminService.registrarAdmin_userAdmin(this.adminModel, this.usuarioModel).subscribe(async Response => {
      if (Response.error == "") {
        this.toastr.success("Administrador agregado correctamente", "Administrador Agregado", {
          positionClass: 'toast-bottom-right'
        });
        this.loading = false;
        this.router.navigate(['/admin']);
      } else {
        this.toastr.error("Ocurrio un error al registrar el administrador", "Ocurrio un error", {
          positionClass: 'toast-bottom-right'
        });
        this.router.navigate(['/admin']);
      }
      (<HTMLInputElement>document.getElementById('btn-submit')).disabled = false;
    },
      error => {
        // this.usuarioExistente=true;
        this.loading = false;
      });
  }

  getRoles() {
    this._roles.getRoles().subscribe(
      response => {
        console.log(response);
        this.roles = [];
        response.ResultSet.forEach((element: any) => {
          this.roles.push({
            ...element
          })
        });
      });
  }

  validarRoles() {
    if (this.usuarioModel.id_rol == 0) {
      this.validarRol = false;
    } else {
      this.validarRol = true;
    }
  }

  public validarUserName(): Promise<boolean> {
    return new Promise((resolve, reject) => {

      try {
        this._usuarioService.verifyUser(this.usuarioModel.usuario).subscribe(Response => {
          resolve(false)
        },
          Error => {
            resolve(true);
          }
        );
      } catch (err) {
        this.toastr.error(`Error validando el usuario`, "Ocurrio un error", {
          positionClass: 'toast-bottom-right'
        });
      }
    });
  }

  public async validarDni(dni: number) {
    if (dni > 99999999) {
      this.dniValido = false;
    } else {
      //llamar al metodo que valida uniq
     this.dniExistente = await this.validarDniExistente(dni);
      this.dniValido = true;
    }
  }

  public validarDniExistente(dni:number): Promise<boolean>{
    return new Promise((resolve, reject) => {

      try {
        this._usuarioService.validarDni(dni).subscribe(Response => {
          resolve(false)
        },
          Error => {
            resolve(true);
          }
        );
      } catch (err) {
        this.toastr.error(`Error validando el dni`, "Ocurrio un error", {
          positionClass: 'toast-bottom-right'
        });
      }
    });
  }

}
