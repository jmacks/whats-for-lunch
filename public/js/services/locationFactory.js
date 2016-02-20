'use strict';

(function(){


  let locationFactory = function(){
    var factory = {};



    factory.getLocation = function(){
      navigator.geolocation.getCurrentPosition(position);

      function position(pos){
        lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        var altitude = pos.coords.altitude;
        var accuracy = pos.coords.accuracy;
      };

    };

    return factory;
  }



  angular.module('lunchApp').factory('locationFactory', locationFactory);




}());
