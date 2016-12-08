(function() {
  'use strict';

  angular.module('StateMenu')
  .service("UserService", UserService);

  UserService.$inject = ['$q', '$http'];
  function UserService($q, $http) {
    var userService = this;

    userService.currentUserId = 3;

    userService.getAllUsers = function() {
      var deferred = $q.defer();
      $http({
        method:'GET',
        url:'/data/users.txt'
      }).then(function(response) {
        var users = response.data;
        deferred.resolve(users);
      });
      return deferred.promise;
    };

    userService.getUser = function(userId) {
      var deferred = $q.defer();
      $http({
        method:'GET',
        url:'/data/users.txt'
      }).then(function(response) {
        var users = response.data;
        var result = users.filter(function(user) {return user.id == userId;})[0]
        deferred.resolve(result);
      });
      return deferred.promise;
    };
  }

})();
