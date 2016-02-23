'use strict';
(function(){



  let foodFactory = function($http){
    var factory = {};

    factory.getYelpAPI = function(){
      return $http.get('/food');
    };

    factory.getFoodByZip = function(zipcode){
      return $http.get('/food/' + zipcode);
    };

    factory.getFoodByLocation = function(lat, lon){
      return $http.get('/food/' + lat + '/' + lon)
    };

    factory.getGoogleFood = function(lat, lon){
      return $http.get('/google/' + lat + '/' + lon)
    };

    factory.searchGoogleFood = function(term, lat, lon){
      console.log('searching google places...');
      return $http.get('/google/' + term + '/' + lat + '/' + lon)
    };


    return factory;
  }

  foodFactory.$inject = ['$http'];

  angular.module('lunchApp').factory('foodFactory', foodFactory);


}());
