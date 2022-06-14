(function () {
    'use strict';

    angular.module('ShoppingListCheckOff', [])
    .controller('ToBuyController', ToBuyController)
    .controller('AlreadyBoughtController', AlreadyBoughtController)
    .service('ShoppingListCheckOffService', ShoppingListCheckOffService)

    ToBuyController.$inject = ['ShoppingListCheckOffService'];
    function ToBuyController(ShoppingListCheckOffService) {
        var tbctrl = this;
        var service = ShoppingListCheckOffService;
        tbctrl.items = service.toBuy;
        
        tbctrl.buy = function(index) {
            service.move(index);
        }
    }

    AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var abctrl = this;
        var service = ShoppingListCheckOffService;
        abctrl.items = service.bought;
    }

    function ShoppingListCheckOffService() {
        var service = this;
        service.bought = [];
        service.toBuy = [{name: 'Cookies', quantity: 10}, {name: 'Phone', quantity: 1},
                    {name: 'Television', quantity: 1}, {name: 'Pies', quantity: 12},
                    {name: 'Donuts', quantity: 13}]


        // Since we're dealing with reference-objects we don't need to
        // splice or push the items in the controller classes.
        service.move = function(index) {
            service.bought.push(service.toBuy[index]);
            service.toBuy.splice(index, 1);
        }
    }
    
})()