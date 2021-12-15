import { Injectable } from "@angular/core";
import { Router, CanActivate } from "@angular/router";
import { Usuario_AdminService } from '../service/user_admin/user_admin.service';

@Injectable({
    providedIn : 'root'
})
export class CanActivateAdmin implements CanActivate {

    constructor(
        private _router : Router,
        private _serviceUserAdmin : Usuario_AdminService
    ){
    }

    async canActivate():Promise<boolean>{

        let result = await this._serviceUserAdmin.verifyUserToken( String(sessionStorage.getItem('token')) ).toPromise();

        if( result.ResultSet == false ){
            this._router.navigate(['/home']);
        }

        return Promise.resolve( result.ResultSet );
    }

}