'use strict'

const con = require('../../DB-connect/connectDB');
const md5 = require('md5');
const envProperties = require("../../env.vars.json");
const node_env = process.env.NODE_ENV || 'developmen';
const props = envProperties[node_env];
const schema = props.DB.SCHEMA;
const fn = require('../../Custom/function_custom/custom');


const loginService = {

  /** LOGIN
   * @Observations : Realiza la consulta de usuario.
   * @param { Object } req => Request del controller.
   * @returns { Promise } => new Promise.
   */
  login : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{

      let data = req.body.data;
      let tabla = req.body.tipo == 'admin' ? 'administrador' : 'usuario';

      let sql = `SELECT usro.id, usro.usuario, enti.id AS id_entidad, enti.nombre AS nombre_entidad, enti.email AS email 
                 FROM ${tabla} AS usro
                 INNER JOIN entidad AS enti
                 ON usro.id = enti.id
                 WHERE usuario = '${data.usuario}' AND pass = '${md5(data.pass)}' AND activo = true ;`;

      con.select( sql, ( error, result ) =>{
        if( !error ){
          if( result.rowCount > 0 ){
            resolve( result.rows[0] )
          }else{
            reject('El usuario o contraña no son correctos !!!');
          }
        }else{
          reject( `Error al realizar la consulta : ${error}` );
        }
      });

    });
  },

}

module.exports = loginService;
