'use strict';

(function(){


  let authFactory = function($q, $timeout, $http){
    var factory = {};

    var user = null;

    factory.isLoggedIn = function(){
      if(user){
        return true;
      } else {
        return false;
      }
    };

    factory.getUserStatus = function(){
      $http.get('/user/status')
        .success(function(data){
          if(data.status){
            user = true;
          } else {
            user = false;
          }
        })
        .error(function(data){
          user = false;
        });
      return user;
    };

    factory.login = function(username, password){
      var deferred = $q.defer();

      $http.post('/login', {username: username, password: password})
            .success(function(data, status){
              if(status === 200 && data.status){
                user = true;
                deferred.resolve();
              } else {
                user = false;
                deferred.reject();
              }
            })
            .error(function(data){
              user = false;
              deferred.reject();
            });
        return deferred.promise;
    };

    factory.logout = function(){
      var deferred = $q.defer();

      $http.get('/logout')
            .success(function(data){
              user = false;
              deferred.resolve();
            })
            .error(function(data){
              user = false;
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
