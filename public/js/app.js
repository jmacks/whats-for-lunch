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
          access: { restricted: false }
        })
        .when('/login', {
          controller: 'loginController',
          templateUrl: '/views/login.html'
          access: { restricted: false }
        })
        .when('/logout', {
          controller: 'logoutController'
          access: { restricted: false }
        })
        .when('/register', {
          controller: 'registerController',
          templateUrl: '/views/register.html'
          access: { restricted: false }
        })
        .otherwise({ redirectTo: '/' })
  })
  //setting up frontend middleware to restrict certain routes
  .run(function($rootScope, $location, $route, authFactory){
    $rootScope.$on('$routeChangeStart',
      function(event, next, current){
        getUserStatus();
        if(next.access.restricted && !authFactory.isLoggedIn()){
          $location.path('/login');
          $route.reload();
        }
    });
  });


}());
