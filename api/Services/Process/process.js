'use strict'

const { QueryAwait } = require('../../DB-connect/connectDB');
const dt = require('../../Custom/dates/dates');
const CronJob = require('cron').CronJob;
const hora = process.env.timeHora;
const min = process.env.timeMinutos;

class Process {

    constructor(){ }

    start(){
        console.log(`Verifico hora : ${hora} ${min}`)
        new CronJob(`${min} ${hora} * * *`, ()=>{ this.process() } , this.processEnd , true);        
    }

    process(){
        this.verifyDateFinalice();
    }

    /** ACTUALIZA FECHA FINALIZADAS.
     * @Observations => Consulta a la fecha todos los cursos, en caso de fechas pasadas,
     * los actualiza.
     */
    async verifyDateFinalice(){
        let fecha = dt.getDateCurrentStringCustom();
        let sql = this.getSqlStringFechas( fecha );

        try{

            await QueryAwait('BEGIN');
            let result = await QueryAwait( sql );
            let data = this.getDatesUpdate( result.rows );

            for(let i=0; i<data.length; i++){
                let sqlUpdate = this.getSqlStringUpdateStatus( data[i].id );
                await QueryAwait( sqlUpdate );
            }

            let ok = await QueryAwait('COMMIT');
            if( ok ) console.log('[+] Cursos Actualizados.');

        }catch( error ){
            await QueryAwait('ROLLBACK');
            throw error;
        }
    }

    processEnd(){
        console.log(`[+] Process End!!!`);
    }

    /** GET DATE UPDATE
     * @Observarions => Realiza un reduce de la consulta, obteniendo los finalizados igual a false.
     * @param { Array } data => Array a realizar el reduce.
     * @returns { Array } => Nuevo array reducido o vacio.
     */
    getDatesUpdate( data ){

        let reduceData = data.reduce( ( acc, current ) =>{
            if( current.finalizado == false ){
                acc.push( current );
                return acc;
            }else{
                return acc;
            }
        }, []);

        return reduceData;
    }

    getSqlStringUpdateStatus( id ){
        let sql = `
            UPDATE itinerario SET finalizado = true WHERE id = ${id} ;
        `
        return sql;
    }

    getSqlStringFechas( fecha ){
        let sql = `
            SELECT id, finalizado FROM itinerario WHERE fecha_itinerario BETWEEN '2018-01-01' AND '${fecha}'
        `;
        return sql;
    }


}

module.exports = new Process();

