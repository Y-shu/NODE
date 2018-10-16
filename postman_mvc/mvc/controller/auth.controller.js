const mongoose = require('mongoose');
const User = mongoose.model('User');
const CONFIG = require('../config');
//requiring bcrypt for password encryption bcrypt and bcryptjs are same just some version change...
const bcrypt=require('bcryptjs');
const jwt = require('jsonwebtoken');

const log4js = require('log4js');

log4js.configure('./mvc/config/log4js.json');
var usersLogger = log4js.getLogger('users');
var accessLogger = log4js.getLogger('access');
var errorLogger = log4js.getLogger('error');


module.exports.tokenValidator=(req,res,next)=>{
    var token=req.headers['x-access-token'];
    if(!token){
        res
        .status(404)
        .json({
            message:"Token Not Found",
            token:null,
            auth:false
        });
        errorLogger.error("Token Not Found");
    }else{
        //verify evaluate token
        jwt.verify(token,CONFIG.SECRETKEY,function(error,doc){
           if(error){
            res
            .status(401)
            .json({
                message:"Failed to authenticate:Unauthozised",
                token:null,
                auth:false
            });
            errorLogger.error("Failed to authenticate:Unauthozised");
           }else{
            //    console.log("Document",doc);
               //checking user exixts or not
               User.findById(doc._id,function(error,user){
                if(error){
                    res
                    .status(500)
                    .json({
                        message:"User not found via token:Internal Server Error",
                        token:null,
                        auth:false
                    });
                    errorLogger.error('User not found via token:Internal Server Error');
                   }  if(!user){
                    res
                    .status(404)
                    .json({
                        message:"User not found via token",
                        token:null,
                        auth:false
                    });
                    errorLogger.error("User not found via token");
                   }else{
                    // res
                    // .status(200)
                    // .json({
                    //     message:"Valid Token ",
            
                    //     auth:true
                    // });
                    next();
                    usersLogger.info("User Login Successful via Valid Token");
                   }
               });//find query closing
              
               
           }
        })//jwt verification token
    }
}
module.exports.registration=(req,res,next)=>{
    if(!req.body && req.body.name && req.body.email && req.body.password && req.body.phoneNumber){
        var saltRounds = 10;
        //generating salt value-random generated value is called salt this gets attached with password
        //saltvalue encrypts password
        var salt = bcrypt.genSaltSync(saltRounds);
        //converting into hash password
        var hashPassword = bcrypt.hashSync(req.body.password,salt);
          var newUser = new User({
              name:req.body.name,
              email:req.body.email,
              password:req.body.password,
              phone:req.body.phoneNumber,
              role:req.body.role
          });
          newUser.save(function(err,user){
              if(err){
                  res
                  .status(500)
                  .json({
                      message:"Failed to Register a User..Intenal Server Error!",
                    error:err
                });
                errorLogger.error("Failed to Register a User..Intenal Server Error!");
              }else{
                  //sign method of jwt contains header part by default so two fields are remaining to be filled-payload and signkey
                  //var token = jwt.sign(payload,signatureKey,expires In)
                  //giving 12 hours time 
                  var token = jwt.sign({_id:user._id},CONFIG.SECRETKEY,{expiresIn:43200})
                     res
                     .status(200)
                     .json({
                         message:"Registration Successfull!",
                         auth:true,
                         token:token
                     });
                     usersLogger.info("User is registered successfully with Token:"+token);
              }
          });
    }else{
        res
        .status(404)
        .json({message:"Required fields are missing..!!"});
        errorLogger.error("Failed To Register a User, Required Fields are missing!")
    }
}
module.exports.login =(req,res,next)=>{
    if(req.body && req.body.email && req.body.password){
        User.findOne({email:req.body.email},function(error,user){
            if(error){
                res
                .status(500)
                .json({
                    message: "Failed to Login a User ..Internal Server Error",
                    error:error,
                    auth:false
                });
            }else{
                if(!user){
                res
                .status(404)
                .json({
                    message: "User Not Found! Get Registered",
                    auth:false
                });
                }else{
                    var isPwd = bcrypt.compareSync(req.body.password,user.password)
                    if(!isPwd){
                        res
                        .status(401)
                        .json({
                            message: "Invalid Password !",
                            auth:false
                        });
                    }else{
                    var token  = jwt.sign({_id:user._id},CONFIG.SCRTKEY,{expiresIn:43200})
                        res
                        .status(200)
                        .json({
                            message: "Login SucessFull !",
                            auth:true,
                            token:token
                            // user:user
                        });
                        usersLogger.info("User is registered with token ", token);
                    }  
                }
            }
        })
    }else{
        res
        .status(404)
        .json({
            message: "Required Feilds are Missing",
        });
    }
}