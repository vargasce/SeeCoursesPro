'use strict'

const Paginador = require('../../Custom/paginador/paginador');

class Entidad{

  constructor( data = null ){

    if( data ){
      this.id = data.id;
      this.id_usuario = data.id_usuario;
      this.id_provincia = data.id_provincia;
      this.id_pais = data.id_pais;
      this.descripcion = data.descripcion;
      this.web = data.web;
      this.email = data.email;
      this.verificado = data.verificado;
      this.nombre = data.nombre;
      this.direccion = data.direccion;
      this.telefono = data.telefono;
      this.cuit = data.cuit;
      this.ciudad = data.ciudad;
      this.director = data.director;
    }

  }

  getId(){ return this.id; }
  getIdUsuario(){ return this.id_usuario; }
  getIdProvincia(){ return this.id_provincia; }
  getIdPais(){ return this.id_pais; }
  getDescripcion(){ return this.descripcion; }
  getWeb(){ return this.web; }
  getEmail(){ return this.email; }
  getVerificado(){ return this.verificado; }
  getNombre(){ return this.nombre; }
  getDireccion(){ return this.direccion; }
  getTelefono(){ return this.telefono; }
  getImagen(){ return this.imagen; }
  getCuit(){ return this.cuit; }
  getCiudad(){ return this.ciudad; }
  getDirector(){ return this.director; }

  setId( id ){ this.id = id; }
  setIdUsuario( id_usuario ){ this.id_usuario = id_usuario; }
  setIdProvincia( id_provincia ){ this.id_provincia = id_provincia; }
  setIdPais( id_pais ){ this.id_pais = id_pais; }
  setDescripcion( descripcion ){ this.descripcion = descripcion; }
  setWeb( web ){ this.web = web; }
  setEmail( email ){ this.email = email; }
  setVerificado( verificado ){ this.verificado = verificado; }
  setNombre( nombre ){ this.nombre = nombre; }
  setDireccion( direccion ){ this.direccion = direccion; }
  setTelefono( telefono ){ this.telefono = telefono; }
  setImagen( imagen ){ this.imagen = imagen; }
  setCuit( cuit ){ this.cuit = cuit; }
  setCiudad( ciudad ){ this.ciudad = ciudad; }
  setDirector( director ){ this.director = director; }

  getSqlStringUpdateVerificado(){
    let sql = `UPDATE entidad SET verificado = ${this.getVerificado()} WHERE id = ${this.getId()} ;`;
    return sql;
  }

  getSqlString(){
    let sql = `
      INSERT INTO entidad (
        id_usuario,
        id_provincia,
        id_pais,
        descripcion,
        web,
        email,
        verificado,
        nombre,
        direccion,
        telefono,
        cuit,
        ciudad,
        director
      )
      VALUES(
        ${this.getIdUsuario()},
        ${this.getIdProvincia()},
        ${this.getIdPais()},
        '${this.getDescripcion()}',
        '${this.getWeb()}',
        '${this.getEmail()}',
        ${this.getVerificado()},
        '${this.getNombre()}',
        '${this.getDireccion()}',
        '${this.getTelefono()}',
        '${this.getCuit()}',
        '${this.getCiudad()}',
        '${this.getDirector()}'
      ) RETURNING *;
    `;

    return sql;
  }

  getSqlStringUpdate(){
    let sql = `
      UPDATE entidad SET 
        id_usuario ${this.getIdUsuario()},
        id_provincia = ${this.getIdProvincia()},
        id_pais = ${this.getIdPais()},
        descripcion = '${this.getDescripcion()}',
        web = '${this.getWeb()}',
        email = '${this.getEmail()}',
        verificado = ${this.getVerificado()},
        nombre = '${this.getNombre()}',
        direccion = '${this.getDireccion()}',
        telefono = '${this.getTelefono()}' ,
        imagen = '${this.getImagen()}',
        cuit = '${this.getCuit()}',
        ciudad = '${this.getCiudad()}',
        director = '${this.getDirector()}'
      WHERE id = ${this.getId()}
    ;`;

    return sql;
  }

  getSqlStringList( data ){
    let pag;

    if( data.next == true ){
      pag = Paginador.nextPage( data );
    }else{
      pag = Paginador.backPage( data );
    }

    let sql = `SELECT * FROM entidad ORDER BY DESC LIMIT ${pag.countPage} OFFSET ${pag.finalPage} ;`;
    return {
      sql : sql,
      paginador : pag
    };
  }
  
  getSqlStringById(){
    let sql = `SELECT * FROM entidad WHERE id = ${this.getId()}`;
    return sql;
  }

}

module.exports = Entidad;
