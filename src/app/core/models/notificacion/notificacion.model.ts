export class NotificacionModel{

    constructor(
        public id:number,
        public id_entidad:number,
        public id_estado:number,
        public id_curso:number,
        public visto:boolean,
        public es_admin:boolean,
        public es_curso:boolean,
        public pendiente:boolean,
        public descripcion:string,
        public observacion:string,
        public fecha:string,
    ){

    }
}