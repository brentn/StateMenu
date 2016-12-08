(function() {
  'use strict';

  angular.module('StateMenu')
  .component('stateMenu', {
      templateUrl: "/src/statemenu.template.html",
      controller: "StateMenuComponentController as MenuController"
  });

})();
