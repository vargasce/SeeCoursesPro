'use strict'

const { TypeScriptEmitter } = require('@angular/compiler');
const { EWOULDBLOCK } = require('constants');
const _administradorService = require('../../Services/Administrador/administradorService');

const controller = {

    administradorController : async ( req, res ) => {

        let action = req.body.action;
        
        switch( action ){

            case 'addAdministrador' : 

                try{
                    let resultAdd = await _administradorService.addAdministrador( req.body.data );
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }

            break;

            case 'updateAdministradir' : 

            break;

            case 'listAdministrador' : 

                try{
                    let resultList = await _administradorService.getListAdministrador( req.body.filter );
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultList });
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }

            break;

            case 'listEmailAdministrador' :

                try{
                    let resultListEmail = await _administradorService.getListEmailAdministrador();
                    return res.status(200).send({ 'error' : '', 'ResultSet' : resultListEmail });
                }catch( err ){
                    return res.status(500).send({ 'error' : `${err}`});
                }

            break;

            default :
                return res.status(500).send({ 'error' : `Action not found!!`});
            break;
        }
    }
}

module.exports = controller;