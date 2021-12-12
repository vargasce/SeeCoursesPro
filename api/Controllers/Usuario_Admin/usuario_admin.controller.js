'use strict'

const _usuario_adminService = require('../../Services/Usuario_Admin/usuario_admin.service');


const controller = {

    usuario_admin : async ( req, res ) => {

        let action = req.body.action;
        
        switch( action ){

            case 'update_password' :

                try{
                    let result = await _usuario_adminService.updateUsuarioAdmin( req.body.data );
                    return res.status( 200 ).send({ 'error' : '', 'ResultSet' : result });
                }catch( error ){
                    return res.status( 500 ).send({ 'error' : error });
                }

            break;

            case 'update_password_status' :

                try{
                    let result = await _usuario_adminService.updateChanguePassword( req.body.data );
                    return res.status( 200 ).send({ 'error' : '', 'ResultSet' : result });
                }catch( error ){
                    return res.status( 500 ).send({ 'error' : error });
                }
           
            break;

            case 'update_password_forget' :

                try{
                    let result = await _usuario_adminService.updateUsuarioAdminOlvidado( req.body.data );
                    return res.status( 200 ).send({ 'error' : '', 'ResultSet' : result });
                }catch( error ){
                    return res.status( 500 ).send({ 'error' : error });
                }

            break;

            case 'verifyUserToken' :

                try{

                    let result = await _usuario_adminService.verificaUsuarioAdmin( req.body.token ? req.body.token : '' );
                    if( result ){
                        return res.status( 200 ).send({ 'error' : '', 'ResultSet' : result });
                    }else{
                        return res.status( 200 ).send({ 'error' : 'No se pudo Autenticar el usuario.', 'ResultSet' : result, 'ResultSet' : false });
                    }

                }catch( error ){
                    return res.status( 500 ).send({ 'error' : error });
                }
               
            break;

        }
    }

};

module.exports = controller;