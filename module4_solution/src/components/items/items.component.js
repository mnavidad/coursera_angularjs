(function () {
  "use strict";

  angular.module("MenuApp").
    component("items", {
      templateUrl: "src/components/items/templates/items.html",
      bindings: {
        items: "<"
      }
    });

})();
