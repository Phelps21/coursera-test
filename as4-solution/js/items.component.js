(function (){
    'use strict'
    
    angular.module('Data')
    .component('items', {
        templateUrl: 'js/templates/items.component.html',
        bindings: {
            items: '<'
        }
    })
    
})();