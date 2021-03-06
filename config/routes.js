'use strict';
//requirements
let express = require('express');
let passport = require('passport');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let request = require('request');
// use express routing method
let router = express.Router();

let food = require('../controllers/food_controller.js');
let account = require('../controllers/account_controller.js');
let users = require('../controllers/users_controller.js');

//the user account creation, login,logout and update routes
router.route('/register')
    .post(account.create)
router.route('/login')
    .post(account.login)
router.route('/logout')
    .get(account.logout)
router.route('/user/status')
    .get(account.status)
router.route('/user')
    .get(users.getUser)
    .delete(users.deleteUser)
    .put(users.updateUser)
router.route('/user/favorite')
    .put(users.deleteFavorite)


//the yelp calling routes
router.route('/food')
    .get(food.retrieve)
router.route('/food/:zipcode')
    .get(food.getByZip)
router.route('/food/:lat/:lon')
    .get(food.getByLocation)





module.exports = router;
