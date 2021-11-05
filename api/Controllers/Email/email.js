'use strict'
//SEND EMAIL
const _emailService = require('../../Services/Email/email.service');

const controller = {

  emailController : async ( req, res ) => {

    let action = req.body.action;

    switch( action ){

      case 'sendEmail' :
        
        try{
          let result = await _emailService.sendEmail( req.body.data );
          return res.status(200).send({ 'error' : '', 'Resultset' : result });
        }catch( err ){
          return res.status(500).send({ 'error' : `Error : ${err}` });
        }

      break;

    }

  }

}

module.exports = controller;


