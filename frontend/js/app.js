/*
BeersApp.js
- Bootstraps the AngularJS BeersApp.
- Configures routes.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp', [
    'ngRoute',
    'beersApp.shared',
    'beersApp.controllers'
  ]).config(configure);

  configure.$inject = ['$locationProvider', '$routeProvider'];

  function configure($locationProvider, $routeProvider) {
    $locationProvider.hashPrefix('!'); 
    $routeProvider
      .when('/', {
        templateUrl: 'partials/table.html',
        controller: 'BeerController',
        controllerAs: 'vm'
      })
      .when('/table', {
        templateUrl: 'partials/table.html',
        controller: 'BeerController',
        controllerAs: 'vm'
      })
      .when('/block', {
        templateUrl: 'partials/block.html',
        controller: 'BeerController',
        controllerAs: 'vm'
      })
      .when('/list', {
        templateUrl: 'partials/list.html',
        controller: 'BeerController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
