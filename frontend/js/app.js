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

  configure.$inject = ['$routeProvider'];

  function configure($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'partials/table-20220920.html',
        controller: 'BeerController',
        controllerAs: 'vm'
      })
      .when('/table', {
        templateUrl: 'partials/table-20220920.html',
        controller: 'BeerController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
  }

})();
