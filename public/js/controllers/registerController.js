'use strict';
/*
* Implementation of the authFactory for user registration and authentication
* */
(function(){

  var registerController = function($scope, $location, authFactory){

    $scope.register = function(){
      $scope.error = false;
      $scope.disabled = true;

      authFactory.register($scope.registerForm.username, $scope.registerForm.password)
              .then(function(){
                $location.path('/login');
                $scope.disabled = false;
                $scope.registerForm = {};
              })
              .catch(function(){
                $scope.error = true;
                $scope.errorMessage = "sign up NOT successful";
                $scope.disabled = false;
                $scope.registerForm = {};
              });
    };


  };


  registerController.$inject = ['$scope', '$location', 'authFactory'];

  angular.module('lunchApp').controller('registerController', registerController);

}());
