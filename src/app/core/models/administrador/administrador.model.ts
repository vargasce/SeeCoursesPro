export class AdministradorModel{

    constructor(
        public id:number,
        public fecha_alta:string,
        public pass:string,
        public pass_extremo:string,
        public activo:boolean,
        public usuario:string,
    ){

    }
}