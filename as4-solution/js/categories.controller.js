(function (){
    'use strict';
    
    angular.module('MenuApp')
    .controller('categoriesController', categoriesController);
    
    categoriesController.$inject = ['categories', 'MenuDataService'];
    function categoriesController (categories) {
        var catCtrl = this;
        catCtrl.categories = categories;
    }
})();