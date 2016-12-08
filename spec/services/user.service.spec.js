describe('UserService', function() {
  var userService;
  var $httpBackend;

  beforeEach(function() {
    module('StateMenu');
    inject(function ($injector) {
      userService = $injector.get('UserService');
      $httpBackend = $injector.get('$httpBackend');
    })
  });

  describe('getAllUsers()', function() {
    it('returns a promise', function() {
      expect(typeof userService.getAllUsers().then).toBe('function');
    });
    it('retrieves all users', function(done) {
      $httpBackend.whenGET('/data/users.txt').respond([{id:1},{id:2},{id:3}]);
      userService.getAllUsers()
      .then(function(response) {
        expect(response.length).toBe(3);
        expect(response).toContain({id:1});
        done();
      })
      $httpBackend.flush();
    });
  });
  describe('getUser(userId)', function() {
    var userId = 324;
    var user;
    beforeEach(function() {
      user={id:userId,name:'user',logon:'logon'};
    });
    it('returns a promise', function() {
      expect(typeof userService.getUser().then).toBe('function');
    });
    it('returns undefined if userId not passed', function(done) {
      $httpBackend.whenGET('/data/users.txt').respond([user, user, user]);
      userService.getUser()
      .then(function(response) {
        expect(response).toBeUndefined();
        done();
      });
      $httpBackend.flush();
    });
    it('returns undefined if userId not found', function(done) {
      $httpBackend.whenGET('/data/users.txt').respond([user, user, user]);
      userService.getUser(userId+1)
      .then(function(response) {
        expect(response).toBeUndefined();
        done();
      });
      $httpBackend.flush();
    });
    it('returns correct user', function(done) {
      $httpBackend.whenGET('/data/users.txt').respond([user, user, user]);
      userService.getUser(userId)
      .then(function(response) {
        expect(response.id).toEqual(userId);
        expect(response.name).toBe('user');
        expect(response.logon).toBe('logon');
        done();
      });
      $httpBackend.flush();
    });
    it('only returns a single user', function(done) {
      $httpBackend.whenGET('/data/users.txt').respond([user, user, user]);
      userService.getUser(userId)
      .then(function(response) {
        expect(response).toEqual(user);
        done();
      });
      $httpBackend.flush();
    });
  });
  describe('currentUserId()', function() {
    it('returns a user id', function() {
      expect(userService.currentUserId).toBeGreaterThan(-1);
    })
  });
});
