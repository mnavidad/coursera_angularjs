(function () {
"use strict";

angular.module('public')
.controller('signUpController',
 ['$scope', 'MenuService', 'SignUpStorage', function($scope, MenuService, SignUpStorage) {

  var signUpController = this;
  signUpController.noItem = false;
  signUpController.formSuccess = false;

  signUpController.submit = function () {
    if (signUpController.user.food) {
      signUpController.user.food = signUpController.user.food.toUpperCase();
      var item = MenuService.getMenuItemByShortName(signUpController.user.food)
      .then(
        function (response) {
          signUpController.user.food = response.data;
          storeUser();
        },
        function (failure) {
          signUpController.noItem = true;
          signUpController.httpError = failure.data.error;
        }
      );
    } else {
      storeUser();
    }
  };

    function storeUser() {
      signUpController.noItem = false;
      signUpController.formSuccess = true;

      SignUpStorage.storeObject('Sign-up-Users', signUpController.user)
      signUpController.user = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        food: ''
      };
      $scope.registerForm.$setUntouched();
      $scope.registerForm.$setPristine();
    }

}]);

})();
