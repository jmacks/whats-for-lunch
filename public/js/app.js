'use strict';
//instantiate the apps main angular module and inject the angular routes module
const lunchApp = angular.module('lunchApp', ['ngRoute']);

//setting up the frontend routes
(function(){


  angular.module('lunchApp')

      .config(function($routeProvider){
      $routeProvider
        .when('/', {
          controller: 'welcomeController',
          templateUrl: '/views/welcome.html',
          access: { restricted: false }
        })
        .when('/login', {
          controller: 'loginController',
          templateUrl: '/views/login.html',
          access: { restricted: false }
        })
        .when('/logout', {
          controller: 'loginController',
          access: { restricted: false }
        })
        .when('/register', {
          controller: 'registerController',
          templateUrl: '/views/register.html',
          access: { restricted: false }
        })
        .otherwise({ redirectTo: '/' })
  })


}());

//block routes if restricted
lunchApp.run(function($rootScope, $location, $route, authFactory){
  $rootScope.$on('$routeChangeStart',
    function(event, next, current){
      authFactory.getUserStatus().success(function (result) {
        authFactory.setLoggedIn(result.status);
        if(next.access.restricted && !result.status){
          $location.path('/login');
          $route.reload();
        }
      });
  });
});
