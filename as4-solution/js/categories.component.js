(function (){
    'use strict';
    
    angular.module('Data')
    .component('categories', {
        templateUrl: 'js/templates/categories.component.html',
        bindings: {
            categories: '<'
        }
    });
    
})();