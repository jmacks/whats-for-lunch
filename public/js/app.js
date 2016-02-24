'use strict';
//instantiate the apps main angular module and inject the angular routes module
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
        .otherwise({ redirectTo: '/' })
  })
}());
