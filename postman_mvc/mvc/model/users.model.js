const mongoose = require('mongoose');
var hotelbookSchema=mongoose.Schema({
        name:String,
        hotelId:String,
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
        password:String

});
mongoose.model('User',usersSchema,'user');