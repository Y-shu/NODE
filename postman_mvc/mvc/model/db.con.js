const mongoose = require('mongoose');
const CONFIG = require('../config');
require('./hotels.model'); //adding hotels schema.
require('./users.model');// adding users schema
const options={
  user:CONFIG.DBUSR,
  pass:CONFIG.DBPWD,
  authSource:CONFIG.AUTHSRC,
  useNewUrlParser: true
}
mongoose.connect(CONFIG.DBURL,options);
var _conn = mongoose.connection;
//console.log(_conn);
//on event always trigger.once event only one time.
_conn.on('error',function(error){
  console.error('Connection Failed Vai Mongoose!');
  console.log(error);
});
_conn.once('open',function(){
  console.log('Connection successful Vai Mongoose!');
});

function graceFullShutDown(signal,callback){
  mongoose.connection.close();
  console.log("Mongodb Connection Object closed ");
  console.log("App Termination Due To "+signal);
  callback();
}
process.on('SIGINT',function(){
  graceFullShutDown('SIGINT',function(){
      process.exit(0);    
  });
});
process.on('SIGTERM',function(){
  graceFullShutDown('SIGTERM',function(){
      process.exit(0);    
  });
});

process.on('SIGQUIT',function(){
  graceFullShutDown('SIGQUIT',function(){
      process.exit(0);    
  });
});
process.once('SIGUSR2',function(){
  graceFullShutDown('SIGUSR2',function(){
      process.kill(process.pid,'SIGUSR2')   
  });
});



