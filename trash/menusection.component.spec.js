describe('menuSectionComponent', function() {
  var $compile, $rootScope, element;

  beforeEach(module('StateMenu'));
  beforeEach(inject(function(_$compile_, _$rootScope_){
    $compile = _$compile_;
    $rootScope = _$rootScope_;
  }));
  beforeEach(function() {
    element = $compile("<menu-section items='{title:\"Title\",items:[{id:1}]}'></menu-section>")($rootScope);
  });

  it('displays title', function() {
    expect(element.html()).toContain('<h4 class="ng-binding">{{$ctrl.title}}</h4>');
  });
  it('displays item', function() {
    console.log(element.html())
  });
})
