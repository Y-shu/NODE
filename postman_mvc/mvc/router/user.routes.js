const express = require('express');
const router = express.Router();
const userLogic = require('../controller/users.controller')
const hotelLogic = require('../controller/hotel.controller')
const authLogic = require('../controller/auth.controller')

router
.route('/users')
.get(userLogic.getUsers);

router
.route('/user/new')
.post(userLogic.addOneUser);

router
.route('/user/showHotels/:userId')
.get(hotelLogic.showbookedHotel);

router
.route('/user/register')
.post(authLogic.registration);

router
.route('/user/login')
.post(authLogic.login);

router
.route('/user/:userId')
.get(authLogic.tokenValidator)

router
.route('/user/:userId')
.get(userLogic.getOneUser);

module.exports =router;