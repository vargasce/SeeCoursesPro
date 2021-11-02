'use strict'
/** METODOS PARA MENEJO DE FECHAS.
 * @Observations : La idea es centralizar todos los datos de fechas,
 * asi mantaner instacias y usos generales de los mismos.
 *
 */

/** OBTENER FECHA ACTUAL EN STRING
 * @Observations : Retorna fecha actual en formato de string.
 * tener encuanta que retorna string completo en español.
 * @returns fecha : string.
 */ 
const getDateCurrentString = () => {
	let date = new Date();
	let options = {
		//weekday: 'long',
		year: 'numeric',
		month: 'numeric',
		day: 'numeric'
	};

	return date.toLocaleDateString( `es-MX` , options );
}

/** OBTENER FECHA ACTUAL STRING CUSTOM
 * @Observations : Retorna fecha actual en formato  de string,
 * en este caso la fecha es armada a mano en forma de  (yyyy-MM-DD);
 * @Retorna fecha : string => custom striong (yyyy-MM-DD)
 */ 
const getDateCurrentStringCustom = () => {
	let date = new Date();
	return `${date.getFullYear().toString()}-${( date.getMonth()+1 ).toString()}-${date.getDate().toString()}`;
}


/** OBTENER FECHA ACTUAL.  
 * @Observations : Retorna fecha actual, instancia Date.
 * @returns fecha : Date.
 */ 
const getDateCurrent = () => {
	return new Date();
}

/** OBTENER HORA Y MINUTOS ACTUAL.
 * @Observations : Retorna hora y minutos actual en formato
 * de string.
 * @returns time : string
 */ 
const getHourMinuteCurrent = () => {
	let date = new Date();
	let hour = ('0'+date.getHours() .toString()).slice(-2);
	let minute = ('0'+date.getMinutes().toString()).slice(-2);
	let seconds = ('0'+date.getSeconds().toString()).slice(-2);
	return `${hour}:${minute}:${seconds}`;
}

module.exports = {
	getDateCurrentString : getDateCurrentString,
	getDateCurrent : getDateCurrent,
	getHourMinuteCurrent : getHourMinuteCurrent,
	getDateCurrentStringCustom : getDateCurrentStringCustom
}

