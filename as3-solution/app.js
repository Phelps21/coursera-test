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

    nid.search;
    nid.items;
    nid.empty = false;

    // Finds the items from the server and put them in the array
    nid.found = function() {
        
        // If the search is empty then empty page
        if (!nid.search)
        {
            nid.empty = true;
            nid.items = [];
            return;
        }

        var promise = mss.getMatchedMenuItems(nid.search)
        promise.then(function (results) {            

                // Make a new array so that the results reset after each input
                var foundItems = [];    
                var result = results.data['menu_items']

                // In this case item refers to the index of the result array
                for (var item in result)
                {
                    if (result[item].description.toLowerCase().includes(nid.search.toLowerCase()))    
                        foundItems.push(result[item]);
                }

                // If no items were found, say so
                if (foundItems.length == 0)
                    nid.empty = true;

                else
                {
                    nid.empty = false;
                    nid.items = foundItems;
                }
    })}
    
    // Removes an item from the results. Dont mind the index.index
    nid.onRemove = function(index) {
        nid.items.splice(index.index, 1)
    }
}

MenuSearchService.$inject = ['$http']
function MenuSearchService($http) {
    var mss = this;

    mss.getMatchedMenuItems = function () {
        return $http({
            method: "GET", 
            url: "https://davids-restaurant.herokuapp.com/menu_items.json"
        });
    }
}

function foundItemsDirective() {
    var ddo = {
        templateUrl: 'foundItems.html',
        controller: NarrowItDownController,
        controllerAs: 'nid',
        bindToController: true,
    }

    return ddo;
};
})()