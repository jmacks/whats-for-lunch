'use strict';
//instantiate the apps main angular module
angular.module('lunchApp', ['ngRoute']);

//setting up the frontend routes
(function(){

  angular.module('lunchApp')

      .config(function($routeProvider){
      $routeProvider
        .when('/', {
          controller: 'welcomeController',
          templateUrl: '/views/welcome.html'
        })
        .when('/yelp', {
          controller: 'yelpController',
          templateUrl: '/views/yelp.html'
        })
        .when('/restaurants', {
          controller:'restaurantsController',
          templateUrl: '/views/restaurants.html'
        })
        .otherwise({ redirectTo: '/' })
  })
}());
