'use strict';
/*
* Uses authFactory to handle user login and logout
* */
(function(){

  var loginController = function($scope, $location, authFactory){

    $scope.loggedIn = authFactory.isLoggedIn;

    $scope.login = function(){
      $scope.error = false;
      $scope.disabled = true;

      authFactory.login($scope.loginForm.username, $scope.loginForm.password)
              .then(function(){
                $location.path('/');
                $scope.disabled = false;
                $scope.loginForm = {};
              })
              .catch(function(){
                $scope.error = true;
                $scope.errorMessage = "invalid username or password";
                $scope.disabled = false;
                $scope.loginForm = {};
              });
    };

      $scope.logout = function(){
        authFactory.logout()
            .then(function(){
              $location.path('/');
              authFactory.currentUserInit();
            });
      };
  };

  loginController.$inject = ['$scope', '$location', 'authFactory'];

  angular.module('lunchApp').controller('loginController', loginController);

}());
