'use strict';

(function(){

  var logoutController = function($scope, $location, authFactory){
    $scope.logout = function(){
      console.log('hit logout function')
      authFactory.logout()
          .then(function(){
            $location.path('/');
          });
    };

  };







  logoutController.$inject = ['$scope', '$location', 'authFactory'];

  angular.module('lunchApp').controller('logoutController', logoutController);

}())
