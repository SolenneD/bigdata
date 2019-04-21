const moveFile = require('move-file')

const { MongoClient } = require('mongodb')

const url = 'mongodb://localhost:27017/'

const csv = require('csvtojson')

process.on('message', (pack) => {
  console.log('GET MESSAGE: ', pack.data)
  const csvFilePath = `./csv/${pack.data}`
  csv()
    .fromFile(csvFilePath)
    .then((jsonObj) => {
      MongoClient.connect(url, { useNewUrlParser: true }, (err, db) => {
        if (err) throw err
        const dbo = db.db('bg')
        dbo.collection('etablissements').insertMany(jsonObj, (or, res) => {
          if (or) console.log(res)
          db.close();

          (async () => {
            await moveFile(csvFilePath, `csvmove/${pack.data}`)
            console.log('The file has been moved')

            process.send({
              type: 'process:msg',
              data: {
                success: true
              }
            })
          })()
        })
      })
    })
})
