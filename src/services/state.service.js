(function() {
  'use strict';

  angular.module('StateMenu')
  .service("StateService", StateService);

  function StateService() {
    var stateService = this;
    var tabs = ['Draft', 'Submitted', 'Approved', 'Pending Payment', 'Paid', 'Deleted']
    var states = [
      {status:0,tab:0},
      {status:1,tab:1},{status:2,tab:1},{status:3,tab:1},
      {status:4,tab:2},{status:10,tab:2},{status:20,tab:2},
      {status:5,tab:3},
      {status:8,tab:4},
      {status:6,tab:5,default:true},
    ];

    stateService.tabNames = function() {
      return tabs;
    };

    stateService.default = function() {
      var defaults = states.filter(function(item) {return item.default===true});
      if (defaults.length > 0) { return defaults[0]; }
      return undefined;
    }

    stateService.tabStates = function(tab) {
      return states
        .filter(function(item) {return item.tab == tab})
        .map(function(item) {return item.status;});
    };

    stateService.getTab = function(item) {
      if (item && (item.status || item.status==0)) {
          var state = states.filter(function(s) {return item.status == s.status; });
          if (state.length > 0) { return state[0].tab; }
      }
      return stateService.default().tab;
    };

    stateService.tabByName = function(stateName) {
      var result = stateService.default().tab;
      if (stateName && (typeof stateName === 'string')) {
        tabs.forEach(function(item, index) {
          if (item.toLowerCase() == stateName.toLowerCase()) {
            result = index;
          }
        });
      }
      return result;
    };
  }
})();
