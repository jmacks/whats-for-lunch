'use strict';

(function(){

  var welcomeController = function($scope, $log, foodFactory){

      function foodInit(){
        console.log('food initialized with zip: ' + $scope.zipcode)
        foodFactory.getFoodByZip($scope.zipcode)
                  .success(function(food){
                    $scope.name = food.businesses[0].name;

                  }).error(function(data, status){
                    $log.log('zip food error');
                  })

      };

      $scope.foodInit = foodInit;


};

welcomeController.$inject = ['$scope', '$log', 'foodFactory'];

angular.module('lunchApp').controller('welcomeController', welcomeController);


}());
