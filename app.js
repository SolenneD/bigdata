const fs = require("fs")
const pm2 = require('pm2')

console.log("coucou")
// receive message from master process
process.on('message', function(packet) {
		console.log('GET MESSAGE: ', packet.data);
});