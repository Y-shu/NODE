//requiring mongoose connection
const mongoose = require('mongoose');
//requiring my configurations
const CONFIG = require('../config');
require('./hotels.model'); //adding hotels schema.
require('./users.model');// adding users schema
const options={
  user:CONFIG.DBUSR,
  pass:CONFIG.DBPWD,
  authSource:CONFIG.AUTHSRC,
  useNewUrlParser: true
}
//this connect method of mongoose takes db url and user related config details
mongoose.connect(CONFIG.DBURL,options);
//_con stores the connection established
var _conn = mongoose.connection;

//"on" event get triggered when particular event occurs
_conn.on('error',function(error){
  console.error('Mongoose Connectivity Faild!');
  console.log(error);
});
//"once" event happens only once.
_conn.once('open',function(){
  console.log('Hurry!Mongoose Connection is Successful!');
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



