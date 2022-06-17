(function () {
'use strict'
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.service("MenuSearchService", MenuSearchService)
.directive('foundItems', foundItemsDirective)

NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService) {
    var nid = this;
    var mss = MenuSearchService

    nid.search = '';
    nid.items = [];

    nid.found = function(items) {
         var promise = mss.getMatchedMenuItems(nid.search)
         promise.then(function (result) {
                // process result and only keep items that match
                var foundItems = [];    
                for(var item in result.data['menu_items'])
                {
                    if (result.data['menu_items'][item].name.toLowerCase().includes(nid.search.toLowerCase()))    
                        foundItems.push(result.data['menu_items'][item]);
                }
                nid.items = foundItems;
                console.log(nid.items)
    })}
    
    nid.onRemove = function(index) {
        nid.items.splice(index, 1)
    }
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
    var mss = this;

    mss.getMatchedMenuItems = function (pattern) {
        return $http({
            method: "GET", 
            url: "https://davids-restaurant.herokuapp.com/menu_items.json"
        });
    }
}

function foundItemsDirective() {
    var ddo = {
        templateUrl: 'foundItems.html',
        // scope: {
        //     onRemove: '&',
        //     foundItems: '<'
        // },
        controller: NarrowItDownController,
        controllerAs: 'nid',
        bindToController: true,
    }

    return ddo;
};
})()