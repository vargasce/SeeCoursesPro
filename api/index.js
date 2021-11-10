'user strict'

const app = require('./app');
const envProperties = require("./env.vars.json");
const node_env = process.env.NODE_ENV || 'developmen';
const props = envProperties[node_env];
const port = props.PORT;
const host = props.URL;
const http = require('http');
process.env.DB = props.DB;


function createServer (){
	http.Server = app.listen(port,host, ()=>{
		console.log(`[+] Service "Billing" run, enter next address => Url : http://${host}:${port}/api`);
	});
	return http.Server;
}

createServer();

