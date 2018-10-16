const express = require('express');
const router = express.Router();
const hotelLogic = require('../controller/hotel.controller');
const userLogic = require('../controller/users.controller');
const authLogic= require('../controller/auth.controller');


router
.route('/bookhotel/:hotelId/:userId')
.put(authLogic.tokenValidator,hotelLogic.bookHotel);

//routes to check all hotels data
router.route('/hotels')  
.get(hotelLogic.getAllHotels);

// router.route('/hotels')  
// .get(authLogic.authenticator.hotelLogic.getHotelsData);

router
.route('/hotel/:hotelId')
.get(hotelLogic.getOneHotel)
.delete(hotelLogic.deleteReview)
.put(hotelLogic.updateOneHotel)



//route to add new hotel into db
router
.route('/hotel/new')
.post(hotelLogic.addOneHotel);

// route to get all reviews
router
.route('/hotel/:hotelId/reviews')
.get(hotelLogic.allReviewsForHotel)


router
.route('/hotel/:hotelId/reviews/:reviewId')
.get(hotelLogic.OneReviewForHotel)





module.exports = router;