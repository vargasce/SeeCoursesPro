export class Localidad_ProcedenciaModel{

    constructor(
        public id: number,
        public id_provincia: number,
        public localidad_descripcion: string ,
        public cod_postal: string ,
        public provincia_descripcion: string,
        public pais_descripcion:string
    ){

    }
}