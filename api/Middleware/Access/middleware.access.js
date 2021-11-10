'use strict'

const usr = require('../../Custom/userSession/session');

class MiddleWare{

    constructor(){

    }

    /** MIDDLEWARE CONTROL DE TOKEN
     * @Observations => Realiza control sobre las rutas indicadas para validar correcto token.
     * @param { obeject } req => Request api 
     * @param { object } res => Resobse api
     * @param { object } next => Next api
     * @returns {*} => Resonse response error or next.
     */
    controlAccessRoutes( req, res, next ){
        
        let urlCurrent = req.originalUrl;
        let token = req.body.token ? req.body.token : null;

        if( urlCurrent == '/api/administrador' || urlCurrent == '/api/entidad' ){
            if( token ){
                if( this.validoToken( token )){
                    next();
                }else{
                    return res.status(403).send({ 'error' : `Error validando token : ${error}` });
                }
            }
        }

        if( urlCurrent == '/api/notificacion' ){
            let action = req.body.action;
            if( action == 'addItinerario' || action == 'updateItinerario'){
                if( this.validoToken( token )){
                    next();
                }else{
                    return res.status(403).send({ 'error' : `Error validando token : ${error}` });
                }
            }
        }

        if( urlCurrent == '/api/itinerario'){
            let action = req.body.action;
            if( action == 'addItinerario' || action == 'updateItinerario' ){
                if( this.validoToken( token )){
                    next();
                }else{
                    return res.status(403).send({ 'error' : `Error validando token : ${error}` });
                }
            }
        }

        next();
    }

    /** VALIDA TOKEN 
     * @Observations => Valida token enviado.
     * @param {*} => TRUE or False;
     */
    validoToken( token ){
        usr.getUserValidete( token, ( error, decode ) =>{
            if( decode ){
                return true;
            }else{
                return false;
            }
        });
    }

}

module.exports = new MiddleWare() ;