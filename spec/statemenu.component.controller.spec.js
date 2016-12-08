describe('StateMenuComponentController', function() {
  var Controller;
  var $scope;
  var fakeItemService, fakeUserService, fakeStateService;
  var fakeItemList = [{Status:0},{Status:1},{Status:2},{Status:3},{Status:4},{Status:5},{Status:6},{Status:8},{Status:10},{Status:20}];

  beforeEach(module('StateMenu'));
  beforeEach(inject(function(_$controller_, _$rootScope_, $q) {
    $scope = _$rootScope_.$new();
    var $controller = _$controller_;
    fakeItemService = {
      getMyItems: function() {return $q.when(fakeItemList); },
      getAllItems: function() {return $q.when(fakeItemList); }
    };
    fakeUserService = {
      currentUserId: 2
    };
    fakeStateService = {
      tabNames: function() {return ["a", "b", "c", "d"];},
      tabStates: function(x) {return x;}
    };

    Controller = $controller('StateMenuComponentController', {$scope:$scope, ItemService:fakeItemService, UserService:fakeUserService, StateService:fakeStateService});
  }));

  it('sets tabs', function() {
    expect(Controller.tabs).toEqual(fakeStateService.tabNames());
  });
  it('initializes sections', function() {
    expect(Controller.sections).toEqual([]);
  });

  describe('$onInit', function() {
    beforeEach(function() {
      Controller.$onInit();
    });
    it('builds correct number of sections', function() {
      expect(Controller.sections.length).toEqual(fakeStateService.tabNames().length);
    });

  });
});
