'use strict';

/*
   UserController handles all current user activity
   updateUser method saves new favorite restaurants to user account
   deleteFavorite removes restaurants from user list of favorites
* */

const Account = require('../models/account.js');

//get current user info to use for site customization
var getUser = function(req, res){
  var currentUser = req.user;
  res.json(currentUser);
};

//used to update user info, adding favorites
var updateUser = function(req, res){
  var restaurant = req.body;
  Account.findById(req.user._id, function(err, account){
    if(err) throw err;

    account.favorites.push(restaurant);

    account.save(function(err){
      if(err) throw err;

      console.log('restaurant saved to user favorites');
      res.status(200).json(account);
    })
  });
};

var deleteFavorite = function(req, res){
  var restaurantId = req.body.id;
  Account.findById(req.user._id, function(err,account){
    if(err) throw err;

    var favorites = account.favorites;
    for(var i = 0; i < favorites.length; i++){
      if(favorites[i].id === restaurantId){
        favorites.splice(i, 1);
      }
    }

    account.save(function(err){
      if(err) throw err;

      console.log('favorite deleted!');
      res.status(200).json(account);
    })

  })
};

var deleteUser = function(req, res){
  // Account.findOneAndRemove({ _id: req.user._id }, function(err){
  //   if(err) throw err;
  //
  //   req.logout();
  //   console.log('deleted user: ' + req.user.username);
  // })
};


module.exports = {
  getUser: getUser,
  updateUser: updateUser,
  deleteUser: deleteUser,
  deleteFavorite: deleteFavorite
};
