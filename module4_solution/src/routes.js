(function () {
  "use strict";

  angular.
    module("MenuApp").
    config(RoutesConfig);

  RoutesConfig.$inject = ["$stateProvider", "$urlRouterProvider"];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/");

    $stateProvider
      .state("home", {
        url: "/",
        templateUrl: "src/templates/home.html"
      })
      .state("categories", {
        url: "/categories",
        templateUrl: "src/components/categories/templates/menu_categories.html",
        controller: "MenuCategoriesController as menuCategories",
        resolve: {
          categories: ["MenuDataService", function (MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state("items", {
        url: "/categories/{categoryShortName}/items",
        templateUrl: "src/components/items/templates/categoryItems.html",
        controller: "CategoryItemsController as categoryItems",
        resolve: {
          items: ["MenuDataService", "$stateParams", function (MenuDataService, $stateParams) {
            return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      });
  }
})();
