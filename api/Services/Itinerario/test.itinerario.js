
const _itinerarioService = require('./itinerario.service');

let d = {
    'fecha_itinerario' : '2021-01-01',
    'hora_itinerario' : '00:00:00',
    'hora_itinerario_fin' : '01:00:00'
}

const test = async ( data ) => {
    let result = await _itinerarioService.getAvailabilityDate( data );
    console.log('llegue aca');
    console.log( result );
}

test( d );