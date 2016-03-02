'use strict';

(function(){


  let authFactory = function($q, $timeout, $http){
    var factory = {};

    var user = null;



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

  authFactory.$inject = ['$q', '$timeout', '$http'];

  angular.module('lunchApp').factory('authFactory', authFactory);

}());
