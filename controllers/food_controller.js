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
  var url = "http://jsonplaceholder.typicode.com/posts";

  function foodAPI(url, callback){
    request(url, function(err, response, body){
      if(err){
        throw err;
      } else{
        callback(body);
      }
    })
  };

  var position = navigator.geolocation.getCurrentPosition();
  console.log(position);

  foodAPI(url, function(body){

    res.json(JSON.parse(body));
  });

  // yelp.search({
  //   term: 'food',
  //   cll: '37.77493,-122.419415'
  // }).then(function(data){
  //   res.json(data);
  // });


}

module.exports = {
  retrieve: retrieve
}
