'use strict'

const con = require('../../DB-connect/connectDB');
const fn  = require('../../Custom/function_custom/custom');
const AdministradorError = require('../../Error/Administrador/administradorError');
const AdministradorModel = require('../../Models/administradorModel/administrador.model');

class AdministradorService{
    
    constructor ( ){}

    /** ADD ADMINISTRADOR
     * @Observations => Agregar nuevo administrador
     * @param { Object } data => Objecto con los datos agregar.
     * @returns { Promise } => new Promise.
     */
    async addAdministrador ( data = null ){
        return new Promise( async ( resolve, reject ) => {
            
            try{
                fn.validateType( 'object', data );
            }catch( err ){
                reject( err.getMessage() );
            }

            let admin = new AdministradorModel( data );
            let sqlAdd = admin.getSqlStringAddAdministrador();

            try{

                await con.QueryAwait( 'BEGIN' );
                let result = await con.QueryAwait( sqlAdd );
                let ok =  await con.QueryAwait( 'COMMIT' );
                if( ok ) return resolve( result );

            }catch( err ){
                await con.QueryAwait( 'ROLLBACK' );
                reject( new AdministradorError( 'Error Administradir', `Error creando Admin ${ err }`));
            }

        }).catch( error => { throw error; });
    }

}

module.exports = AdministradorService;