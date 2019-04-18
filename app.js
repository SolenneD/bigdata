const fs = require("fs")
const pm2 = require('pm2')

let MongoClient = require('mongodb').MongoClient
let url = "mongodb://localhost:27017/"

const csvFilePath='./csv/output-0.csv'
const csv=require('csvtojson')

process.on('message', function(packet) {
		console.log('GET MESSAGE: ', packet.data);
		console.log("coucou")
		// csv()
		// .fromFile(csvFilePath)
		// .then((jsonObj)=>{
		// 	MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
		// 		if (err) throw err;
		// 		var dbo = db.db('bg');
		// 		dbo.collection('etablissements').insertMany(jsonObj, (err, res) => {
		// 		if (err) throw err;
		// 		db.close();
		// 		});
		// 	});
		// })
});