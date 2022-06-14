(function () {
'use strict';

angular.module("LunchCheck", [])
.controller('LunchCheckController', LunchCheckController);

LunchCheckController.$inject = ['$scope'];
function LunchCheckController($scope) {

    $scope.text = ""
    //$scope.funny = ""
    $scope.check = function () {
        $scope.items = $scope.text.split(',').length;
        if ($scope.text == "")
            $scope.funny = "Please enter data first"

        else if ($scope.items <= 3) 
            $scope.funny = "Enjoy!"

        else
            $scope.funny = "TOO MUCH"

    }
}

})();