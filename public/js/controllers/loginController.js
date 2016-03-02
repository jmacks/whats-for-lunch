'use strict';

(function(){

  var loginController = function($scope, $location, authFactory){

    $scope.loggedIn = authFactory.isLoggedIn;

    $scope.login = function(){
      $scope.error = false;
      $scope.disabled = true;
      console.log($scope.loggedIn());

      authFactory.login($scope.loginForm.username, $scope.loginForm.password)
              .then(function(){
                console.log($scope.loggedIn());
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
        console.log($scope.loggedIn());
        authFactory.logout()
            .then(function(){
              console.log($scope.loggedIn());
              $location.path('/');
            });
      };
  };

  loginController.$inject = ['$scope', '$location', 'authFactory'];

  angular.module('lunchApp').controller('loginController', loginController);

}());
