(function() {
  'use strict';

  angular.module('public')
  .controller('myInfoController', ['SignUpStorage', 'ApiPath', function(SignUpStorage, ApiPath) {
    var myInformationCtrl = this;

    myInformationCtrl.userInfo = SignUpStorage.getObject('Sign-up-Users', false);

    if (myInformationCtrl.userInfo) {
      if (myInformationCtrl.userInfo.food) {
        myInformationCtrl.imageUrl = ApiPath + '/images/' + myInformationCtrl.userInfo.food.short_name + '.jpg'
      }
    }


    myInformationCtrl.deleteUser = function() {
      SignUpStorage.removeRecord('Sign-up-Users');
      myInformationCtrl.message = 'Not Signed Up Yet. Sign up Now!';
      myInformationCtrl.userInfo = '';
    };

  }]);

})();
