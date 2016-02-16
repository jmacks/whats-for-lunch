'use strict';
(function(){

  var welcomeController = function($scope, $log, foodFactory){
      function initFood(){
        foodFactory.getYelpAPI()
                .success(function(food){
                  $scope.food = angular.fromJson(food.businesses[0]);
                  $scope.rating = angular.fromJson(food.businesses[0].rating);

                  console.log($scope.rating);
                })
                .error(function(data, status){
                  $log.log('theres an error');
                })
      };
      initFood();


  }

  welcomeController.$inject = ['$scope', '$log', 'foodFactory'];

  angular.module('lunchApp').controller('welcomeController', welcomeController);





}());
