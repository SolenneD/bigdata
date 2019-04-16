const express = require("express")
const app = express()
const fs = require("fs")
const pm2 = require('pm2')

const csvSplitStream = require('csv-split-stream');
 
return csvSplitStream.split(
  fs.createReadStream('StockEtablissement_utf8.csv'),
  {
    lineLimit: 250000
  },
  (index) => fs.createWriteStream(`csv/output-${index}.csv`)
)
.then(csvSplitResponse => {
  console.log('csvSplitStream succeeded.', csvSplitResponse);
}).catch(csvSplitError => {
  console.log('csvSplitStream failed!', csvSplitError);
});

