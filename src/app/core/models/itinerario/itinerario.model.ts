export class ItinerarioModel{

    constructor(
        public id:number,
        public id_entidad:number,
        public nombre:string,
        public titulo:string,
        public descripcion:string,
        public observacion:string,
        public fecha_itinerario:string,
        public hora_itinerario:string,
        public hora_itinerario_fin:string,
        public fecha_alta:string,
        public imagen:string,
        public link:string,
        public instructor:string,
        public viewed:boolean,
        public validado:boolean,
        public finalizado:boolean,
        public rechazado : boolean

    ){

    }
}