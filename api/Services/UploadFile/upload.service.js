'use strict'

const con = require('../../DB-connect/connectDB');
const os = require('os');
const fn = require('../../Custom/function_custom/custom');
const UploadError = require('../../Error/Upload/uploadError');
const fs = require('fs');
const path = require('path');

const uploadService = {
  
  upload : ( req ) =>{
    return new Promise( async ( resolve, reject ) =>{
  
      let table = req.body.tabla;
      let id = req.body.id;
      let files = req.files;

      try{
        fn.validateType('object', files );
        fn.validateType('string', table );
        fn.validateType('string', id );
      }catch( err ){
        reject( new UploadError('Error Upload', 'Error files is not Obeject.') );
      }
      
      let obj = splitFileObject( files );

      if( obj.extension == 'jpg' || obj.extension == 'png' || obj.extension == 'gif' || obj.extension == 'icon' || obj.extension == 'jpeg' ){
        
        let sql = `UPDATE ${table} SET imagen = '${obj.fileName}' WHERE id = ${id}`;

        try{

          await con.QueryAwait('BEGIN');
          let result = await con.QueryAwait( sql );
          let ok = await con.QueryAwait('COMMIT');
          if( ok ) {
            saveFile( obj.fileName, obj.filePath );
            resolve( result.rows );
          }
        }catch( err ){
          await con.QueryAwait('ROLLBACK');
          reject( new UploadError('Error Upload', `Error in insert file : ${err}`) );
        }

      }else{
        reject(`Error, type extension incorrect.`);
      }

    });
  },

  godown : ( req ) =>{
    return new Promise( ( resolve, reject ) =>{
      let image = req.params.image;      
      let image_path = `./File_up/${image}`;
      fs.exists( image_path, ( exits ) =>{
        if( exits ){
          resolve( path.resolve(image_path) );
        }else{
          reject({ 'error' : true });
        }
      });
    });
  }

}

module.exports = uploadService;

const splitFileObject = ( files ) =>{

  try{    

		console.table(files.image.path);
    let platafom = os.platform();
    let filePath = files.image.path;
    let fileSplit = filePath.split('\\');
    let fileName =  fileSplit[fileSplit.length - 1];
    let extensionSplit = fileName.split('.');
    let extension = extensionSplit[1];
    
    if( platafom == 'darwin' ){
      
      filePath = files.image.path;
      fileSplit = filePath.split('/');
      fileName =  fileSplit[fileSplit.length - 1];
      extensionSplit = fileName.split('.');
      extension = extensionSplit[1];
      
      console.group("Datos obtenidos de la imagen");
      console.log(fileName);
      console.log(filePath);
      console.log(extension);
      console.groupEnd();

      return {
        fileName,
        filePath,
        extension
      }
    }

    if( platafom == 'linux'){
      filePath = files.image.path;
      fileSplit = filePath.split('/');
      console.log(fileSplit);
      fileName =  fileSplit[fileSplit.length - 1];
      extensionSplit = fileName.split('.');
      extension = extensionSplit[1];

      console.group("Datos obtenidos de la imagen");
      console.log(fileName);
      console.log(filePath);
      console.log(extension);
      console.groupEnd();
      
      return {
        fileName,
        filePath,
        extension
      }
    }

    return {
      fileName,
      filePath,
      extension
    }

  }catch( err ){
    throw err;
  }

}

const saveFile = ( fileName, filePath ) =>{

  try{
    fs.mkdirSync('./File_up/');
  }catch( err ){
    if( err.code != 'EEXIST' ) throw err;
  }

  try{

    const is = fs.createReadStream( filePath );
    const os = fs.createWriteStream( `./File_up/${fileName}` );

    is.pipe( os );

    is.on('end', ()=>{
      fs.unlinkSync( filePath );
    });

  }catch( err ){
    console.log( err );
    throw err;
  }

}
