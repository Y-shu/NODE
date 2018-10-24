// //creating schema for hotel.json
// const mongoose = require('mongoose');
// var hotelSchema = mongoose.Schema({
//     name:String,
//     description:String,
//     stars:Number,
//     photos:[String],
//     currancy:String,
//     rooms:[{
//         type:String,
//         number:Number,
//         description:String,
//         //if we keep on writting nested schema it can be bulky so we write it seperately at the top....
//         photos:[String],
//         price:Number
//     }]
// })
// ---------------------------------------------------------------------------------------
//creating schema for hotel.json
const mongoose = require('mongoose');
var roomsSchema = mongoose.Schema({

        type:String,
        number:Number,
        description:String,
        //if we keep on writting nested schema it can be bulky so we write it seperately at the top....
        photos:[String],
        price:Number

})
var locationSchema =  mongoose.Schema({
    address:String,
    coordinates:[Number]
})
var reviewsSchema = mongoose.Schema({
    name:String,
    id:String,
    review:String,
    rating:String
})
var hotelSchema = mongoose.Schema({
    name:String,
    description:String,
    stars:Number,
    photos:[String],
    currancy:String,
    rooms:[roomsSchema],
    location:locationSchema,
    services:[String],
    reviews:[reviewsSchema]
 
})
//creating model object 
module.exports=mongoose.model('Hotel',hotelSchema,'hotel');
//model object internally search for mongoose connection...