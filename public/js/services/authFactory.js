'use strict';

(function(){


  var authFactory = function($rootScope, $q, $timeout, $http){
    var self = this;
    var factory = {};

    var user = null;

    factory.currentUserInit = function(){
      return $http.get('/user')
        .then(function(res) {
          $rootScope.currentUsername = res.data.username
          $rootScope.currentUserId = res.data._id;
          $rootScope.currentUserFavorites = res.data.favorites;
          $rootScope.greeting = res.data ? 'Welcome Back ' + $rootScope.currentUsername + ', Let\'s Eat' : 'Welcome! Sign Up to Save Your Faves'
        })
    }


    factory.getUserStatus = function(){
      return $http.get('/user/status');
    };

    factory.setLoggedIn = function (loggedInStatus) {
     user = !!loggedInStatus;
     return user;
    },

    factory.isLoggedIn = function() {
      return angular.isUndefined(user) || user === null ? factory.setLoggedIn(factory.getUserStatus()) : user;
    };

    factory.login = function(username, password){
      var deferred = $q.defer();

      $http.post('/login', {username: username, password: password})
            .success(function(data, status){
              if(status === 200 && data.status){
                factory.setLoggedIn(true);
                deferred.resolve();
              } else {
                factory.setLoggedIn(false);
                deferred.reject();
              }
            })
            .error(function(data){
              factory.setLoggedIn(false);
              deferred.reject();
            });
        return deferred.promise;
    };

    factory.logout = function(){
      var deferred = $q.defer();

      $http.get('/logout')
            .success(function(data){
              factory.setLoggedIn(false);
              deferred.resolve();
            })
            .error(function(data){
              factory.setLoggedIn(false);
              deferred.reject();
            });
        return deferred.promise;
    };

    factory.register = function(username, password){
      var deferred = $q.defer();

      $http.post('/register', {username: username, password: password})
            .success(function(data, status){
              if(status === 200 && data.status){
                deferred.resolve();
              } else{
                deferred.reject();
              }
            })
            .error(function(data){
              deferred.reject();
            });
        return deferred.promise;
    }


    return factory;
  }

  authFactory.$inject = ['$rootScope', '$q', '$timeout', '$http'];

  angular.module('lunchApp').factory('authFactory', authFactory);

}());
