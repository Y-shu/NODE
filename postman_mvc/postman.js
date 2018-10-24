// require('./mvc/model/db.connection'); //this is to establish connection with mongodb
require('./mvc/model/db.con'); //mongoose connection
var express = require('express');//requiring express
var app = express();
const CONFIG = require('./mvc/config'); //config--connection establishment
var path = require('path');
var bodyParser=require('body-parser');
const hotelRoutes = require('./mvc/router/hotel.routes');//hotel-routes
const userRoutes = require('./mvc/router/user.routes');//user-routes
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json({type:'application/json'}));
const fs=require('fs');

const log4js = require('log4js');
log4js.configure('./mvc/config/log4js.json');
var startUpLog = log4js.getLogger('startUpLogger')
var accesslog = log4js.getLogger('access')
app.use(function(req,res,next){
   
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers","Origin,X-Requested-With, Content-Type,x-access-token, Accept");
    next();
    });
// try{
//     require('fs').mkdirSync('./log');

// }catch(error){
//     if(error.code !='EXIST'){
//         console.error("Could not setup a log directory.",error);
//         process.exit(1);
        
//     }
// }
app.use(express.static(path.join(__dirname,'public')));
app.use(log4js.connectLogger(log4js.getLogger('http'),{level:'auto'}))
app.use(function(req,res,next){
    accesslog.info("Hit "+req.method+ " "+req.url);
    next();
})
    app.use('/api',userRoutes);
    app.use('/api/api',hotelRoutes);
    
    console.log("I am Last Statement of Server File!");
    



app.listen(CONFIG.PORT,CONFIG.HOST,function(){
    // console.log("Bro Server is Running on http://127.0.0.1:" +CONFIG.PORT);
    startUpLog.info('Server Now with Logger on PORT :'+CONFIG.PORT);
    startUpLog.info('Server Now WIth Logger on http://127.0.0.1:'+CONFIG.PORT);
});


/*body-parser is a piece of express middleware that reads a form's
 input and stores it as a javascript object accessible through req.body */