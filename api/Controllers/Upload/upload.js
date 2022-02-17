'use strict'

const _uploadServices = require('../../Services/UploadFile/upload.service');
const dt = require('../../Custom/dates/dates');
const log = require('../../Services/Log/log.service');

const controller = {
  
  upload : async ( req, res ) =>{

    try{
      let resultAdd = await _uploadServices.upload( req );
      return res.status(200).send({ 'error': '', 'ResultSet' : resultAdd });
    }catch( err ){
      await log.addLog( { id : 0, descripcion : 'Error upload file image', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
      return res.status(500).send({ 'error': `Error al cargar la imagen : ${err}` });
    }

  },
  
  goDown : async ( req, res ) =>{

    try{
      let resultAdd = await _uploadServices.godown( req );
      return res.sendFile( resultAdd );
    }catch( err ){
      await log.addLog( { id : 0, descripcion : 'Error goDown file image', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
      return res.status(500).send({ 'error': `Error al ralizar el insert : ${err}` });
    }

  },

  uploadFiles : async ( req, res ) =>{

    try{
      let resultAdd = await _uploadServices.uploadFiles( req );
      return res.status(200).send({ 'error': '', 'ResultSet' : resultAdd });
    }catch( err ){
      await log.addLog( { id : 0, descripcion : 'Error upload file image', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
      return res.status(500).send({ 'error': `Error al cargar la imagen : ${err}` });
    }

  },
  
  goDownFiles : async ( req, res ) =>{

    try{
      let resultAdd = await _uploadServices.godown( req );
      return res.sendFile( resultAdd );
    }catch( err ){
      await log.addLog( { id : 0, descripcion : 'Error goDown file image', fecha : dt.getDateCurrentStringCustom() , hora : dt.getHourMinuteCurrent(), observacion : `Error : ${err}` } );
      return res.status(500).send({ 'error': `Error al ralizar el insert : ${err}` });
    }

  }

}

module.exports = controller;
