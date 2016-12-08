(function() {
  'use strict';

  angular.module("StateMenu")
  .component('menuItem', {
    templateUrl: "/src/menuitem.template.html",
    controller: 'MenuItemComponentController as MenuItemController',
    bindings: {
      item: '<'
    }
  })
})();
