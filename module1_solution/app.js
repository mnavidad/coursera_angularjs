(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope', '$filter'];
function LunchCheckController($scope, $filter) {
  $scope.food = "";
  $scope.msg ="";
  $scope.customStyle = {};


  $scope.separateFood = function () {

    $scope.msg = splitString($scope.food,",");
    var foodItems =  $filter('filter');
    $scope.food = foodItems($scope.food);



    if($scope.msg=== 'Enjoy!' | $scope.msg=== 'Too much!'  ){
      $scope.customStyle.style = {"color":"green"};
    }
    else {
      $scope.customStyle.style = {"color":"red"};
    }
  };

  function splitString(stringToSplit, separator) {
        var arrayOfStrings = stringToSplit.split(separator);
        var message;
         console.log('The original string is: "' + stringToSplit + '"');
         console.log('The separator is: "' + separator + '"');
         console.log('The array has ' + arrayOfStrings.length + ' elements: ' + arrayOfStrings.join(' / '));
         if(stringToSplit===""){
             message= "Please enter data first"
             return message;
          }

         if(arrayOfStrings.length<=3){
           message = "Enjoy!";
           return message;

          }

          if(arrayOfStrings.length>3){
              message= "Too much!"
              return message;

           }

       }
}

})();
