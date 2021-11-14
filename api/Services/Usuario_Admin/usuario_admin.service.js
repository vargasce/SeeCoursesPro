'use strict'

const { QueryAwait } = require('../../DB-connect/connectDB');
const UsuarioAdminModel = require('../../Models/usuario_admin/usuario_admin.model');
const UsuarioError = require('../../Error/UsuarioAdmin/usuario_admin.error');
const fn = require('../../Custom/function_custom/custom')

class UsuarioAdmin{

    constructor(){}

    /** ADD NUEVO USUARIO ADMIN
     * @Observations => Insertar nuevo usuario admin.
     * @param { object } data => Datos a ingresar.
     * @returns { Promise } => new Promise.
     */
    addUsuarioAdmin( data ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType( 'object', data );
            }catch( err ){
                reject( err );
            }

            let usuarioAdmin = new UsuarioAdminModel( data );
            let sql = usuarioAdmin.getSqlStringAddAdmin();

            try{
                await QueryAwait('BEGIN');
                let result = await QueryAwait( sql );
                let ok = await QueryAwait('COMMIT');
                if ( ok ) resolve( result );

            }catch( err ){
                await QueryAwait('ROLLBACK');
                reject( new UsuarioError( 'Error Usuario Admin', `Error al insertar Usuario Admin : ${err}`));
            }

        }).catch( error => { throw error });
    }
}

module.exports = new UsuarioAdmin();