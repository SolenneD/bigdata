const fs = require('fs')
const pm2 = require('pm2')

const csvs = fs.readdirSync('./csv/')

pm2.connect((err) => {
  if (err) {
    console.error(err)
    process.exit(2)
  }
})

for (let i = 0; i < 4; i += 1) {
  pm2.start({
    script: 'app.js'
  }, (errorss, appss) => {
    if (errorss) console.log(appss)
    pm2.sendDataToProcessId({
      type: 'process:msg',
      data: csvs[i],
      topic: 'bluh',
      id: i
    }, (err, res) => {
      csvs.shift()
      if (err) console.log(res)
    })
  })
}

pm2.launchBus((err, bus) => {
  bus.on('process:msg', (pack) => {
    pm2.delete(pack.process.pm_id)

    pm2.start({
      script: 'app.js'
    }, (errors, apps) => {
      if (errors) console.log(apps)
      pm2.sendDataToProcessId({
        type: 'process:msg',
        data: csvs[0],
        topic: 'bluh',
        id: 0
      }, (errorb, res) => {
        csvs.shift()
        if (errorb) console.log(res)
      })
    })
  })
})
