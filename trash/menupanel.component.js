(function() {
  'use strict';

  angular.module("StateMenu")
  .component("menuPanel", {
template: "<h3>{{MenuPanelController.tab}}</h3><div class=panel><menu-section ng-repeat='section in MenuPanelController.sections' title='{{section.title}}' items='section.items'></menu-section></div>",
    controller: "MenuPanelComponentController as MenuPanelController",
    bindings: {
      tab:'@'
    }
  });
})();
