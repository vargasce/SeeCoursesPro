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

/** SELECT QUERY AWAIT BY ID
 * @Observations => Retorna consulta por id de la tabla.
 * @param { string } id => Identificador a buscar. 
 * @param { string } table => Tabla a donde realizar la consulta. 
 * @param { string } columnFilter => Columna mach del identificador.
 * @param { string } column => ( OPCIONAL ) Columnas a filtar.
 * @example 
 * 		column = "id, name, apellido, fecha"
 * @returns resultset : Promise => ( async )
 */
const QueryAwaitById = async ( id, table, columnFilter, column = null ) =>{
	return new Promise( async ( resolve, reject ) =>{
		let sql = '';
		
		try{
			if( arguments.length >= 3 ){

				if( column ){
					sql = `SELECT ${column} FROM ${table} WHERE ${columnFilter} = ${id}`;
				}else{
					sql = `SELECT * FROM ${table} WHERE ${columnFilter} = ${id} `
				}
				
				await con.conectionDB.getInstance().request().query('BEGIN');
				let result = await con.conectionDB.getInstance().request().query( sql );
				let ok = await con.conectionDB.getInstance().request().query('COMMIT');
				if( ok ) resolve( result );

			}else{
				await con.conectionDB.getInstance().request().query('ROLLBACK');
				reject( new ConnectError('Error ConnectDB', `Error, total de argumentos incorrecto. line 87 QueryAwaitById`) );
			}

		}catch( error ){
			reject( new ConnectError('Error ConnectDB', `Error procesando consulta : line 91 QueryAwaitById connectDB.js => ${ error }`) );
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
			resultset( error, null );
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
	QueryAwait : QueryAwait,
	QueryAwaitById : QueryAwaitById
}
