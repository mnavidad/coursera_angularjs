(function () {
  'use strict';
  // Defining the angular module
  angular.module('NarrowItDownApp', [])

  // Defining the angular controllers.
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService);
  .constant('ApiBasePath', "https://davids-restaurant.herokuapp.com/menu_items.json");


  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService) {
  var menu = this;

  var promise = NarrowItDownController.getMenuCategories();

  promise.then(function (response) {
    menu.categories = response.data;
  })
  .catch(function (error) {
    console.log("Something went terribly wrong.");
  });

  menu.logMenuItems = function (shortName) {
    var promise = NarrowItDownController.getMenuForCategory(shortName);

    promise.then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error);
    })
  };

}

MenuSearchService.$inject = ['$http', 'ApiBasePath'];
function MenuSearchService () {
  var service = this;

   service.getMenuCategories = function () {
     var response = $http({
       method: "GET",
       url: (ApiBasePath + "/categories.json")
     });

     return response;
   };
