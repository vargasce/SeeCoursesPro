'use strict'

const _itinerarioService = require('../../Services/Itinerario/itinerario.service');
const fn = require('../../Custom/function_custom/custom');

const controller = {

  itinerario : async ( req, res ) =>{

    let action = req.body.action;
    
    try{
      fn.validateType('string', action );
    }catch( e ){
      return res.status(500).send({ 'error': `Error al intentar realizar la consulta : ${e.getMessage()}` });
    }

    switch( action ){

      case 'getItinerarioByTitle' :

        try{
          let resultItinerario = await _itinerarioService.getItinerarioSearch( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultItinerario });
        }catch( error ){
          return res.status(500).send({ 'error' : `Error en la consulta : ${error}` });
        }
      break;

      case 'getItinerarioById' :

        try{
          let resultItinerario = await _itinerarioService.getItinerarioById( req );
          return res.status(200).send({ 'error' : '', 'ResultSet' : resultItinerario });
        }catch( error ){
          return res.status(500).send({ 'error' : `Error en la consulta : ${error}` });
        }
      break;

      case 'getItinerarioList' :
        try{
          let resultList = await _itinerarioService.getMostViewed( req );
          return res.status(200).send({ 'error': '', 'ResultSet' : resultList });
        }catch( error ){
          return res.status(200).send({ 'error' : `Error en la consulta : ${error}` });
        }
      break;

      case 'addItinerario': 
        try{
          let resultAdd = await _itinerarioService.addItinerario( req );
          return res.status(200).send({ 'error': '', 'ResultSet': resultAdd });
        }catch( error ){
          return res.status(500).send({ 'error' : `Error al realizar el insert : ${error}` });
        }
      break;

      case 'updateItinerario': 
        try{
          let resultAdd = await _itinerarioService.updateItinerario( req );
          return res.status(200).send({ 'error': '', 'ResultSet': resultAdd });
        }catch( e ){
          return res.status(500).send({ 'error' : `Error al realizar el insert : ${e}` });
        }
      break;

      case 'validateItinerario': 
        try{
          let resultAdd = await _itinerarioService.updateValidate( req );
          return res.status(200).send({ 'error': '', 'ResultSet': resultAdd });
        }catch( e ){
          return res.status(500).send({ 'error' : `Error al realizar el insert : ${e}` });
        }
      break;

      case 'getItinerarioByIdEntidad': 
        try{
          let resultAdd = await _itinerarioService.getItinerarioByEntidadId( req );
          return res.status(200).send({ 'error': '', 'ResultSet': resultAdd });
        }catch( e ){
          return res.status(500).send({ 'error' : `${e}` });
        }
      break;

      default :
        return res.status(500).send({ 'error' : `Controlador no encontrado!!!` });

    };

  }

};

module.exports = controller;
