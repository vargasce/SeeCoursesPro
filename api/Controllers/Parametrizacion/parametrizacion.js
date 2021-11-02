'use strict'

const con = require('../../DB-connect/connectDB');
const envProperties = require("../../env.vars.json");
const node_env = process.env.NODE_ENV || 'developmen';
const props = envProperties[node_env];
const schema = props.DB.SCHEMA;

const controller = {
  parametrizacion : ( req, res ) =>{
    
    let action = req.body.action;

    switch( action ){

      case 'get-motivo-baja' :

        con.select( `SELECT * FROM ${schema}.motivos_baja ;`, ( error_motivo_baja, result_motivo_baja )=>{
          if( !error_motivo_baja ){
            return res.status(200).send({ 'error': '', 'Resultset' : result_motivo_baja.rows });
          }else{
            return res.status(500).send({ 'error': `Error al obtener motivo de baja : ${error_motivo_baja}` });
          }
        });

      break;
      
      case 'get-procedencia':
        
        con.select( `SELECT * FROM ${schema}.procedencias ;`, ( error_procedencia, result_procedencia ) => {
          if( !error_procedencia ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_procedencia.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener procedencia : ${error_procedencia}` });
          }
        });

      break;


      case 'get-paises':
        
        con.select( `SELECT * FROM ${schema}.paises ;`, ( error_paises, result_paises ) => {
          if( !error_paises ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_paises.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener pais : ${error_paises}` });
          }
        });

      break;


      case 'get-condiva':
        
        con.select( `SELECT * FROM ${schema}.condiva ;`, ( error_condiva, result_condiva ) => {
          if( !error_condiva ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_condiva.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener condicion de iva : ${error_condiva}` });
          }
        });

      break;


      case 'get-estado-civil':
        
        con.select( `SELECT * FROM ${schema}.estados_civiles ;`, ( error_estado_civil, result_estado_civil ) => {
          if( !error_estado_civil ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_estado_civil.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener condicion de iva : ${error_estado_civil}` });
          }
        });

      break;


      case 'get-provincias':
        
        con.select( `SELECT * FROM ${schema}.provincias ;`, ( error_provincias, result_provincias ) => {
          if( !error_provincias ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_provincias.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener provincias : ${error_provincias}` });
          }
        });

      break;


      case 'get-roles':
        
        con.select( `SELECT * FROM ${schema}.roles_bio ;`, ( error_roles, result_roles ) => {
          if( !error_roles ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_roles.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener roles bio : ${error_roles}` });
          }
        });

      break;

      
      case 'get-tipos-documentos':
        
        con.select( `SELECT * FROM ${schema}.tipos_documentos;`, ( error_documentos, result_documentos ) => {
          if( !error_documentos ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_documentos.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener tipos de documentos : ${error_documentos}` });
          }
        });

      break;


      case 'get-tipos-sociedades':
        
        con.select( `SELECT * FROM ${schema}.tipos_sociedades;`, ( error_sociedades, result_sociedades ) => {
          if( !error_sociedades ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_sociedades.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener tipos de sociedades : ${error_sociedades}` });
          }
        });

      break;

      
      case 'get-colegios':
        
        con.select( `SELECT * FROM ${schema}.colegios;`, ( error_colegios, result_colegios ) => {
          if( !error_colegios ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_colegios.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener colegios : ${error_colegios}` });
          }
        });

      break;

      case 'get-ganancias':
        
        con.select( `SELECT * FROM ${schema}.ganancias;`, ( error_ganancias, result_ganancias ) => {
          if( !error_ganancias ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_ganancias.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener ganancias : ${error_ganancias}` });
          }
        });

      break;

      case 'get-laboratorio':
        
        con.select( `SELECT id, nombre FROM ${schema}.laboratorios;`, ( error_laboratorios, result_laboratorios ) =>{
          if( !error_laboratorios ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_laboratorios.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener laboratorios : ${error_laboratorios}` });
          }
        });

      break;

      case 'get-profesional':
        
        con.select( `SELECT id, nombre FROM ${schema}.profesionales;`, ( error_profesionales, result_profesionales ) =>{
          if( !error_profesionales ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_profesionales.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener profesionales : ${error_profesionales}` });
          }
        });

      break;

      case 'get-rol':
        
        con.select( `SELECT id, descripcion FROM ${schema}.roles_bio;`, ( error_roles, result_roles ) =>{
          if( !error_roles ){
            return res.status(200).send({ 'error' : '', 'Resultset' : result_roles.rows });
          }else{
            return res.status(500).send({ 'error' : `Error al obtener roles : ${error_roles}` });
          }
        });

      break;

    }
  }
}


module.exports = controller;
