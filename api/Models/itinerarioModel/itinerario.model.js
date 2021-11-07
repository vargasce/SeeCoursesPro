'use strict'

class ItinerarioModel{
	
  constructor( data ){
    if( data ){
      this.id = data.id;
      this.id_entidad = data.id_entidad;
      this.nombre = data.nombre;
      this.titulo = data.titulo;
      this.descripcion = data.descripcion;
      this.observacion = data.observacion;
      this.fecha_itinerario = data.fecha_itinerario;
      this.hora_itinerario = data.hora_itinerario;
      this.fecha_alta = data.fecha_alta;
      this.imagen = data.imagen;
      this.link = data.link;
      this.instructor = data.instructor;
      this.viewed = data.viewed;
      this.validado = data.validado;
      this.finalizado = data.finalizado;
      this.rechazado = data.rechazado;
      this.hora_itinerario_fin = data.hora_itinerario_fin;
    }
  }

  getId (){ return this.id; }
  getIdEntidad (){ return this.id_entidad; }
  getNombre (){ return this.nombre; }
  getTitulo (){ return this.titulo; }
  getDescripcion (){ return this.descripcion; }
  getObservacion (){ return this.observacion; }
  getFechaItinerario (){ return this.fecha_itinerario; }
  getHoraItinerario (){ return this.hora_itinerario; }
  getHoraItinerarioFin(){ return this.hora_itinerario_fin; }
  getFechaAlta (){ return this.fecha_alta; }
  getImagen (){ return this.imagen; }
  getLink (){ return this.link; }
  getInstructor (){ return this.instructor; }
  getViewed (){ return this.viewed; }
  getValidado(){ return this.validado; }
  getFinalizado(){ return this.finalizado; }
  getRechazado(){ return this.rechazado; }

  setId ( id ){ this.id = id; }
  setIdEntidad ( id_entidad ){ this.id_entidad = id_entidad; }
  setNombre ( nombre ){ this.nombre = nombre; }
  setTitulo ( titulo ){ this.titulo = titulo; }
  setDescripcion ( descripcion ){ this.descripcion = descripcion; }
  setObservacion ( observacion ){ this.observacion = observacion; }
  setFechaItinerario ( fecha_itinerario ){ this.fecha_itinerario = fecha_itinerario; }
  setHoraItinerario ( hora_itinerario ){ this.hora_itinerario = hora_itinerario; }
  setHoraItinerarioFin( hora_itinerario_fin ){ this.hora_itinerario_fin = hora_itinerario_fin; }
  setFechaAlta ( fecha_alta ){ this.fecha_alta = fecha_alta; }
  setImagen ( imagen ){ this.imagen = imagen; }
  setLink ( link ){ this.link = link; }
  setInstructor ( instructor ){ this.instructor = instructor; }
  setViewed ( viewed ){ this.viewed = viewed; }
  setValidado( validado ){ this.validado = validado; }
  setRechazado( rechazado ){ this.rechazado = rechazado; }

  /** GET STRING INSERT
   * @Observations : Construye string para insert a base de datos.
   * @returns { string } => Sql string;
   */
  getSqlString(){
    let sql = `
      INSERT INTO itinerario(
        id_entidad,
        nombre,
        titulo,
        descripcion,
        observacion,
        fecha_itinerario,
        hora_itinerario,
        fecha_alta,
        imagen,
        link,
        instructor,
        viewed,
        validado,
        finalizado,
        rechazado,
        hora_itinerario_fin
    )
    VALUES(
        ${this.getIdEntidad()},
        '${this.getNombre()}',
        '${this.getTitulo()}',
        '${this.getDescripcion()}',
        '${this.getObservacion()}',
        '${this.getFechaItinerario()}',
        '${this.getHoraItinerario()}',
        '${this.getFechaAlta()}',
        '${this.getImagen()}',
        '${this.getLink()}',
        '${this.getInstructor()}',
        ${this.getViewed()},
        ${this.getValidado()},
        ${this.getFinalizado()},
        ${this.getRechazado()},
        '${this.getHoraItinerarioFin()}'
    ) RETURNING id ;
    `;

    return sql;
  }


  /** GET STRING UPDATE
   * @Observations : Construye string para update a base de datos.
   * @returns { string } => Sql string;
   */
  getSqlStringUpdate(){
    let sql = `
      UPDATE itinerario SET
        id_entidad = ${this.getIdEntidad()},
        nombre = '${this.getNombre()}',
        titulo = '${this.getTitulo()}',
        descripcion = '${this.getDescripcion()}',
        observacion = '${this.getObservacion()}',
        fecha_itinerario = '${this.getFechaItinerario()}',
        hora_itinerario = ${this.getHoraItinerario()},
        fecha_alta = ${this.getFechaAlta()},
        imagen = '${this.getImagen()}',
        link = '${this.getLink()}',
        instructor = '${this.getInstructor()}',
        viewed = ${this.getViewed()},
        validate = ${this.getValidate()}
      WHERE id = ${this.getId()} ;`;

    return sql;
  }

  /** UPDATE VALIDATE
   * @Observations : Actualiza la validacion del itinerario.
   * @param { string } id => Id del itinerario a actualizar.
   * @returns { string } => Sql string.
   */
  getSqlStringValidate(){
    let sql = `
      UPDATE itinerario SET
        validado = ${this.getValidado()},
        viewed = ${this.getViewed()},
        rechazado = ${this.getRechazado()}
      WHERE id = ${this.getId()}
      ;`;
    return sql;
  }

  /** GET SQL STRING VIEW COUNT 
   * @Observations : Retorna sql string consulta.
   * @param { string } count => cantidad de datos a mostrar.
   * @returns { string } => Sql string.
   */
  getSqlStringViewCount( data ){

    let sql = `
      SELECT it.id AS id, it.nombre, it.titulo, it.descripcion, it.observacion, to_char( it.fecha_itinerario, 'yyyy-MM-DD' ) AS fecha_itinerario, it.hora_itinerario, 
             to_char( it.fecha_alta, 'yyyy-MM-DD' ) AS fecha_alta, it.imagen, it.link, it.instructor, it.viewed, it.validado, it.finalizado,
             ent.id as id_entidad, ent.nombre as nombre_entidad,
             ent.descripcion as descripcion_entidad, ent.telefono as telefono_entidad,
             ent.director as director_entidad, ent.ciudad as ciudad_entidad
      FROM public.itinerario as it 
      INNER JOIN public.entidad as ent on it.id_entidad = ent.id
      WHERE it.validado = true
      AND it.finalizado = false
      ORDER BY it.viewed DESC
      LIMIT ${data}; 
    `;

    return sql;
  }


  /** GET SQL STRING ITINERARIOS BY ENTIDAD 
   * @Observations : Retorna sql string consulta.
   * @param { string } id => id de la entidad para la consulta.
   * @returns { string } => Sql string.
   */
  getSqlStringItinerarioByEntidad( id ){
    let sql = `
      SELECT it.id, it.nombre, it.titulo, it.descripcion, it.observacion, to_char( it.fecha_itinerario, 'yyyy-MM-DD' ) AS fecha_itinerario, it.hora_itinerario, 
             to_char( it.fecha_alta, 'yyyy-MM-DD' ) AS fecha_alta, it.imagen, it.link, it.instructor, it.viewed, it.validado, it.finalizado, it.rechazado,
             ent.id as id_entidad, ent.nombre as nombre_entidad,
             ent.descripcion as descripcion_entidad, ent.telefono as telefono_entidad,
             ent.director as director_entidad, ent.ciudad as ciudad_entidad
      FROM public.itinerario as it 
      INNER JOIN public.entidad as ent on it.id_entidad = ent.id
      WHERE ent.id = ${id}
      ;`;
    return sql;
  }


  /** GET SQL STRING ITINERARIOS BY ENTIDAD 
   * @Observations : Retorna sql string consulta.
   * @param { string } id => id de la entidad para la consulta.
   * @returns { string } => Sql string.
   */
  getSqlAvailabilityDate( data = null  ){
    
    let sql = "";

    if( data ){

      sql = `
        SELECT id, id_entidad, nombre, titulo, descripcion, observacion, fecha_itinerario, hora_itinerario, fecha_alta, imagen, link, instructor, validado, finalizado, rechazado, viewed, hora_itinerario_fin
          FROM public.itinerario	
          WHERE fecha_itinerario = '${data.fecha_itinerario}'
		  ;`;

    }

    return sql;
  }

};

module.exports = ItinerarioModel;


