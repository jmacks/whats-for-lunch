'use strict';

let express = require('express');
let passport = require('passport');
let Account = require('../models/account.js');


var create = function(req, res){
  Account.register(new Account({username: req.body.username}), req.body.password, function(err, account){
    if(err){
      return res.status(500).json({
        err: err
      });
    }

    passport.authenticate('local')(req, res, function(){
      return res.status(200).json({
        status: 'Registration Successful!'
      });
    });
  });
};


var login = function(req, res, next){
  passport.authenticate('local', function(err, user, info){
    if(err){
      return next(err);
    }
    if(!user){
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(user, function(err){
      if(err){
        return res.status(500).json({
          err: 'could not login user'
        });
      }
      res.status(200).json({
        status: 'Login Successful!'
      });
    });
  })(req, res, next);
};


var logout = function(req, res){
  req.logout();
  res.status(200).json({
    status: 'logged out! peace!'
  });
};


module.exports = {
  create: create,
  login: login,
  logout: logout
}
