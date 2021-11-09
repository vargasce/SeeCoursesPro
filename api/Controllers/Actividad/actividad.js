'use strict'

const fn = require('../../Custom/function_custom/custom');
const _actividadService = require('../../Services/Actividad/actividad.service');

class ActividadController{

    constructor(){

    }

    actividad( res, res){

        let action = res.body.action;

        try{
            fn.validateType( 'string', action );
        }catch( err ){
            throw err;
        }

        switch ( action ){

            case 'addActividad' :

                return addActividad( res.body.data );

            break;
        }
    }


    /** NUEVA ACTIVIDAD
     * @Observations => Añadir nueva actividad
     * @param { object } data => Objecto a dar de alta.
     * @returns { Promise } => Retorna nueca promesa.
     */
    async addActividad( res ){
        
        let data = res.body.data;

        try{
            fn.validateType( 'object', data );
        }catch( err ){
            throw err;
        }

        try{
            let resultAdd = await _actividadService.addActividad( data );
            return res.status(200).send({ 'error' : '', 'ResultSet' : resultAdd });
        }catch( err ){
            return res.status(500).send({ 'error' : `${err}`});
        }

    }

}