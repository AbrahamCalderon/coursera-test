(function () {
   
    "use strict";
    
    angular.module("ShoppingListCheckOffApp", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .provider("ShoppingListCheckOffService", ShoppingListServiceProvider);
    
    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var itemBuyer = this;
        itemBuyer.items = ShoppingListCheckOffService.getItems();    
        itemBuyer.buyItem = function(itemIndex){
            ShoppingListCheckOffService.buyItem(itemIndex);
        };
    }
    
    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService){
        var showList = this;
        showList.boughtItems = ShoppingListCheckOffService.getBoughtItems();
    }
    
    //define shopping list service
    function ShoppingListCheckOffService(shoppingItems){
        var service = this; 
        var itemsToBuy = shoppingItems;
        var boughtItems = [];
        
        service.buyItem = function (itemIndex){
            
            //1. Add the item to the already-bought list
            var boughtItem = itemsToBuy[itemIndex];
            boughtItems.push(boughtItem);
            
            //2. Remove item from the to-buy list
            itemsToBuy.splice(itemIndex, 1);
        };
        
        //Retrieves the To-Buy items
        service.getItems = function(){
            return itemsToBuy;
        };
        
        //Retrieves the Already-Bought items
        service.getBoughtItems = function(){
            return boughtItems;
        }
    }
    
    function ShoppingListServiceProvider(){
        var provider = this;
        //initialize the shopping list
        provider.defaults = {
            "shoppingItems" : [
            { name: "apples", quantity: 5 },
            { name: "milk", quantity: 1 },
            { name: "chips", quantity: 3 },
            { name: "pizza", quantity: 4 },
            { name: "cookies", quantity: 6 }
        ]};
        
        provider.$get = function(){
            var shoppingList = new ShoppingListCheckOffService(provider.defaults.shoppingItems);
            return shoppingList;
        }   
    }
})();