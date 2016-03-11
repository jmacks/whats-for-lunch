'use strict';

let Account = require('../models/account.js');

//get current user info to use for site customization
var getUser = function(req, res){
  var currentUser = req.user;
  res.json(currentUser);
};
//used to update user info, adding favorites
var updateUser = function(req, res){
  var restaurant = req.body;
  Account.findById(req.user._id, function(err, account){
    if(err) throw err

    account.favorites.push(restaurant)

    account.save(function(err){
      if(err) throw err

      console.log('restaurant saved to user favorites')
      res.status(200).json(account);
    })
  });

};

var deleteUser = function(req, res){

};


module.exports = {
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser
}
