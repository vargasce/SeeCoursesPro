'use strict'

class actividadModel {

    constructor( data = null ){
        if( data ){
            this.description = data.description;
        }
    }

    //GETTERS
    getDescripcion(){ return this.description; }

    //SETTERS
    setDescripcion( desc ){ this.description = desc; }

    //CUSTOM
    
    getSqlAddActividad(){
        return '';
    }
}