(function() {
  'use strict';

  angular.module("StateMenu")
  .component("menuSection", {
    templateUrl: "/src/menusection.template.html",
    controller: "StateMenuComponentController",
    bindings: {
      title:'@',
      items:'<',
      tree:'<'
    }
  })
})();
