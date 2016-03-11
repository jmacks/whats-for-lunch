'use strict';
let request = require('request');
let Yelp = require('yelp');
//instantiate yelp
let yelp = new Yelp(
  {
    consumer_key: 'KIBEGGG5fcVGnHOczSX8iQ',
    consumer_secret: 'jzOnJ0XVkawqELGCW_3DraYT89I',
    token: 'T4zdV7Ek3NFVhTMkMbcHlRSSsSBgO7KS',
    token_secret: 'amICKcMpnAR5kPyv8ra6QgkCVQY'
  }
);



var retrieve = function(req, res){


  yelp.search({
    term: 'food',
    ll: '40.718566900000006,-73.985308'
  }).then(function(data){
      res.json(data);
  });


};

var getByZip = function(req, res){
  var zipcode = req.params.zipcode;

  yelp.search({
    term: 'food',
    location: zipcode
  }).then(function(data){
    res.json(data);
  });

};

var getByLocation = function(req, res){

  var lat = req.params.lat;
  var lon = req.params.lon;

  yelp.search({
    term: 'food',
    ll: lat+','+lon
  }).then(function(data){
    res.json(data);
  });

};

var getGoogleData = function(req, res){
  var latitude = req.params.lat;
  var longitude = req.params.lon;
  var url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + latitude + ',' + longitude + '&radius=500&type=restaurant&key=AIzaSyC6afskxSbDjG5bk9-f0KHEyZqsBR85ud8'

  grabAPI(url, function(body){
    res.send(body);
  });
};

var searchGooglePlaces = function(req, res){
  var searchTerm = req.params.term;
  var latitude = req.params.lat;
  var longitude = req.params.lon;
  var url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=' + searchTerm + '&location=' + latitude + ',' + longitude + '&radius=1000&key=AIzaSyC6afskxSbDjG5bk9-f0KHEyZqsBR85ud8';

  grabAPI(url, function(body){
    res.send(body);
  });
};

function grabAPI(url, callback){
  request(url, function(err, response, body){
    if(err){
      console.log('error occured: ' + err);
    } else {
    callback(body);
    }
  })
};


module.exports = {
  retrieve: retrieve,
  getByZip: getByZip,
  getByLocation: getByLocation,
  getGoogleData: getGoogleData,
  searchGooglePlaces: searchGooglePlaces
}
