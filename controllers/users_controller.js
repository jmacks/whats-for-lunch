'use strict';

let Account = require('../models/account.js');


var getUser = function(req, res){
  var currentUser = req.user;
  res.json(currentUser);
};

var updateUser = function(req, res){

};

var deleteUser = function(req, res){

};


module.exports = {
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}
