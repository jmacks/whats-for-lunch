'use strict';
/*
   This factory handles all requests made to backend routes that have to do with food data
   Includes calling the route that calls the external API as well as routes that allow registred users
   to save favorites
*/
(function(){



  var foodFactory = function($http){
    var factory = {};

    factory.getYelpAPI = function(){
      return $http.get('/food');
    };

    factory.getFoodByZip = function(zipcode){
      return $http.get('/food/' + zipcode);
    };

    factory.getFoodByLocation = function(lat, lon){
      return $http.get('/food/' + lat + '/' + lon);
    };

    factory.saveFoodToUser = function(restaurant){
      return $http.put('/user', restaurant);
    };

    factory.deleteFoodFromUser = function(restaurant){
      return $http.put('/user/favorite', restaurant);
    };

    return factory;
  }

  foodFactory.$inject = ['$http'];

  angular.module('lunchApp').factory('foodFactory', foodFactory);


}());
