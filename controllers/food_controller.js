'use strict';
let request = require('request');
let Yelp = require('yelp');

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
    location: '10002'
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

module.exports = {
  retrieve: retrieve,
  getByZip: getByZip
}
