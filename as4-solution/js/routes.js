(function () {
    'use strict';
    
    angular.module('MenuApp')
    .config(RoutesConfig);
    
    RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
    function RoutesConfig($stateProvider, $urlRouterProvider) {
    
      // Redirect to home page if no other URL matches
      $urlRouterProvider.otherwise('/');
    
      // *** Set up UI states ***
      $stateProvider
    
      // Home page
      .state('home', {
        url: '/',
        templateUrl: 'js/templates/home.template.html'
      })
      
      // Categories view
      .state('categories', {
        url: '/categories',
        templateUrl: 'js/templates/categories.template.html',
        controller: 'categoriesController as catCtrl',
        resolve: {
          categories: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })

      // Items view
      .state('items', {
        url: '/categories/{categoryShortName}',
        templateUrl: 'js/templates/items.template.html',
        controller: 'itemsController as itmCtrl',
        params: {
          categoryShortName: null,
          categoryName: null
        },
        resolve: {
          items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.categoryShortName);
          }]
        }
      })
      
    
    }
    
    })();
    