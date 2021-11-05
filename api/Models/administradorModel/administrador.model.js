'use strict'

class Administrador{

    constructor( data = null ){
        if( data ){
            this.fecha_alta = data.fecha_alta;
            this.pass = data.pass;
            this.pass_extremo = data.pass_extremo;
            this.activo = data.activo;
            this.usuario = data.usuario;
        }
    }

    // GETTERS
    getFecha_Alta(){ return this.fecha_alta; }
    getPass(){ return this.pass; }
    getActivo(){ return this.activo; }
    getUsuario(){ return this.usuario; }

    // SETTERS
    setFecha_Alta( fecha ){ this.fecha_alta = fecha; }
    setPass( pass ){ this.pass = pass; }
    setActivo( activo ){ this.activo = activo; }
    setUsuario( usuario ){ this.usuario = usuario; }

    /** GET SQL STRING ADD ADMINISTRADOR
     * @Observations => Crear sql para insertar administrador.
     * @returns { string } => string sql format.
     */
    getSqlStringAddAdministrador(){

        let sql = `
            INSERT INTO administrador 
            (
                fecha_alta,
                pass,
                pass_extremo,
                activo,
                usuario
            )
            VALUES
            (
                '${this.getFecha_Alta()}',
                '${this.getPass}',
                '${this.pass_extremo()}',
                ${this.getActivo()},
                ${this.getUsuario()}
            );
        `;
        return sql;
    }

    //ADD NEW METHOD
}

module.exports = Administrador;