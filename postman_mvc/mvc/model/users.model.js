const mongoose = require('mongoose');
var hotelbookSchema=mongoose.Schema({
        hotelId:String,
        hotelName:String,
        hotelAddress:String,
        //as of now time will be taken Date.now
        bookingDate:Date,
        price:Number,
        checkIn:Date,
        checkOut:Date
})
var usersSchema = mongoose.Schema({
        name:{
                type:String,
                required:true        },
        role:{
                type:String,
                "default":"user"
        },
        phoneNumber:Number,
        description:String,
        email:{
                type:String,
                unique:true,
                required:true
        },
        gender:String,
        lastLogin:Date,
        bookhistory:[hotelbookSchema],
        //authentication purpose
        password:{
                type:String,
                required:true
        }

});
mongoose.model('User',usersSchema,'user');