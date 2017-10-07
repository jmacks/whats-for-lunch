'use strict';

/*
 Schema for the user account.

 favorites column is used to save user favorite restaurants
*/

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

var Account = new Schema({
  username: String,
  password: String,
  favorites: []
});
//will salt the password for us
Account.plugin(passportLocalMongoose);

module.exports = mongoose.model('Account', Account);
