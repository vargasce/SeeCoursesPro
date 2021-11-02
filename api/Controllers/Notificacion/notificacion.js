'use strict'
const _notificacionService = require('../../Services/Notificacion/notificacion.service');
//const _emailService = require('../../Services/Email/email.service');

const fn = require('../../Custom/function_custom/custom');

const controller = {
  
  notificacion : async ( req, res ) =>{

    let action = req.body.action;

    try{
      fn.validateType( 'string', action );
    }catch( err ){
      return res.status(500).send({ 'error': `Error : ${err.getMessage()}` });
    }

    switch( action ){

      case 'addNotificacion':
        
        try{

          let resultAdd = await _notificacionService.addNotificacion( req );

          //try{
            //await _emailService.sendEmail( req );
          //}catch( e ){
            //console.error(`Error enviando email : ${e}`);
          //}

          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err.getMessage() }` });
        }

      break;

      case 'getNotificacion': 

        try{
          let resultAdd = await _notificacionService.getNotificacion( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err }` });
        }

      break;

      case 'listNotificacion':

        try{
          let resultAdd = await _notificacionService.listNotificacion( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err.getMessage() }` });
        }

      break;

      case 'updatePendingNotificacion':

        try{
          //send( req.sendEmail );
          let resultUpdatePending = await _notificacionService.updatePendingAwait( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultUpdatePending });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${err}` });
        }
      break;

      case 'updateRejectedNotificacion':

        try{
          //send( req.sendEmail );
          let resultUpdatePending = await _notificacionService.updateRejected( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultUpdatePending });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${err}` });
        }

      break;

      case 'updateVistoNotificacion' :

        try{
          let resultUpdatePending = await _notificacionService.updateVisto( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultUpdatePending });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${err}` });
        }

      break;

      default :
        return res.status(500).send({ 'error' : `Controlador no encontrado!!!` });

    }

  }
};

module.exports = controller;


