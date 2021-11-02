'use strict'

const con = require('../../DB-connect/connectDB');
const fn = require('../../Custom/function_custom/custom');
const Entidad = require('../../Models/Entidad/entidad.model');
const EntidadError = require('../../Error/Entidad/entidadError');

const entidadService = {

  /** ADD ENTIDAD 
   * @Observations : Agregar nueva entidad.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  AddEntidad : async ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{
      
      let data = req.body.data;

      try{
        fn.validateType( 'object', data );
      }catch( err ){
        reject( err.getMessage() );
      }

      let entidad = new Entidad( data );
      let sqlAdd = entidad.getSqlString();

      try{

        await con.QueryAwait('BEGIN');
        let resultAdd = await con.QueryAwait( sqlAdd ).catch( err => { throw err } );
        let ok = await con.QueryAwait('COMMIT');
        if ( ok ) resolve( resultAdd.rows[0] );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( new EntidadError( 'Error Entidad', `Error in add Entidad : ${err}` ) );
      }

    }).catch( error => { throw error; } );
  },

  /** UPDATE VERIFICADO
   * @Observations : Update es verificado.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  UpdateVerificadoEntidad : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{
      
      let data = req.body.data;
      try{
        fn.validateType( 'object', data );
      }catch( err ){
        reject( err.getMessage() );
      }

      let entidad = new Entidad( );
      entidad.setVerificado( data.verificado );
      entidad.setId( data.id );
      let sql = entidad.getSqlStringUpdateVerificado();

      con.update( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          reject( error );
        }
      });

    });
  },

  /** UPDATE VERIFICADO ID
   * @Observations : Actualizar entidad , validar o rechazar.
   * @param   { string } id => identificador de entidad.
   * @param   { boolean } verificado => Es verificado.
   * @returns { Promise } => new Promise.
   */
  UpdateVerificadoEntidadID : async ( id_entidad, verificado ) =>{
    return new Promise( async ( resolve, reject ) =>{
      
      try{
        //fn.validateType( 'number', id_entidad );
        //fn.validateType( 'boolean', verificado );
      }catch( err ){
        reject( err );
      }

      let sql = getSqlUpdateValidadoEntidad( id_entidad, verificado );

      try{

        await con.QueryAwait('BEGIN');
        let resultUpdate = await con.QueryAwait( sql );
        let ok = await con.QueryAwait('COMMIT');
        if( ok ) resolve( resultUpdate );

      }catch( err ){
        await con.QueryAwait('ROLLBACK');
        reject( new EntidadError('Error Entidad', `Error actualizar verificado : ${err}`) );
      }

    }).catch( error => { throw error } );
  },

  /** UPDATE ENTIDAD
   * @Observations : Update Entidad.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  UpdateEntidad : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{
      
      let data = req.body.data;

      try{
        fn.validateType( 'object', data );
      }catch( err ){
        reject( err.getMessage() );
      }

      let entidad = new Entidad( data );
      let sql = entidad.getSqlStringUpdate();

      con.update( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          reject( error );
        }
      });

    });
  },


  /** LIST ENTIDAD
   * @Observations : Update Entidad.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  ListEntidad : ( req ) => {
    return new Promise( ( resolve, reject ) =>{
      
      let data = req.body.data;
      try{
        fn.validateType( 'object', data );
      }catch( err ){
        reject( err.getMessage() );
      }

      let entidad = new Entidad();
      let sql;

      try{
        sql = entidad.getSqlStringList( data );
      }catch( err ){
        reject( err.getMessage() );
      }

      con.select( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          resolve( error );
        }
      });

    });
  },

  /** GET ENTIDAD
   * @Observations : Obtener entidad
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  GetEntidad : ( req ) => {
    return new Promise( ( resolve, reject ) =>{
      
      let id = req.body.data;
      try{
        fn.validateType( 'string', id );
      }catch( err ){
        reject( err.getMessage() );
      }

      let entidad = new Entidad();
      entidad.setId( id );
      let sql = entidad.getSqlStringById();

      con.select( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          resolve( error );
        }
      });

    });
  }

};

module.exports = entidadService;


/** GET STRING UPDATE VALIDADO
 * @Observations : Update Entidad.
 * @param   { string } id_entidad => id de la entidad.
 * @param   { boolean } req => Es verificado.
 * @returns { Promise } => new Promise.
 */
const getSqlUpdateValidadoEntidad = ( id_entidad, verificado ) =>{
  let entidad = new Entidad( );
  entidad.setVerificado( verificado );
  entidad.setId( id_entidad );
  let sql = entidad.getSqlStringUpdateVerificado();
  return sql;
}
