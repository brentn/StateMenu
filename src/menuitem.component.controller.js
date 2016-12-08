(function() {
  'use strict';

  angular.module('StateMenu')
  .controller('MenuItemComponentController', MenuItemComponentController);

  MenuItemComponentController.$inject = ["UserService"];
  function MenuItemComponentController(UserService) {
    var Controller = this;
    var defaultImage = "/images/person.png";
    var baseImageUrl = "https://staff.powertochange.org/custom-pages/webService.php?type=staff_photo&api_token=V7qVU7n59743KNVgPdDMr3T8&staff_username=";

    Controller.profileImageUrl = defaultImage;

    Controller.$onInit = function() {
      UserService.getUser(Controller.item.UserId)
      .then(function(response) {
        if (response) {
          Controller.profileImageUrl = baseImageUrl+response.login;
        }
      })
    }
  }

})();
