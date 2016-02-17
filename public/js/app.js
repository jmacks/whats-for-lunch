'use strict';
//setting up the routes in main js file since there arent very many and im not putting much else in here
angular.module('lunchApp', ['ngRoute']);

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
        .when('/feeding', {
          controller:'',
          templateUrl: '/views/feeding.html'
        })
        .otherwise({ redirectTo: '/' })
  })
}());
