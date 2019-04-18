const fs = require("fs")
const pm2 = require('pm2')


pm2.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }
  
  
});
pm2.start({
  script    : 'app.js',
}, function(err, apps) {
     pm2.sendDataToProcessId({
      type: 'process:msg',
      data: 'toto',
      topic: 'toto',
      id: 0
   }, function(err, res) {
      if (err)
       throw err;
 });
  if (err) throw err
});

// pm2.delete(0)
// pm2.disconnect();
