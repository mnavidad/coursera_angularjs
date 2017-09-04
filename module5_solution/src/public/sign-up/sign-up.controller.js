(function () {
"use strict";

angular.module('public')
.controller('signUpController',
 ['$scope', 'MenuService', 'SignUpStorage', function($scope, MenuService, SignUpStorage) {

  var signUpCtrl = this;
  signUpCtrl.noItem = false;
  signUpCtrl.formSuccess = false;

  signUpCtrl.submit = function () {
    if (signUpCtrl.user.food) {
      signUpCtrl.user.food = signUpCtrl.user.food.toUpperCase();
      var item = MenuService.getMenuItemByShortName(signUpCtrl.user.food)
      .then(
        function (response) {
          signUpCtrl.user.food = response.data;
          storeUser();
        },
        function (failure) {
          signUpCtrl.noItem = true;
          signUpCtrl.httpError = failure.data.error;
        }
      );
    } else {
      storeUser();
    }
  };

    function storeUser() {
      signUpCtrl.noItem = false;
      signUpCtrl.formSuccess = true;

      SignUpStorage.storeObject('Sign-up-Users', signUpCtrl.user)
      signUpCtrl.user = {
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
