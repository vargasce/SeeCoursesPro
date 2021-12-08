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

    switch( os.platform()){
      case 'darwin':
        
        let filePath = files.image.path;
        let fileSplit = filePath.split('/');
        let fileName =  fileSplit[fileSplit.length - 1];
        let extensionSplit = fileName.split('.');
        let extension = extensionSplit[1];

        return {
          fileName,
          filePath,
          extension
        }

      break;

      case 'linux' :

        let filePathLi = files.image.path;
        let fileSplitLi = filePathLi.split('/');
        let fileNameLi =  fileSplitLi[fileSplit.length - 1];
        let extensionSplitLi = fileNameLi.split('.');
        let extensionLi = extensionSplitLi[1];
        
        return {
          fileNameLi,
          filePathLi,
          extensionLi
        }

      break;

      default:

        let filePathWi = files.image.path;
        let fileSplitWi = filePathWi.split('\\');
        let fileNameWi =  fileSplitWi[fileSplit.length - 1];
        let extensionSplitWi = fileNameWi.split('.');
        let extensionWi = extensionSplitWi[1];

        return {
          fileNameWi,
          filePathWi,
          extensionWi
        }

      break;
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
