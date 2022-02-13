
const md5 = require('md5');

console.log("Escribe texto para codificar en MD5 : ");
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    console.log(`string : ${d.toString().trim()} , decode : ${md5(d.toString().trim())}`);
    console.log(`Press CTRL + C para salir, pelotudo corta con la compilacion ... `);
});