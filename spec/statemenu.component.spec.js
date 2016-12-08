describe('stateMenuComponent', function() {
  var element;

  beforeEach(module("StateMenu"));
  beforeEach(inject(function($templateCache, $compile, $rootScope, $httpBackend) {
    $httpBackend.whenGET("/src/menusection.template.html").respond('');
    var directiveTemplate = null;
    var req = new XMLHttpRequest();
    req.onload = function() {
        directiveTemplate = this.responseText;
    };
    req.open("get", "/src/statemenu.template.html", false);
    req.send();
    $templateCache.put("/src/statemenu.template.html", directiveTemplate);

    element = $compile("<state-menu></state-menu>")($rootScope);
    $rootScope.$digest();
  }));

  it('adds an H3 title for each section', function() {
    expect(element.html().split("<h3").length).toBe(7);
  });
  it('adds a panel for each section', function() {
    expect(element.html().split("<div class=\"panel\"").length).toBe(7);
  });
  it('adds one or more sections to each panel', function() {
    element.html().split("<div class=\"panel\"").forEach(function(panel, index) {
      if (index>0) {
        expect(panel.split("<menu-section").length).toBeGreaterThan(1);
      }
    });
  });
});
