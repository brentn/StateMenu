(function() {
  'use strict';

  angular.module('StateMenu')
  .service("ItemService", ItemService);

  ItemService.$inject = ['$q', '$timeout'];
  function ItemService($q, $timeout) {
    var itemService = this;
    var VALID_STATUSES = [0,1,2,3,4,5,6,8,10,20];
    var VENDORS = ['GRATOY', 'AMBMOD', 'DARTOM', '123JNK', 'NESBRE', 'BRIJAS', "BAHREN", "DISMAO"];
    var allItems = [];

    itemService.getAllItems = function() {
      var deferred = $q.defer();
      var delay = Math.floor((Math.random() * 800) + 300);
      $timeout(function () {
          deferred.resolve(allItems);
      }, delay);

      return deferred.promise;
    };

    itemService.getMyItems = function(userId) {
      var deferred = $q.defer();
      deferred.resolve(allItems.filter(function(item) {return item.UserId == userId;}));
      return deferred.promise;
    };

    itemService.getItem = function(itemId) {
      var deferred = $q.defer();
      var delay = Math.floor((Math.random() * 400) + 100);
      $timeout(function() {
        deferred.resolve(allItems.filter(function(item) {return item.Id == itemId;})[0])
      }, delay);
      return deferred.promise;
    };

    function generateItems(num) {
      for(var i=1; i<=num; i++) {
        var userId = Math.floor(Math.random() * 10);
        allItems.push({
          Id:i,
          Status:VALID_STATUSES[Math.floor((Math.random() * 10))],
          UserId:userId,
          ApprUserId:(Math.floor(Math.random() * 9 + (userId+1)) % 10) || 10,
          TotalAmount:Math.random()*1000,
          VendorId:VENDORS[Math.floor((Math.random() * VENDORS.length))]
        })
      }
    }

    var numberOfItems = Math.floor((Math.random() * 60) + 20);
    generateItems(numberOfItems);
  }
})();
