
const _itinerarioService = require('./itinerario.service');

let d = {
    'fecha_itinerario' : '2021-01-01',
    'hora_itinerario' : '09:00:00',
    'hora_itinerario_fin' : '10:15:00'
}

const test = async ( data ) => {
    let result = await _itinerarioService.getAvailabilityDate( data );
    console.table( result );
}

test( d );