'use strict';
(function(){
  var randomNum = Math.floor(Math.random() * 19) + 1
  console.log(randomNum);
  var welcomeController = function($scope, $log, foodFactory){

      function initFood(){
        foodFactory.getYelpAPI()
                .success(function(food){
                  $scope.restaurant = food.businesses[randomNum];
                  $scope.rating = food.businesses[randomNum].rating;
                  $scope.name = food.businesses[randomNum].name;
                  $scope.reviewSnippet = food.businesses[randomNum].snippet_text;
                  $scope.phone = food.businesses[randomNum].phone;
                  $scope.crossStreets = food.businesses[randomNum].location.cross_streets;

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
