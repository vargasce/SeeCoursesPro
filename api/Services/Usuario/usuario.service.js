'use strict'

const con = require('../../DB-connect/connectDB');
const User = require('../../Models/usuario/usuario.model');
const fn = require('../../Custom/function_custom/custom');
const UserError = require('../../Error/usuario/usuarioError');

const usuarioService = {

  /** INSERT NEW USER
   * @Observations : Agregar nuevo usuario.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  addUsuario : async ( req ) =>{
    return new Promise ( async ( resolve, reject ) =>{
      
      let data = req.body.data;

      //try{
        fn.validateType( 'object', data );
      //}catch( e ){
        //reject( e.getMessage() );
      //}

      let Usuario = new User( data );
      let sqlAdd = Usuario.getSqlString();
      //try{

      await con.QueryAwait('BEGIN').catch( error => { throw error; } );
        let resultUser = await con.QueryAwait( sqlAdd ).catch( error => { throw error; } );
        let ok = await con.QueryAwait('COMMIT').catch( error => { throw error; } );
        if( ok ) resolve( resultUser.rows[0] );

      //}catch( err ){
        //await con.QueryAwait('ROLLBACK');
        //throw err;
      //}

    }).catch( error => { throw error; } );
  },

  /** UPDATE USER
   * @Observations : Actualizar usuario.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  updateUsuario : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{
      
      let data = req.body.data;

      try{
        fn.validateType( 'object', data);
      }catch( e ){
        reject( e.getMessage() );
      }

      let Usuario = new User( data );
      let sql = Usuario.getSqlStringUpdate();

      con.update( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          reject( error );
        }
      })
    });
  },


  /** LIST USER
   * @Observations : List usuario.
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  listUsuario : ( ) =>{
    return new Promise( ( resolve, reject ) =>{
      
      let sql = `SELECT * FROM usuario ;`;
      con.select( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          reject( error );
        }
      });
    });
  },

  /** UPDATE ACTIVE USER
   * @Observations : Update usuario
   * @param   { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  updateActiveUsuario : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{
      
      let data = req.body.data;

      try{
        fn.validateType( 'boolean', data );
      }catch( e ){
        reject( e.getMessage() );
      }
      
      let Usuario = new User( data );
      let sql = Usuario.getSqlStringUpdateActive();

      con.update( sql, ( error, result ) =>{
        if( !error ){
          resolve( result.rows );
        }else{
          reject( error );
        }
      });

    });
  },

  /** VERIFY USER UNIQUE
   * @Observations => Verifica que los nombres de usuario no se repitan.
   * @param { string } name => Nombre a verificar.
   * @return { Promise } => new Promise.
   */
  verifyUser : ( name ) => {
    return new Promise( async ( resolve, reject ) =>{

      try{
        fn.validateType('string', name);
      }catch( err ){
        reject( err );
      }
      let Usuario = new User();
      let sql = Usuario.getSqlStringValidateUser( name );

      try{

        let resultUser = await con.QueryAwait( sql );
        if( resultUser ) resolve( resultUser.rows.length );

      }catch( err ){
        reject( `Error al intentar validar el usuario : ${err}` );
      }

    });
  }
};

module.exports = usuarioService;
