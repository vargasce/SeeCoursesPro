'use strict'

const { QueryAwait } = require('../../DB-connect/connectDB');
const UsuarioAdminModel = require('../../Models/usuario_admin/usuario_admin.model');
const UsuarioError = require('../../Error/UsuarioAdmin/usuario_admin.error');
const fn = require('../../Custom/function_custom/custom');
const { CallTracker } = require('assert/strict');

class UsuarioAdmin{

    constructor(){}

    /** ADD NUEVO USUARIO ADMIN
     * @Observations => Insertar nuevo usuario admin.
     * @param { object } data => Datos a ingresar.
     * @returns { Promise } => new Promise.
     */
    async addUsuarioAdmin( data ){
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

    /** UPDATE PASS CHANGUE
     * @Observations => Actualizar cambio de pass del usuario.
     * @param { boolean } changue => Datos a ingresar.
     * @returns { Promise } => new Promise.
     */
    async updateChanguePassword( changue ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType('boolean', changue);
            }catch( err ){
                reject( err );
            }

            let usuarioAdmin = new UsuarioAdminModel();
            let sql = usuarioAdmin.getSlqStringUpdateChanguePass( changue );

            try{

                await QueryAwait('BEGIN');
                let result = await QueryAwait( sql );
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve( result );

            }catch( err ){
                await QueryAwait('ROLLBACK');
                reject( new UsuarioError( 'Error Usuario Admin', `Error al actualizar cambio password : ${err} .`) );
            }

        }).catch( error => { throw error; });
    }

    /** UPDATE USUARIO ADMIN
     * @Observations => Actualizar contraseña
     * @param { object } data => Nuevos datos a actualizar.
     * @returns { Promise } => new Prmise.
     */
    async updateUsuarioAdmin ( data ){
        return new Promise( async ( resolve, reject ) =>{

            try{
                fn.validateType( 'object', data );
            }catch( err ){
                reject( err );
            }

            let usuarioAdmin = new UsuarioAdminModel();
            let sql = usuarioAdmin.getSqlStringUpdataCredenciales( data );

            try{

                await QueryAwait('BEGIN');
                let result = await QueryAwait( sql );
                let ok = await QueryAwait('COMMIT');
                if( ok ) resolve( result );

            }catch( err ){
                await QueryAwait('ROLLBACK');
                reject( new UsuarioError( 'Error Usuario Admin', `Erro al actualizar nuevas credenciales : ${err}` ) );
            }
            
        });
    }

}

module.exports = new UsuarioAdmin();