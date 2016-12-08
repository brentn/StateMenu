describe('ItemService', function() {
  var itemService;
  var $timeout;

  beforeEach(function() {
    module('StateMenu');
    inject(function ($injector) {
      itemService = $injector.get('ItemService');
      $timeout = $injector.get('$timeout');
    });
  });

  describe('getAllItems()', function() {
    var i;
    it('returns a promise', function(done) {
      var result = itemService.getAllItems();
      expect(typeof result.then).toBe('function');
      result.then(function() {
        done();
      });
      $timeout.flush();
    });
    it('generates between 20 and 80 items', function(done) {
      itemService.getAllItems()
      .then(function(response) {
        expect(response.length).toBeGreaterThan(19);
        expect(response.length).toBeLessThan(81);
        done();
      });
      $timeout.flush();
    });
    it('generates unique items', function(done) {
      var seen = [];
      itemService.getAllItems()
      .then(function(response) {
        response.forEach(function(item) {
          expect(seen).not.toContain(item.Id);
          seen.push(item.id);
        });
        expect(seen.length).toEqual(response.length);
        done();
      });
      $timeout.flush();
    });
    it('numbers items sequentially starting at 1', function(done) {
      itemService.getAllItems()
      .then(function(items) {
        var search;
        for(i=1; i<=items.length; i++) {
          search = items.filter(function(item) {return item.Id == i;});
          expect(search.length).toBe(1);
        }
        done();
      });
      $timeout.flush();
    });
  });

  describe('getMyItems(userId)', function() {
    it('returns a promise', function(done) {
      var result = itemService.getMyItems();
      expect(typeof result.then).toBe('function');
      result.then(function() {
        done();
      });
      $timeout.flush();
    });
    it('provides a list of items', function(done) {
      itemService.getItem(1)
      .then(function(item) {
        itemService.getMyItems(item.UserId)
        .then(function(response) {
          expect(typeof response).toBe('object');
          expect(response.length).toBeGreaterThan(0);
          expect(response[0].Id).toBeDefined();
          expect(response[0].Status).toBeDefined();
          expect(response[0].UserId).toBeDefined();
          expect(response[0].VendorId).toBeDefined();
          done();
        });
      });
      $timeout.flush();
    });
    it('only provides MY items', function(done) {
      itemService.getItem(2)
      .then(function(firstItem) {
        itemService.getMyItems(firstItem.UserId)
        .then(function(response) {
          response.forEach(function(item) {
            expect(item.UserId).toBe(firstItem.UserId);
          });
          done();
        });
      });
      $timeout.flush();
    });
  });

  describe('getItem(itemId)', function() {
    it('returns a promise', function(done) {
      var result = itemService.getItem();
      expect(typeof result.then).toBe('function');
      result.then(function() {
        done();
      });
      $timeout.flush();
    });
    it('returns the correct item', function(done) {
      var id = Math.floor((Math.random() * 10) + 1);
      itemService.getItem(id)
      .then(function(item) {
        expect(item.Id).toBe(id);
        done();
      });
      $timeout.flush();
    });
    it('returns a single item', function(done) {
      var id = Math.floor((Math.random() * 10) + 1);
      itemService.getItem(id)
      .then(function(item) {
        expect(item[0]).not.toBeDefined();
        expect(item.Id).toBe(id);
        done();
      });
      $timeout.flush();
    });
  });
});
