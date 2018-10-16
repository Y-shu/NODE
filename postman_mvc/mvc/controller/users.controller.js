require('../model/db.con')
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
  .skip(offset)
  .limit(count)
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
  console.log("Add One User Post");
  console.log(req.body);
  if (req.body && req.body.name && req.body.email &&
      req.body.phoneNumber) {
      var newUser = new User({
          name:req.body.name,
          email:req.body.email,
          phoneNumber:req.body.phoneNumber,
    
      });
      newUser
      .save(function (error, response) {
          if (error) {
              res
                  .status(500).json({
                      message: "Internal Server Error",
                      error: error
                  });
          } else {
              res
              .status(200)
              .json(response);
          }
      })
  } else {
      res
          .status(200)
          .json({
              message: "Required Feilds For creating User is Missing"
          });
  }
}
module.exports.getOneUser = (req, res, next) => {
  var userId = req.params.userId;
  console.log(req.params.userId);
  if (req.params && req.params.userId) {        
      User
      .findById(userId)
      .exec(function (error, user) {
              if (error) {
                  res
                      .status(404)
                      .json({
                          message: "User Records Not Found",
                          error: error
                      });
              } else {
                  res
                      .status(200)
                      .json(user);
              }
          });
  } else {
      res
          .status(404)
          .json({ message: "Request Params UserId  is Not In Url" })
  }

}