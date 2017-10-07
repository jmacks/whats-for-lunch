'use strict';
/*
  This file serves as the entry-point for the application
  It sets up the server and database connections and includes necessary middleware
* */
const express = require('express'); //makes server creation and configuration a bit less verbose
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan'); //logs better errors
const bodyParser =require('body-parser'); //parses the body of the server responses
const mongoose = require('mongoose'); //makes interaction with the mongo db alot easier
const methodOverride = require('method-override');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
// instantiate express object so we can use its methods
const app = express();
// API routes
const routes = require('./config/routes.js');


//connect to the Mongo db using Mongoose
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/lunch', function(err){
  if(err){
    console.log('LUNCH Database ERROR');
  } else{
    console.log('LUNCH DB connection SUCCESS');
  }
});

// config the middleware
app.use(morgan('dev'));
// use body parser to see the body of responses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { 'extended': false } ));
app.use(cookieParser());
app.use(require('express-session')({
    secret: 'dont eat that turkey sandwich please',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
// grab all static files from the public folder
app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
app.use(methodOverride());
app.use(routes);

//set up passport, it is an npm package that makes it easy to
//setup authentication compatible with Express
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// setting up the server connection
app.listen(process.env.PORT || 1818, function(err){
  if(err){
    console.log(err);
  } else{
    console.log('SERVER CONNECTION @ localhost:1818');
  }
});
