const fs = require("fs")
const pm2 = require('pm2')
const moveFile = require('move-file')

let MongoClient = require('mongodb').MongoClient
let url = "mongodb://localhost:27017/"

const csv=require('csvtojson')

process.on('message', function(package) {
		console.log('GET MESSAGE: ', package.data);
		const csvFilePath='./csv/'+package.data
		csv()
		.fromFile(csvFilePath)
		.then((jsonObj)=>{
			MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
				if (err) throw err;
				var dbo = db.db('bg');
				dbo.collection('etablissements').insertMany(jsonObj, (err, res) => {
				if (err) throw err;
				db.close();

				(async () => {
					await moveFile(csvFilePath, 'csvmove/'+package.data);
					console.log('The file has been moved');

					process.send({
						type : 'process:msg',
						data : {
						 success : true
						}
				 });
				})();
				});
			});
		})
});