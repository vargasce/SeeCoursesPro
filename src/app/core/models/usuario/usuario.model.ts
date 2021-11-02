export class UsuarioModel{

    constructor(
        public id:number,
        public usuario:string,
        public pass:string,
        public fecha_alta:string,
        public activo:boolean,
    ){

    }
}