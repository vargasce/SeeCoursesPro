export class Usuario_AdminModel{

    constructor(
        public id:number,
        public id_administrador:number,
        public id_rol:number,
        public usuario:string,
        public contrasenia:string,
        public pass_extremo:string,
        public pass_actualizado:boolean,
        public activo:boolean,

    ){

    }
}