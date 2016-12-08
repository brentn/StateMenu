(function() {
  'use strict';

  angular.module("StateMenu")
  .directive( 'onLoaded', function( $parse ) {
     return {
         restrict: 'A',
         link: function( $scope, elem, attrs ) {
            elem.ready(function(){
              $scope.$apply(function(){
                  var func = $parse(attrs.onLoaded);
                  func($scope);
              });
            });
         }
      }
  });
})();
