const fs = require("fs")
const pm2 = require('pm2')

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
        data: 'bluh',
        topic: 'bluh',
        id: i
     }, function(err, res) {
        if (err)
         console.log(err)
   });
  });
  
  // pm2.delete(0)
  // pm2.disconnect();

}