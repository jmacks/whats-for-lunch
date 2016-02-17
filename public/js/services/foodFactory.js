'use strict';
(function(){



  let foodFactory = function($http){
    var factory = {};

    factory.getYelpAPI = function(){
      return $http.get('/food');
    };

    factory.getFoodByZip = function(zipcode){
      return $http.get('/food/' + zipcode);
    }


    return factory;
  }

  foodFactory.$inject = ['$http'];

  angular.module('lunchApp').factory('foodFactory', foodFactory);


}());
