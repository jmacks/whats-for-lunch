'use strict';
//instantiate the apps main angular module and inject the angular routes module
var lunchApp = angular.module('lunchApp', ['ngRoute', 'ngAnimate']);

//setting up the frontend routes
(function(){


  angular.module('lunchApp')

      .config(function($routeProvider){
      $routeProvider
        .when('/home', {
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
        .when('/user', {
          controller: 'usersController',
          templateUrl: '/views/userProfileTemplate.html',
          access: { restricted: true }
        })
        .otherwise({ redirectTo: '/home' })
  })


}());

//block routes if restricted
lunchApp.run(function($rootScope, $location, $route, $animate, authFactory){
  $rootScope.$on('$routeChangeStart',
    function(event, next, current){
      authFactory.getUserStatus().success(function (result) {
        authFactory.setLoggedIn(result.status);
        if(next.access.restricted && !result.status){
          $location.path('/login');
          $route.reload();
        }
        authFactory.currentUserInit();
      });
  });
});
