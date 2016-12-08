(function() {
  'use strict';

  angular.module('StateMenu')
  .controller('MenuPanelComponentController', MenuPanelComponentController);

  MenuPanelComponentController.$inject = ['$scope','ItemService', 'StateService', 'UserService'];
  function MenuPanelComponentController($scope, ItemService, StateService, UserService) {
    var menuPanel = this;
    var tab, tabStates, userId, accounts;
    var myItems = [];

    menuPanel.sections = [{title:'My Items', items:myItems}];

    menuPanel.$onInit = function() {
      tab = StateService.tabByName(menuPanel.tab);
      tabStates = StateService.tabStates(tab);
      userId = UserService.currentUserId;
      ItemService.getAllItems()
      .then(function(response) {
        menuPanel.sections.unshift({title:'All Items', items:response.filter(function(item) {return tabStates.indexOf(item.Status)>=0;})});
      })
      ItemService.getMyItems(userId)
      .then(function(response) {
        myItems = response.filter(function(item) {return tabStates.indexOf(item.Status)>=0;});
      });
    };

    menuPanel.$postLink = function() {
      $scope.$emit('menuPanel.loaded')
    }

  }
})();
