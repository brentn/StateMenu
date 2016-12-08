describe('menuSectionComponent', function() {
  var $compile, $rootScope, $httppBackend, element;

  beforeEach(module("StateMenu"));
  beforeEach(inject(function(_$compile_, _$rootScope_, $injector){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = $injector.get('$httpBackend');
  }));
  beforeEach(inject(function($templateCache) {
    var directiveTemplate = null;
    var req = new XMLHttpRequest();
    $httpBackend.whenGET('/data/users.txt').respond([{id:1},{id:2},{id:3}]);
    req.onload = function() {
        directiveTemplate = this.responseText;
    };
    req.open("GET", "/src/menusection.template.html", false);
    req.send();
    $templateCache.put("/src/menusection.template.html", directiveTemplate);
  }));
  beforeEach(function() {
    element = $compile("<menu-section title='Title' items=[{},{}]></menu-section>")($rootScope);
    $rootScope.$digest();
  });

  xit('includes title',function() {
    expect(element.html()).toContain('<h4 class="ng-binding">Title</h4>');
  });
  xit('includes items', function() {
    expect(element.html()).toContain('<!-- ngRepeat: item in $ctrl.items --><li ng-repeat="item in $ctrl.items" class="ng-scope">');
    expect(element.html()).toContain('<menu-item id=""');
  });
});
