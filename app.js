'use strict';

let express = require('express'); //makes server creation and configuration a bit less verbose
let mongoose = require('mongoose'); //makes interaction with the mongo db alot easier
let morgan = require('morgan'); //logs better errors
let bodyParser =require('body-parser'); //parses the body of the server responses
let methodOverride = require('method-override');
// instantiate express object so we can use its methods
let app = express();
// lets put the api routes elsewhere
const routes = require('./config/routes.js')
//connect to the mongo db
mongoose.connect('mongodb://localhost/lunch', function(err){
  if(err){
    console.log('LUNCH Database ERROR');
  } else{
    console.log('LUNCH DB connection SUCCESS');
  }
});
// config the middleware
// use body parser to see the body of responses
app.use(bodyParser.urlencoded( { 'extended': 'true' } ));
app.use(bodyParser.json());
// grab all static files from the public folder
app.use('/', express.static(__dirname + '/public'));
app.use('/scripts', express.static(__dirname + '/node_modules'));
// make some better errors
app.use(morgan('dev'));

// use method override
app.use(methodOverride());
//routes
app.use(routes);


// setting up the server connection
app.listen(1818, function(err){
  if(err){
    console.log('not connected to the server');
  } else{
    console.log('SERVER CONNECTION HEADY @1818')
  }
});
