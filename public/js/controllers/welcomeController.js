'use strict';

(function(){

  var welcomeController = function($scope, $log, foodFactory){

    // get location
    navigator.geolocation.getCurrentPosition(position);

    function position(pos){
      $scope.lat = pos.coords.latitude;
      $scope.lon = pos.coords.longitude;
    };
    //  initialize location for display
    function locationInit(){
     foodFactory.getFoodByLocation($scope.lat, $scope.lon)
                .success(function(food){
                    if(food.businesses[0].location.display_address.length > 2){
                      $scope.location = food.businesses[0].location.display_address[1] + ', ' + food.businesses[0].location.display_address[2]
                    } else{
                      $scope.location = food.businesses[0].location.display_address[1]
                    }

                }).error(function(err, status){
                  $log.log('location unavailable')
                })
      };
      $scope.locationInit = locationInit;



      function foodInit(){
        var randomNum = Math.floor(Math.random() * 19) + 1

        if($scope.zipcode){

          foodFactory.getFoodByZip($scope.zipcode)
                    .success(function(food){
                      $scope.businesses = food.businesses;
                      console.log($scope.businesses)
                      $scope.rating = food.businesses[randomNum].rating;
                      $scope.name = food.businesses[randomNum].name;
                      $scope.reviewSnippet = food.businesses[randomNum].snippet_text;
                      $scope.phone = food.businesses[randomNum].phone;
                      $scope.crossStreets = food.businesses[randomNum].location.cross_streets;
                      $scope.ratingImage = food.businesses[randomNum].rating_img_url;
                      $scope.category = food.businesses[randomNum].categories[0];
                      $scope.address = food.businesses[randomNum].location.display_address;
                    }).error(function(data, status){
                      $log.log('zip food error');
                    });
        } else{
          foodFactory.getFoodByLocation($scope.lat, $scope.lon)
                     .success(function(food){
                       $scope.businesses = food.businesses;
                       $scope.name = food.businesses[randomNum].name;
                       $scope.reviewSnippet = food.businesses[randomNum].snippet_text;
                       $scope.phone = food.businesses[randomNum].phone;
                       $scope.ratingImage = food.businesses[randomNum].rating_img_url;
                       $scope.category = food.businesses[randomNum].categories[0];
                       $scope.address = food.businesses[randomNum].location.display_address;


                     }).error(function(data, status){
                       $log.log('food by current location error');
                     });
        }
      };

      $scope.foodInit = foodInit;






};

welcomeController.$inject = ['$scope', '$log', 'foodFactory'];

angular.module('lunchApp').controller('welcomeController', welcomeController);


}());
