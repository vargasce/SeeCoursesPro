export class EntidadModel{

    constructor(
        public id:number,
        public id_usuario:number,
        public id_provincia:number,
        public id_pais:number,
        public descripcion:string,
        public web:string,
        public email:string,
        public verificado:boolean,
        public nombre:string,
        public direccion:string,
        public telefono:string,
        public imagen:string,
        public cuit:string,
        public ciudad:string,
        public director:string,
        public id_actividad:number
    ){

    }
}
