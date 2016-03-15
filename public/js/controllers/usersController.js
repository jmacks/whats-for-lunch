'use strict';

(function(){

  var usersController = function($scope, $http, $location, $route, authFactory, foodFactory){

    // $scope.deleteUser = function(){
    //      return $http.delete('/user').then(function(){
    //             authFactory.logout();
    //             $location.path('/');
    //             authFactory.currentUserInit();
    //           });
    //       }

    function deleteFavorite(restaurant) {
      console.log('delete fav clicked!')
      return foodFactory.deleteFoodFromUser(restaurant).then(function(){
        var toastContent = restaurant.name;
        Materialize.toast(toastContent + ' deleted', 3000);
        $route.reload();
      })
    };

    $scope.deleteFavorite = deleteFavorite;

  };

  // usersController.$inject = ['$scope', $http', '$log'];

  angular.module('lunchApp').controller('usersController', usersController);

}());
