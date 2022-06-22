(function (){
    'use strict'
    
    angular.module('MenuApp')
    .controller('itemsController', itemsController)
    
    itemsController.$inject = ['items', '$stateParams', 'MenuDataService']
    function itemsController (items, $stateParams) {
        var itmCtrl = this;
        itmCtrl.items = items;
        itmCtrl.categoryName = $stateParams.categoryName;
    }
})();