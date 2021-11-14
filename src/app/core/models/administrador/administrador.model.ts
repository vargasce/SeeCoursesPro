export class AdministradorModel{

    constructor(
        public id:number,
        public fecha_alta:string,
        public activo:boolean,
        public nombre:string,
        public apellido:string,
        public email:string,
        public dni:string
    ){

    }
}