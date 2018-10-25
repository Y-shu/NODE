//with the help of mongoose all operations have done. all data with mongodb copied in hotel.controller file.
// require('../model/db.con')
const mongoose = require('mongoose');
//model object internally search for mongoose connection...
var Hotel = mongoose.model('Hotel');
// var User = mongoose.model('User');

// const CONFIG = require('../config')

var ObjectId = require('mongodb').ObjectId;
//getting hotels data
module.exports.getAllHotels = (req,res,next)=>{
  var offset = 0;
  var count = 4;
  console.log(req.query);
  if(req.query &&req.query.offset){
    offset=parseInt(req.query.offset,10);
  }
  if(req.query && req.query.count){
    count=parseInt(req.query.count,10);
  }
  //exec( )--->executes query --->mongoose related method

  Hotel
  .find()
  .skip(offset)
  .limit(count)
  .exec((error,hotels)=>{
    if(error){
      console.log(error);
      res
      .status(404)
      .json({
        message:"Hotel Record Not Found!",
        error:error
      });
      }else{
       res
       .status(200)
       .json(hotels)
       }
  })

}

// //Here for one hotel with the help of hotelId.index is passed with param./hotel/index
module.exports.getOneHotel = (req,res,next) =>{

  var hotelId = req.params.hotelId;
  console.log(req.params);
  
  console.log(hotelId);
  if(req.params && req.params.hotelId){
    Hotel
    .findById(hotelId)
    .exec(function(error,hotel){
      if(error){
        res
        .status(404)
        .json({
          message:"Hotel Record Not Found",
          error:error
        });
      }else{
        res
        .status(200)
        .json(hotel)
      }
      
    });

  }
  else{
    res
    .status(404)
    .json({
      message:"Requested Params HotelId Not Found!",
    });
  }
}

//Adding new hotel with request body.
module.exports.addOneHotel = (req,res,next) =>{
  //var hotel = req.body;

    //Hotel.create(req.body,function(err,doc))
//two methods to insert into db.here in backend we have also given some field as required
//and we are also given 3 fiels required.,nd in schema we alse have given some fields required.
    console.log("Add One Hotels Post");
    console.log(req.body);
    

if(req.body && req.body.name && req.body.stars && req.body.description){
      var newhotel = new Hotel({
        name:req.body.name,
        stars:req.body.stars,
        'location.address':req.body.address,
        currency:req.body.currency,
        services:req.body.services
      });
      newhotel
      .save(function(error,response){
      if(error){
      res
      .status(500)
      .json({
        message:"Internal Server Error!",
        error:error
      });
    }else{
        res.status(200)
        .json(response)
      }
  })
}
// }else{
//     res
//     .status(200)
//     .json({
//       message : "Required fields for creating hotel is missing!"
//     });
//   }
}

//update hotel name or whole data or nested data.
module.exports.updateOneHotel = (req,res,next) =>{
  try{
    console.log("Update One Hotel");
   var hotelId = req.params.hotelId;
  var updateQuery ={$push :{"reviews":req.body.reviews} }
  //findByIdAndUpdate is default method
  Hotel
    .findByIdAndUpdate(hotelId,updateQuery,function(error,response){
      if(error) throw error;
    res
    .status(200)
    .json({
      message:"Update successfully",
      response:"Ok"
    });

    });
  }catch(error){
    res
    .status(500)
    .json({
      message:"Error While Updating hotel!"
    });
  }
  
}



// //getting reviews
module.exports.allReviewsForHotel = (req,res,next) =>{

  var hotelId = req.params.hotelId;
  console.log(hotelId);
  if(req.params && req.params.hotelId &&req.params.reviews){
    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(error,reviews){
      if(error){
        res
        .status(404)
        .json({
          message:"Hotel records Not Found",
          error:error
        });
      }else{
      res
      .status(200)
      .json(reviews.review);
      }
    });
}else{
    res
    .status(404)
    .json({
      message:"Request Params HotelId is Not in Url"
    });
   }
}

// review by review id
module.exports.OneReviewForHotel = (req,res,next) =>{
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;
  console.log(hotelId);
  if(req.params&&req.params.hotelId&&req.params.reviewId){
    Hotel
    .findById(hotelId)
    .select('reviews')
    .exec(function(error,reviews){
      if(error){
        res
        .status(404)
        .json({
          message:"Hotel Record Not Found",
          error:error
        })
      }else{
      //for nested levels reviews-->reviewsId
      //.id method is only for _id field(nested field)  
      var review = reviews.reviews.id(reviewId);
      res
      .status(200)
      .json(reviews);
      }
    });
   }else{
    res.status(200)
    .json({
      message:"Request Params Hotel Id is Not in Url"
    });

  }

}

//delete review by review id.
module.exports.deleteReview = (req,res,next) =>{
  var hotelId = req.params.hotelId;
  var reviewId = req.params.reviewId;

  console.log(hotelId);
    if(hotelId){
      Hotel
      .findById(hotelId)
      .select('reviews')
      .exec(function(err,reviewsHotel){
        if(err){
          res.status(400).json({message:"Review Id Not Found"})
        }
        var review = reviewsHotel.reviews.id(reviewId);
        res.status(200)
        .json(review);
      })

    }
  else{
    res.status(200)
    .json({message:"Hotel Id not Found"});

  }
}
module.exports.showbookedHotel =async (req,res,next) =>{
  var userId = req.params.userId;
  console.log(req.params.userId);
  if(req.params && req.params.userId){
    User
    .findById(userId)
    .select('bookHistory')
    .exec(function(error,hotels){
      if(error){
        res.status(500)
        .json({
          message:"Internal Server Error",
          error:error
        });
      }else{
        res.status(200).json(hotels);
      }
    });
  }else{
    res.status(404)
    .json({message:"Request params UserId Not Found"})
  }
}

 //book hotel
module.exports.bookHotel =async (req,res,next) =>{
  try{
   

    var hotelId = req.params.hotelId;
    var userId = req.params.userId;
    findOneHotelOneUser(hotelId,userId).then((data)=>{
      // console.log(data);
    // res.status(200).json(data);
    //$push means appending data
    var bookHotelHistory = {$push:{'bookHistroy':[
      {
        name:data.hotel.name,
        hotelId:data.hotel._id,
        price:data.hotel.rooms[0].price,
        bookingDate:new Date(),
        checkIn:new Date(),
        checkOut:new Date()
  
      }
    ]}}
    if(data.user._id){
      User.findByIdAndUpdate(userId,bookHotelHistory,
        function(err,doc){
        if(err){
          res
          .set('application/json')
          .status(500).json({
            error:err,
            message:"Booking is not completed Due to Server Error"
          })
        }else{
          res
          .status(200)
          .json({
            response:true,
            message:"Booking Completed!"
          })
        }
      })
    }else{
      res
      .status(404)
      .json({
        
        message:"For Booking user not Found!"
      });
    }
 });
  }catch(error){
 res
 .status(500)
 .json(error)
  }
 }
//for parallel query we are using async
  async function findOneHotelOneUser(hotelId,userId){
      if(!hotelId){
        throw new Error("Hotel Id Not Found");
      }
if(!userId){
          throw new Error("User Id Not Found");
        }
    var hotel = await Hotel.findById(hotelId);
    var user = await User.findById(userId);

    return {
  hotel:hotel,
  user:user
};
}






// //adding new reviews with help of find and update menthod
// module.exports.addHotelReviews = (req,res,next) =>{
//   var hotelId = req.params.hotelId;
//   console.log(hotelId);
//   getReviews(hotelId).then((reviews)=>{
//     var newR = reviews.reviews.push(req.body);
//    var newReview = {$set:{'reviews':reviews.reviews}}
// //  if(hotelId){
//     //if we want to change only name of review.nested document
//     //"review.0.name":"req.body.name"
// //    var newReview = {$set:{'reviews':[req.body]}}
//     Hotel.findByIdAndUpdate(hotelId,newReview,function(err,doc){
//       if(err){
//         res.status(500).json({message:"Reviews Not Added"})
//       }
//       res.status(200)
//       .json(doc);
//     })
// })
//   //}

// }
// }  //for parallel query we are using async
//   async function getReviews(hotelId){
//       if(!hotelId){
//         throw new Error("Hotel Id Not Found");
//       }
//     var reviewobj = await Hotel.findById(hotelId).select("reviews");
//     return reviewobj;
//   }

