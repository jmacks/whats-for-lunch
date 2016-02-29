'use strict';

let express = require('express'); //makes server creation and configuration a bit less verbose
let path = require('path');
let cookieParser = require('cookie-parser');
let morgan = require('morgan'); //logs better errors
let bodyParser =require('body-parser'); //parses the body of the server responses
let mongoose = require('mongoose'); //makes interaction with the mongo db alot easier
let methodOverride = require('method-override');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;
// instantiate express object so we can use its methods
let app = express();
// lets put the api routes elsewhere
const routes = require('./config/routes.js')
//connect to the mongo db
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
// use method override
app.use(methodOverride());
//routes
app.use(routes);

//set up passport
var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


// setting up the server connection
app.listen(process.env.PORT || 1818, function(err){
  if(err){
    console.log('not connected to the server');
  } else{
    console.log('SERVER CONNECTION HEADY @1818')
  }
});
