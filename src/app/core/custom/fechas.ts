export class fechas{

    public currentDate():string{
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        return yyyy + '/' + mm + '/' +dd ;
    }

    public currentDateConGuionMedio():string{
        var today = new Date();
        var dd = String(today.getDate() + 1).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        return yyyy + '-' + mm + '-' +dd ;
    }

    public validarHorarios(hora_comienzo:string, hora_final:string):boolean{
        let date = new Date();
        let dateFin = new Date();    
        let splitHora = hora_comienzo.split(':');
        let splitHoraFin = hora_final.split(':');    
        
        date.setHours(Number(splitHora[0]));
        date.setMinutes(Number(splitHora[1]));
    
        dateFin.setHours(Number(splitHoraFin[0]));
        dateFin.setMinutes(Number(splitHoraFin[1]));
        
        if(dateFin.getTime()<=date.getTime()){
          return true;
        }else{
          return false;
        }        
    }
}