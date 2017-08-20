(function () {
'use strict';

angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service('MenuSearchService', MenuSearchService)
.directive('foundItems', FoundItems)
.constant('ApiBasePath', "https://davids-restaurant.herokuapp.com")
;

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      myTerm: '@term',
      myMessage: '@message',
      onRemove: '&'
    },
    controller: FoundItemsController,
    controllerAs: 'menu',
    bindToController: true
  };

  return ddo;
}

function FoundItemsController() {
  var menu = this;

  menu.items = [];
  menu.message = " Nothing found!";
}

NarrowItDownController.$inject = ['MenuSearchService'];
function NarrowItDownController (MenuSearchService) {
  var menu = this;

  menu.searchedItems = function () {
    MenuSearchService.getMatchedMenuItems(menu.searchTerm)
    .then(function (results) {
      menu.items = results.foundItems;
      menu.term = results.searchTerm;
      if (!results.foundItems.length) {
        menu.message = " Nothing found!";
      } else {
        menu.message = "";
      }
       console.log(menu);
    });
  }

  menu.removeItem = function (index) {
    menu.items.splice(index, 1);
  }
}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function (searchTerm) {
    return $http({
      method: "GET",
      url: (ApiBasePath + "/menu_items.json")
    })
    .then(function(response) {
       var all = response.data;
        var foundItems = [];
        console.log(searchTerm);
        for (var i = 0; i <all.menu_items.length; i++) {
          var item = all.menu_items[i];
          if (searchTerm != null && searchTerm !== "" && item.description.toLowerCase().indexOf(searchTerm.toLowerCase()) !== -1) {
            foundItems.push(item);
          }
        }
        return { searchTerm: searchTerm, foundItems: foundItems };
    })
    .catch(function (error) {
      console.log("Something went terribly wrong.");
      return { searchTerm: "", foundItems: [] };
    });
  }
}

})();
