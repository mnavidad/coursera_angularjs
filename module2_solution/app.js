(function () {
  'use strict';
  // Defining the angular module
  angular.module('ShoppingListCheckOff', [])

  // Defining the angular controllers.
  .controller('ToBuyController', ToBuyController)
  .controller('BoughtController', BoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

   BoughtController.$inject = ['ShoppingListCheckOffService'];
   function BoughtController (ShoppingListCheckOffService) {
     var boughtController  = this;

     boughtController.boughtItems = ShoppingListCheckOffService.getBoughtList();
     boughtController.boughtMessage = ShoppingListCheckOffService.getBoughtMessage();

   };

    ToBuyController.$inject = ['ShoppingListCheckOffService'];

     function ToBuyController (ShoppingListCheckOffService) {
       var tobuyController = this;
       tobuyController.buyMessage = "";


       tobuyController.toBuyItems = ShoppingListCheckOffService.getToBuyList();


       tobuyController.YesMove = function (index, itemName, itemQty) {
            ShoppingListCheckOffService.moveItemFromBuyToBought(index, itemName, itemQty);
            tobuyController.toBuyItems = ShoppingListCheckOffService.getToBuyList();
            tobuyController.buySize = tobuyController.toBuyItems.length;


            if (tobuyController.buySize  == 0) {
                tobuyController.buyMessage = "Everything is bought";
            };
        };
     }


  function ShoppingListCheckOffService () {
    var service = this;
    var boughtMessage = {
      message : 'Nothing bought yet'
    };


    var buyList = [
      {itemName : 'Broccoli', itemQty : '3 Bunches'},
      {itemName : 'Whole Weat Bread', itemQty : '2 Bags'},
      {itemName : 'Peanuts', itemQty : '1 Bag'},
      {itemName : 'Apples', itemQty : '1 Bag'},
      {itemName : 'Orange Juice', itemQty : '2 Cartons'},
    ];

    service.getToBuyList = function  () {
      return buyList;
    };

    service.removeItemFromBuyList = function  (index) {
      buyList.splice(index, 1);
    };

    var boughtList = [];
    service.addItemBoughtList = function  (itemName, itemQty) {
      var item = {
        itemName : itemName, itemQty : itemQty
      };
      boughtList.push(item);
      boughtMessage.message = "";
    };

    service.getBoughtList = function () {
      return boughtList;
    };

    service.getBoughtMessage = function() {
      return boughtMessage;
    }

    service.moveItemFromBuyToBought = function (index, itemName, itemQty) {

      service.removeItemFromBuyList(index);
      service.addItemBoughtList(itemName, itemQty);
    };



  }



})();
