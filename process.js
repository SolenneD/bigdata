const fs = require("fs")
const pm2 = require('pm2')

const csvs = fs.readdirSync('./csv/');

// console.log(csvs)

pm2.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
});

for(let i = 0 ; i<4 ; i++) {
  pm2.start({
    script    : 'app.js',
  }, function(err, apps) {
      console.log(i)
       pm2.sendDataToProcessId({
        type: 'process:msg',
        data: csvs[i],
        topic: 'bluh',
        id: i
     }, function(err, res) {
       csvs.shift
        if (err)
         console.log(err)
   });
  });
}

pm2.launchBus(function(err, bus) {
  bus.on('process:msg', function(package) {
    pm2.delete(package.process.pm_id)

    pm2.start({
      script    : 'app.js',
    }, function(err, apps) {
        console.log(i)
         pm2.sendDataToProcessId({
          type: 'process:msg',
          data: csvs[0],
          topic: 'bluh',
          id: i
       }, function(err, res) {
        csvs.shift
          if (err)
           console.log(err)
     });
    });
  });
});