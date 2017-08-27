(function () {
  "use strict";

  angular.module("MenuApp")
    .component("categories", {
      templateUrl: "src/components/categories/templates/categories.html",
      bindings: {
        categories: "<"
      }
    });

})();
