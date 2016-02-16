//setting up the routes in main js file since there arent very many and im not putting much else in here

(function(){

  var lunchApp = angular.module('lunchApp', ['ngRoute']);

  lunchApp.config(function($routeProvider){
      $routeProvider
        .when('/', {
          controller: '',
          templateUrl: '/views/index.html'
        })
        .when('/feeding', {
          controller:'',
          templateUrl: '/views/feeding.html'
        })
        .otherwise({ redirectTo: '/' })
  })
}());
