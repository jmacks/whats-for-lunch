'use strict';
//requirements
let express = require('express');
let bodyParser = require('body-parser');
let methodOverride = require('method-override');
let request = require('request');
// use express routing method
let router = express.Router();

let food = require('../controllers/food_controller.js');




router.route('/food')
      .get(food.retrieve)
router.route('/food/:zipcode')
      .get(food.getByZip)
router.route('/food/:lat/:lon')
      .get(food.getByLocation)




module.exports = router;
