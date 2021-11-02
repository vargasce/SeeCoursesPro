'use strict'

const _uploadServices = require('../../Services/UploadFile/upload.service');

const controller = {
  
  upload : async ( req, res ) =>{

    try{
      let resultAdd = await _uploadServices.upload( req );
      return res.status(200).send({ 'error': '', 'ResultSet' : resultAdd });
    }catch( err ){
      return res.status(500).send({ 'error': `Error al cargar la imagen : ${err}` });
    }

  },
  
  goDown : async ( req, res ) =>{

    try{
      let resultAdd = await _uploadServices.godown( req );
      return res.sendFile( resultAdd );
    }catch( err ){
      return res.status(500).send({ 'error': `Error al ralizar el insert : ${err}` });
    }

  }

}

module.exports = controller;
