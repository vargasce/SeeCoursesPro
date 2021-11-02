'use strict'

const con = require('./postgresconection');
const ConnectError = require('../Error/Connect/connectError');

/** SELECT QUERY
 * @Observation : Realizar select en tabla.
 * @param sql : String => consulta en formato sql para enviar.
 * @param resultset : callback => ( error, result ) => callback function.
 */ 
const selectQuery = ( sql, resultset ) =>{

	try{
		con.conectionDB.getInstance().request().query( sql, ( error, result ) =>{
			if( !error ){
				if( result ){
					resultset('', result);
				}else{
					resultset( error, null );
				}
			}else{
				console.log(`Error al relizar consulta a la DB : ${error}`);
			}
		});
	}catch(error){
		console.log( error );
	}

}


/** SELECT QUERY AWAIT
 * @Observation : Realizar select en tabla.
 * @example
 * params 1 => QueryAwait( 'INSERT INTO table ( id, name ) VALUES( 1, 'Cristian')' );
 * params 2 => QueryAwait( 'INSERT INTO table ( id, name ) VALUES($1,$2)', [ 1, 'Cristian' ] );
 * @param { string } sql => consulta en formato sql para enviar.
 * @param { Array } valuesArray => Valores de la consulta, [id,'name','last_name', ...]. format sql  ( INERT INTO table (id, name) 	VALUES($1,$2) RETURNING * ; )
 * @returns resultset : Promise => ( async ).
 */ 
const QueryAwait = async ( sql, valuesArray = null ) =>{
	return new Promise( async ( resolve, reject ) =>{
		try{

			if( valuesArray != null ){
				let result = await con.conectionDB.getInstance().request().query( sql, valuesArray );
				resolve( result );
			}else{
				let result = await con.conectionDB.getInstance().request().query( sql );
				resolve( result );
			}

		}catch( error ){
			reject( new ConnectError( 'Error.', `Error al realizar la consulta DB, connecDB.js line 60 ( . catch() ) . Result : ${error}` ) );
		}
	}).catch( error => { throw error } );
}

/** INSERT QUERY
 * @Observation : Realizar insert en tabla.
 * @param sql : String => consulta en formato sql para enviar.
 * @param resultset : callback => ( error, result ) => callback function.
 */ 
const insertQuery = ( sql, resultset ) =>{
	con.conectionDB.getInstance().request().query( sql, ( error, result ) =>{
		if( !error ){
			if( result ){
				resultset('', result);
			}else{
				resultset( error, null );
			}
		}else{
			console.log(`Error al relizar insert a la DB : ${error}`);
		}
	});
}


/** UPDATE QUERY
 * @Observation : Realizar update en tabla.
 * @param sql : String => consulta en formato sql para enviar.
 * @param resultset : callback => ( error, result ) => callback function.
 */ 
const updateQuery = ( sql, resultset ) =>{
	con.conectionDB.getInstance().request().query( sql, ( error, result ) =>{
		if( !error ){
			if( result ){
				resultset('', result);
			}else{
				resultset( error, null );
			}
		}else{
			console.log(`Error al relizar update a la DB : ${error}`);
		}
	});
}



/** DELETE QUERY
 * @Observation : Realizar delete en tabla.
 * @param sql : String => consulta en formato sql para enviar.
 * @param resultset : callback => ( error, result ) => callback function.
 */ 
const deleteQuery = ( sql, resultset ) =>{
	con.conectionDB.getInstance().request().query( sql, ( error, result ) =>{
		if( !error ){
			if( result ){
				resultset('', result);
			}else{
				resultset( error, null );
			}
		}else{
			console.log(`Error al relizar delete a la DB : ${error}`);
		}
	});
}


/** CLOSE CONECTION
 * @Observation : Funcion para finalizar conexion con la base de datos.
 */ 
const closeDB = ()=>{
	con.conectionDB.getInstance().close();
}


module.exports = {
	select : selectQuery,
	insert : insertQuery,
	update : updateQuery,
	delete : deleteQuery,
	close  : closeDB,
	QueryAwait : QueryAwait
}
