describe('StateService', function() {
  var stateService;

  beforeEach(function() {
    module('StateMenu');
    inject(function ($injector) {
      stateService = $injector.get('StateService');
    })
  });

  describe('tabNames', function() {
    it('returns a list of six strings', function() {
      var states = stateService.tabNames();
      expect(states.length).toBe(6);
      expect(typeof states[0]).toBe('string');
    });
  });

  describe('default()', function() {
    it('is set', function() {
      expect(stateService.default()).toBeDefined();
    });
    it('sets the deleted tab', function() {
      expect(stateService.default().tab).toBe(5);
    });
  })

  describe('tabStates(tab)', function() {
    it('returns empty list as default', function() {
      expect(stateService.tabStates()).toEqual([]);
      expect(stateService.tabStates(null)).toEqual([]);
      expect(stateService.tabStates(-1)).toEqual([]);
    });
    it('returns correct list', function() {
      expect(stateService.tabStates(0)).toEqual([0]);
      expect(stateService.tabStates(1)).toEqual([1,2,3]);
      expect(stateService.tabStates(2)).toEqual([4,10,20]);
      expect(stateService.tabStates(3)).toEqual([5]);
      expect(stateService.tabStates(4)).toEqual([8]);
      expect(stateService.tabStates(5)).toEqual([6]);
    });
  })

  describe('getTab', function() {
    var defaultTab;
    beforeAll(function() {
      defaultTab = stateService.default().tab;
    });
    it('returns correct state', function() {
      expect(stateService.getTab({status:0})).toBe(0);
      expect(stateService.getTab({status:1})).toBe(1);
      expect(stateService.getTab({status:2})).toBe(1);
      expect(stateService.getTab({status:3})).toBe(1);
      expect(stateService.getTab({status:4})).toBe(2);
      expect(stateService.getTab({status:10})).toBe(2);
      expect(stateService.getTab({status:20})).toBe(2);
      expect(stateService.getTab({status:5})).toBe(3);
      expect(stateService.getTab({status:8})).toBe(4);
      expect(stateService.getTab({status:6})).toBe(5);
    });
    it('returns default tab for empty parameter', function() {
      expect(stateService.getTab()).toBe(defaultTab);
    });
    it('returns default tab for wrong values', function() {
      expect(stateService.getTab(-1)).toBe(defaultTab);
      expect(stateService.getTab(9)).toBe(defaultTab);
    });
  });

  describe('tabByName(stateName)', function() {
    it('returns correct tab', function() {
      var names = stateService.tabNames();
      names.forEach(function(name, index) {
        var tab = stateService.tabByName(name);
        expect(tab).toBe(index);
      });
    });
    it('returns default tab when unknown', function() {
      var defaultTab = stateService.default().tab;
      expect(stateService.tabByName()).toBe(defaultTab);
      expect(stateService.tabByName({status:33})).toBe(defaultTab);
    });
  });

})
