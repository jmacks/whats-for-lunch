'use strict';

(function(){

  var welcomeController = function($scope, $log, foodFactory, loggedIn, $rootScope){

      // get location
      navigator.geolocation.getCurrentPosition(position);
      function position(pos){
        $scope.lat = pos.coords.latitude;
        $scope.lon = pos.coords.longitude;
      };

    $scope.loggedIn = loggedIn;

    //  initialize location for display using yelp to convert long/lat into city name
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
      // put location initializer into the angular scope and call it
      $scope.locationInit = locationInit;
      $scope.locationInit();


      // function to get food from backend route that calls yelps api (http reqs are in food factory)
      function foodInit(){
        //if user enters zip or city, use that to find food
        if($scope.zipcode){

          foodFactory.getFoodByZip($scope.zipcode)
                    .success(function(food){
                      $scope.businesses = food.businesses;
                    }).error(function(data, status){
                      $log.log('zip food error');
                    });
          //if no location info manually entered, use browser current location
        } else{
          foodFactory.getFoodByLocation($scope.lat, $scope.lon)
                     .success(function(food){
                       $scope.businesses = food.businesses;
                       if(food.businesses[0].location.display_address.length > 2){
                         $scope.location = food.businesses[0].location.display_address[1] + ', ' + food.businesses[0].location.display_address[2]
                       } else{
                         $scope.location = food.businesses[0].location.display_address[1]
                       }
                     }).error(function(data, status){
                       $log.log('food by current location error');
                     });
        }
      };
      // put the previous function in the angular scope
      $scope.foodInit = foodInit;
      $scope.foodInit();

    function saveFavorite(restaurant){
      return foodFactory.saveFoodToUser(restaurant).then(function () {
        var toastContent = restaurant.name;
        Materialize.toast(toastContent + ' added to faves', 3000, 'rounded');
      });
    };

    $scope.saveFavorite = saveFavorite;

};
//inject dependencies this way to avoid errors when minified
welcomeController.$inject = ['$scope', '$log', 'foodFactory', 'authFactory', '$rootScope'];
//add the welcome controller to the lunchApp angular module
angular.module('lunchApp').controller('welcomeController', welcomeController);


}());
