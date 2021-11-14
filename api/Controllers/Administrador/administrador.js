'use strict'

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

            break;

            default :
                return res.status(500).send({ 'error' : `Action not found!!`});
            break;
        }
    }
}

module.exports = controller;