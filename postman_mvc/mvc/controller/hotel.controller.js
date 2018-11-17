//with the help of mongoose all operations have done. all data with mongodb copied in hotel.controller file.
// require('../model/db.con')
const mongoose = require('mongoose');
//model object internally search for mongoose connection...
var Hotel = mongoose.model('Hotel');
var User = mongoose.model('User');

const log4js = require("log4js");
var errorLogger = log4js.getLogger("errorFile");
var accessLogger = log4js.getLogger("access");
let hotelsLogger = log4js.getLogger("hotels");

var ObjectId = require('mongodb').ObjectId;
//getting hotels data
module.exports.getAllHotels = (req,res,next)=>{
  var offset = 0;
  var count = 5;
  if(req.query &&req.query.offset){
    offset=parseInt(req.query.offset,10);
  }
  if(req.query && req.query.count){
    count=parseInt(req.query.count,10);
  }
  //exec( )--->executes query --->mongoose related method

  Hotel
  .find()
  // .skip(offset)
  // .limit(count)
  .exec((error,hotels)=>{
    if(error){
      res
      .status(404)
      .json({
        message:"Hotel Record Not Found!",
        error:error
      });
      errorLogger.error("Hotels Record Not Found");
      }else{
       res
       .status(200)
       .json(hotels);
       accessLogger.info("Hotel Records Found!");
       }
  });

};

//Here for one hotel with the help of hotelId.index is passed with param./hotel/index
module.exports.getOneHotel = (req,res,next) =>{
if(req.params && req.params.hotelId){
Hotel
     .findById({_id:req.params.hotelId})
     .exec(function(error,hotel){
  if(error){
  console.log(error);
        res
        .status(404)
        .json({
          message:"Requested Hotel Record Not Found",
          error:error
        });
errorLogger.error("Requested Hotel Record Not Found")
      }else{
        res
        .status(200)
        .json(hotel)
accessLogger.info("Requested Hotel Found!")
      }
    });
}else{
    res
    .status(404)
    .json({
      message:"Requested Params does not contain any HotelId to search for!!",
    });
errorLogger.error("Requested Params does not contain any HotelId to search for!!");
  }
};

 //Adding new hotel with request body.
module.exports.addOneHotel = (req,res,next) =>{
//two methods to insert into db.here in backend we have also given some field as required
//and we are also given 3 fiels required.,nd in schema we alse have given some fields required.
if(req.body && req.body.name && req.body.stars && req.body.address){
//   //Object to store values obtained...
      var newhotel = new Hotel({
        name:req.body.name,
        stars:req.body.stars,
        'location.address':req.body.address,
        services:req.body.services,
        "rooms":[{price:req.body.price}]
      });
    newhotel
       .save((error,response)=>{
      if(error){
      res
      .status(500)
      .json({
        message:"Internal Server Error!",
        error:error
      });
errorLogger.error("Internal Server Error!")
    }else{
        res.status(200)
        .json(response);
    //   hotelsLogger.info("Hotel Added Successfully!");
      }
  });
}
}


//update hotel name or whole data or nested data.
module.exports.updateOneHotel = (req,res,next) =>{
var hotelId = req.params.hotelId;
let updateQuery = {
  $set:{
    "name":req.body.name
  }
};
Hotel
.findByIdAndUpdate(hotelId,updateQuery,function(error,response){
if(error){
  res
  .status(404)
  .json({
    message:"The hotel document update FAILED",
    error:error
  });
  errorLogger.error("The hotel document update FAILED");
}else{
  res
  .status(200)
  .json({
    message:"The hotel document is updated successfully!"
  });
  hotelsLogger.info("The hotel document is updated successfully");
}
});
};

//getting reviews
module.exports.allReviewsForHotel = (req, res, next) => {
  let hotelId = req.params.hotelId;
  if (req.params && req.params.hotelId) {
      Hotel.findById(hotelId)
          .select('reviews')
          .exec((err, reviews) => {
              if (err) {
                  res
                      .status(404)
                      .json({
                          message: "Hotel Records Not Found",
                          error: err
                      });
              } else {
                  res
                      .status(200)
                      .json(reviews);
              }
          })
  } else {
      res
          .status(404)
          .json({
              message: "Request Params HotelId is Not In Url"
          })
  }
}
// review by review id
module.exports.OneReviewForHotel = (req, res, next) => {
  let hotelId = req.params.hotelId;
  let reviewId = req.params.reviewId;
  if (req.params && req.params.hotelId && req.params.reviewId) {
      Hotel
          .findById(hotelId)
          .select('reviews') //for projecting reviews only
          .exec(function(error, reviews) {
              if (error) {
                  res
                      .status(404)
                      .json({
                          message: "Hotel Records Not Found",
                          error: error
                      });
              } else {
                  var review = reviews.reviews.id(reviewId)
                  res
                      .status(200)
                      .json(review);
              }
          });
  } else {
      res
          .status(404)
          .json({
              message: "Request Params HotelId is Not In Url"
          })
  }
}

//book hotel
module.exports.bookHotel = (req, res, next) => {
  try {
      let userId = req.params.userId;
      console.log(userId);
      let hotelId = req.params.hotelId;
      console.log(hotelId);
      findOneHotelOneUser(hotelId, userId).then((data) => {
          console.log(data)
          let bookHotelHistory = {
              $push: {
                  'bookhistory': [{
                      hotelName: data.hotel.name,
                      hotelId: data.hotel._id,
                      price: data.hotel.rooms.price,
                      bookingDate: new Date(),
                      checkIn: new Date(),
                      checkOut: new Date(),

                  }]
              }
          }
          if (data.user._id) {
              User.findByIdAndUpdate(userId, bookHotelHistory, (err, doc) => {
                  if (err) {
                      res.set('application/json')
                          .status(500)
                          .json({
                              error: err,
                              message: "Booking Is not Completed Due to Server Error"
                          })
                  } else {
                      res.status(200)
                          .json({
                              response: true,
                              message: "Booking Completed !"
                          })
                  }
              })
          } else {
              res.status(404).json({
                  message: "For Booking User Not Found!"
              });
          }
      })
  } catch (err) {
      res.status(500).json(error)
  }
}


async function findOneHotelOneUser(hotelId, userId) {
  if (!hotelId) {
      throw new Error("Hotel Id Is Not Found")
  }
  if (!userId) {
      throw new Error("UserId Is Not Found")
  }
  var hotel = await Hotel.findById(hotelId);
  var user = await User.findById(userId);
  return {
      hotel: hotel,
      user: user
  };
}