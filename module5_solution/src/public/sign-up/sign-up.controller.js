(function () {
"use strict";

angular.module('public')
.controller('signUpController',
 ['$scope', 'MenuService', 'SignUpStorage', function($scope, MenuService, SignUpStorage) {

  var signupCtrl = this;
  signupCtrl.noItem = false;
  signupCtrl.formSuccess = false;

  signupCtrl.submit = function () {
    if (signupCtrl.user.food) {
      signupCtrl.user.food = signupCtrl.user.food.toUpperCase();
      var item = MenuService.getMenuItemByShortName(signupCtrl.user.food)
      .then(
        function (response) {
          signupCtrl.user.food = response.data;
          storeUser();
        },
        function (failure) {
          signupCtrl.noItem = true;
          signupCtrl.httpError = failure.data.error;
        }
      );
    } else {
      storeUser();
    }
  };

    function storeUser() {
      signupCtrl.noItem = false;
      signupCtrl.formSuccess = true;

      SignUpStorage.storeObject('Sign-up-Users', signupCtrl.user)
      signupCtrl.user = {
        firstname: '',
        lastname: '',
        email: '',
        phone: '',
        food: ''
      };
      $scope.regForm.$setUntouched();
      $scope.regForm.$setPristine();
    }

}]);

})();
