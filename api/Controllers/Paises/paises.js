'use strict'

const con = require('../../DB-connect/connectDB');
const envProperties = require("../../env.vars.json");
const node_env = process.env.NODE_ENV || 'developmen';
const props = envProperties[node_env];
const schema = props.DB.SCHEMA;
const funciones = require('../../Custom/function_custom/custom');

const controller = {

  paises : async ( req, res ) => {

    let action = req.body.action;

    switch( action ){

      case 'list-paises' :
        
        let sql_list = listSqlstr();

        try{
          let result_list = await con.QueryAwait( sql_list );
          return res.status(200).send({ 'error' : '', 'Resultset' : result_list.rows });
        }catch( err ){
          return res.status(500).send({ 'error' : `Eror al listar paises, paises.js : ${error}` });
        }

      break;

      case 'add-paises' :
        
        let data_add = req.body.data;
        let sql_add = addSqlStr( data_add );
    
        con.insert( sql_add, ( error_add, result_add ) => {
          if( !error_add ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_add.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al anadir paises : ${error_add}` });
          }
        });

      break;

      case 'update-paises' :

        let data_update = req.body.data;
        let sql_update = updateSqlStr( data_update );

        con.update( sql_update, ( error_update, result_update ) => {
          if( !error_update ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_update.rows });
          }else{
            return res.status(200).sen({ 'error' : `Error al actualizar paises : ${error_update}` });
          }
        });

      break;

      case 'delete-paises' :

        let id_delete = req.body.id;
        let sql_delete = deleteSqlStr( id_delete );

        con.delete( sql_delete, ( error_delete, result_delete  ) => {
          if( !error_delete ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_delete.rows });
          }else{
            return res.statu(500).send({ 'error' : `Error al intentar eliminar paises : ${error_delete}` });
          }
        });  

      break;

      case 'get-paises' :
      
        let id_get = req.body.id;

        funciones.getSqlForID( id_get, 'paises', schema, 'id' ).then( ( paises ) => {
          return res.status(200).send({ 'error' : '', 'Resultset' : paises.Resultset });
        }).catch( ( error_get ) =>{
          return res.status(500).send({ 'error' : `Error al intentar obtener paises : ${error_get}` });
        });

      break;
    }

  }

}

module.exports = controller;



/**   LIST PAISES
 * @Observations : Armo string sql para enviar lista de paises.
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const listSqlstr = () =>{
  let sql = '';
  sql = `SELECT * FROM paises ;`;
  return sql;
}


/**   ADD PAISES
 * @Observations : Armo string sql para enviar anadir paises.
 * @param data : Object => Objecto con el nuevo registro.
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const addSqlStr = ( data ) =>{

  let sql = `INSERT INTO ${schema}.paises (
    descripcion
    )
    VALUES(
    '${data.descripcion}'
    );`;

  return sql;
}


/**   UPDATE PAISES
 * @Observations : Armo string sql para enviar actualizar paises.
 * @param data : Object => Objecto con el nuevo registro.
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const updateSqlStr = ( data ) =>{
  let sql = `UPDATE ${schema}.paises SET descripcion = '${data.descripcion}' WHERE id = ${data.id} ;`;
  return sql;
}


/**   DELETE PAISES
 * @Observations : Armo string sql para eliminar  paises.
 * @param id : String => id del registro a eliminar
 * @return sql : String => String con la consulta a enviar a la base de datos.
 */
const deleteSqlStr = ( id ) =>{
  let sql = `DELETE FROM ${schema}.paises WHERE id = ${id} ;`;
  return sql;
}
