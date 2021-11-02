'use strict'

const con = require('../../DB-connect/connectDB');
const usr = require('../../Custom/userSession/session');
const _loginService = require('../../Services/Login/login.service');


const controller = {

	login : async ( req, res ) =>{
		
		switch( req.body.action ){ //ACCION
			
			case 'login' : 
				
				try{

					let resultLogin = await _loginService.login( req );
					let decode = usr.getSession( resultLogin );
					return res.status(200).send({ 'error' : '', 'Resultset' : decode });

				}catch( error ){
					return res.status(500).send({ 'error': `${error}` });
				}

			break;

			case 'close' : 
				
			break;

			default :
				return res.status(500).send({ 'error' : 'No se especifico ningun action para el controlador.' });
		}

	}

}

module.exports = controller;


/** ADD ACTIVE SESSION
 * @Observations : Añadimos estado activo al usuario que haya realizado el login satisfactorio.
 * @param req : Object => objecto request de la llamada.
 * @param decode : Object => objecto decodificado del usuario.
 */
const addDataSession = ( req, decode ) =>{
	
	let dataBrowser = {
		'browser' : req.useragent.browser,
		'plataform' : req.useragent.plataform,
		'os' : req.useragent.os,
		'version' : req.useragent.version,
		'id_profail_name' : decode.user.id,
		'active' : true
	}

	active.add( dataBrowser );

}
