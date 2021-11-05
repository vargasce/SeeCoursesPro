'use strict'

const _service = require('../../Services/Administrador/administradorService');
const Container = require('typedi');
const _administradorService = Container.get(_service);

const controller = {

    administradorController : async ( req, res ) => {

        let action = req.body.data.action;
        
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

            break;

            default :
                return res.status(500).send({ 'error' : `Action not found!!`});
            break;
        }
    }
}

module.exports = controller;