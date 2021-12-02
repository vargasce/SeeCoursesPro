'use strict'

const _entidadService = require('../../Services/Entidad/entidad.service');
const fn = require('../../Custom/function_custom/custom');

const controller = {
  
  entidad : async ( req, res ) =>{

    let action = req.body.action;

    try{
      fn.validateType( 'string', action );
    }catch( err ){
      return res.status(500).send({ 'error': `Error : ${err.getMessage()}` });
    }

    switch( action ){

      case 'addEntidad':
        
        try{
          let resultAdd = await _entidadService.AddEntidad( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `${ err }` });
        }

      break;

      case 'getEntidad': 

        try{
          let resultAdd = await _entidadService.getEntidad( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err.getMessage() }` });
        }

      break;

      case 'listEntidad':

        try{
          let resultAdd = await _entidadService.ListEntidad( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err.getMessage() }` });
        }

      break;

      case 'updateEntidad' :

        try{
          let resultAdd = await _entidadService.UpdateEntidad( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${ err.getMessage() }` });
        }

      break;

      case 'verifyCuit' :

        try{

          let resultVerificacion = await _entidadService.verifyCuit( req.body.cuit );
          if( resultVerificacion == 0 ) return res.status(200).send({ 'error' : '', 'ResultSet' : resultVerificacion });
          return res.status(500).send({ 'error' : 'El cuit que se intenta ingresar ya existe.' });

        }catch( err ){
          return res.status(500).send({ 'error' : `${err}`});
        }

      break;


      default :
        return res.status(500).send({ 'error': `Accion no definida.` });
    }

  }
};

module.exports = controller;
