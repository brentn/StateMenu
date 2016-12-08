(function() {
  'use strict';

  angular.module('StateMenu')
  .controller("StateMenuComponentController", StateMenuComponentController);

  StateMenuComponentController.$inject = ["$scope", "$filter", "StateService", "ItemService", "UserService"];
  function StateMenuComponentController($scope, $filter, StateService, ItemService, UserService) {
    var MenuController=this;

    MenuController.tabs = StateService.tabNames();
    MenuController.sections = [];

    function getSections(tab) {
      var result = [];
      var userId = UserService.currentUserId;
      var tabStates = StateService.tabStates(tab);
      ItemService.getMyItems(userId)
      .then(function(response) {
        var myItems = response.filter(function(item) {return tabStates.indexOf(item.Status)>=0});
        result.push({title:'My Items', items:myItems});
      });
      ItemService.getAllItems()
      .then(function(response) {
        var allItems = buildTree(response.filter(function(item) {return tabStates.indexOf(item.Status)>=0}));
        result.unshift({title:'+ All Items', items:allItems});
      });
      return result;
    }

    MenuController.$onInit = function() {
      for (var i=0; i<MenuController.tabs.length; i++) {
          MenuController.sections.push(getSections(i));
      }
    }

    MenuController.panelLoaded = function() {
      $('state-menu').accordion({
        header: "menu-panel>h3,menu-search-panel>h3",
        navigate: false,
        heightStyle: 'fill'
      });
    };

    MenuController.collapse = function() {
      $('.collapsable').slideUp();
    }

    MenuController.expand = function(evt) {
      evt.stopPropagation();
      $(evt.currentTarget).next().children('.collapsable').slideToggle(200);
    }

    function buildTree(items) {
      var result = [];
      var sortedItems = $filter('orderBy')(items, 'VendorId');
      for (var i in  sortedItems) {
        var item = sortedItems[i];
        var vendor = item.VendorId||'_NO VENDOR_';
        var letter = vendor[0].toUpperCase();
        var letterNode = result.filter(function(node) {return node.title==letter});
        if (letterNode.length===0) {
          letterNode = {title:letter, items:[]};
          result.push(letterNode);
        } else {
          letterNode=letterNode[0];
        }
        var vendorNode = letterNode.items.filter(function(node) {return node.title==vendor});
        if (vendorNode.length===0) {
          vendorNode = {title:vendor, items:[]}
          letterNode.items.push(vendorNode);
        } else {
          vendorNode=vendorNode[0];
        }
        vendorNode.items.push(item);
      }
      return result;
    }
  }
})();
