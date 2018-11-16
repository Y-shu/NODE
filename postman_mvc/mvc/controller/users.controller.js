//establising mongoose connection
require('../model/db.con');
const mongoose = require('mongoose');
//model object internally search for mongoose connection...
var User=mongoose.model('User');

var ObjectId = require('mongodb').ObjectId;
module.exports.getUsers =(req,res,next)=> {
  var offset = 0;
  var count = 4;
  console.log(req.query);
  if(req.query && req.query.offset){
    offset = parseInt(req.query.offset,10);
    }
    if(req.query && req.query.count){
      count = parseInt(req.query.count,10);
    }
  User
  .find()
//   .skip(offset)
//   .limit(count)
  .exec((error,users)=>{
    if(error){
      console.log(error);
      res
      .status(404)
      .json({
          message:"User Record Not Found!",
          error:error
      });
    }
    else{
       res
       .status(200)
      .json(users)
    }
  //connection.close();
  })
}
  
module.exports.addOneUser = (req, res, next) => {
    console.log('Add One User By Post');
    if (req.body && req.body.name && req.body.email && req.body.password) {
        User.insertMany(req.body, (error, user) => {
            if (error) {
                res.status(500).json({
                    message: "error while adding user",
                    error: error
                })
            } else {
                res.status(200).json({
                    message: 'added one user',
                    response: 'ok'
                });
            }
        });
    } else {
        res.status(200).json({
            message: "Required Feilds For creating User is Missing ",
        });
    }
}
      

module.exports.getOneUser = (req,res,next) =>{
    var userId = req.params.userId;
    console.log(userId);
    if(userId){
      var user = userData[userId];
      console.log(user);
      res.status(200)
      .json(user);
    }
    else{
      res.status(200)
      .json({message:"User Id not Found"});
  
    }
  }