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




module.exports = router;
