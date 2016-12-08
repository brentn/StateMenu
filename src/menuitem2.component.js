(function() {
  'use strict';

  angular.module("StateMenu")
  .component('menuItem2', {
    templateUrl: "/src/menuitem2.template.html",
    controller: 'MenuItemComponentController as MenuItemController',
    bindings: {
      item: '<'
    }
  })
})();
