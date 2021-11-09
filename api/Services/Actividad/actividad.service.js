'use strict'

const con = require('../../DB-connect/connectDB');
const actividadModel = require('../../Models/actividad/actividad.model');
const actividadError = require('../../Error/Actividad/actividad.error');

class ActividadService{

    constructor(){}

    /** ADD NEW PROMISE
     * @Observations => Insertar nueva actividad.
     * @param { Object } data => Datos a insertar.
     * @returns { Promise } => new promise.
     */
    static async addActividad( data ){
        return new Promise( async ( resolve, reject) =>{

            let actModel = new actividadModel( data );            
            let sqlAddActividad = actModel.getSqlAddActividad();

            try{

                await con.QueryAwait('BEGIN');
                let resultAdd = con.QueryAwait( sqlAddActividad );
                let ok = await con.QueryAwait('COMMIT');
                if( ok ) resolve( resultAdd );

            }catch( err ){
                await con.QueryAwait('ROLLBACK');
                reject( new actividadError( 'Error Actividad', `Error : ${err}`));
            }
        });
    }

}