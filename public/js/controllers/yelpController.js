'use strict';
(function(){

  var yelpController = function($scope, $log, foodFactory){


      navigator.geolocation.getCurrentPosition(position);

      function position(pos){
        $scope.lat = pos.coords.latitude;
        $scope.lon = pos.coords.longitude;
        $scope.altitude = pos.coords.altitude;
        $scope.accuracy = pos.coords.accuracy;

      };


    function initFood(){
        var randomNum = Math.floor(Math.random() * 19) + 1
        console.log('food has been called');
        foodFactory.getYelpAPI()
                .success(function(food){
                  $scope.rating = food.businesses[randomNum].rating;
                  $scope.name = food.businesses[randomNum].name;
                  $scope.reviewSnippet = food.businesses[randomNum].snippet_text;
                  $scope.phone = food.businesses[randomNum].phone;
                  $scope.crossStreets = food.businesses[randomNum].location.cross_streets;
                  $scope.ratingImage = food.businesses[randomNum].rating_img_url;
                  $scope.category = food.businesses[randomNum].categories[0][0];
                  $scope.address = food.businesses[randomNum].location.display_address;



                })
                .error(function(data, status){
                  $log.log('theres an error');
                })
      };
       $scope.initFood = initFood;





  }

  yelpController.$inject = ['$scope', '$log', 'foodFactory'];

  angular.module('lunchApp').controller('yelpController', yelpController);





}());
