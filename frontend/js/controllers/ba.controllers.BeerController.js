/*
ba.controllers.BeerController.js
Controller used for displaying beer data in BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.controllers').controller('BeerController', BeerController);

  BeerController.$inject = ['beerDataFactory', 'loadingFactory', '$modal', 'messages'];

  function BeerController(beerDataFactory, loadingFactory, $modal, messages) {
    // controller as
    var vm = this;

    // list of table headings for table view
    vm.headings = [
      {display: 'Pod',     column: 'pod'},
      {display: 'Name',    column: 'name'},
      {display: 'Brewery', column: 'brewery'},
      {display: 'Style',   column: 'style'},
      {display: 'ABV',     column: 'abv'},
      {display: 'BA',      column: 'ba'}
    ];

    // array that isn't populated after API call finishes
    vm.beersList = [];
    vm.isSearching = false;

    // default to day 1 until day 2
    var today = Date.now();
    var day2 = new Date('9/28/2025');
    vm.day1 = {day: '9/27/2025', label: 'Saturday', badge: '9/27'};
    vm.day2 = {day: '9/28/2025', label: 'Sunday', badge: '9/28'};
    vm.currentDay = (today < day2 ? vm.day1 : vm.day1); // always return day1 when fest only has 1 day

    vm.vip = false;
    vm.guild = false;

    // vm functions
    vm.prependBeerNumber = prependBeerNumber;
    vm.changeSorting = changeSorting;
    vm.sortClass = sortClass;
    vm.search = search;

    init();

    function init() {
      // fetch the beers through the list() service call
      loadingFactory.startLoading();
      beerDataFactory.list()
        .success(function(data) {
          // sort holds initial sorting values for each list
          angular.forEach(data, function(beerList, index) {
            beerList.sort = {
              column: 'pod',
              descending: false
            };
          });
          vm.beersList = data;

          // remove the loading indication and show the main content
          loadingFactory.stopLoading();
        })
        .error(function(error) {
          loadingFactory.stopLoading();
          alert(messages.BA_LIST_ERROR);
        });
    }

    // enhances the numbering of "special" beer lists depending on title of list: cask, bottles, etc.
    function prependBeerNumber(number, title) {
        var prepend = '';

        if (title.indexOf('cask') > -1) {
          // F is for firkin/cask!
          prepend = 'F';
        }
        if (title.indexOf('bottle') > -1) {
          // B is for bottle!
          prepend = 'B';
        }

        return prepend + number;
    }

    // updates "sort" variable onclick of table headings
    function changeSorting(sort, column) {
        if (sort.column == column) {
          sort.descending = !sort.descending;
        } else {
          sort.column = column;
          sort.descending = false;
        }
    }

    // returns the appropriate CSS class for the sort direction
    function sortClass(sort, column) {
      if (column !== sort.column) { return; }

      if (!sort.descending) {
        return 'glyphicon-sort-by-attributes';
      } else {
        return 'glyphicon-sort-by-attributes-alt';
      }
    }

    // calls the search API and opens a modal window upon success
    function search(beer) {
      if (beer.spirit) {
        alert(messages.BA_UNTAPPD_SPIRITS_NOT_SUPPORTED);
        return;
      }

      vm.isSearching = true;

      beerDataFactory.search(beer.brewery, beer.name)
        .success(function(data) {
          var modal = $modal.open({
            templateUrl: 'templates/modalSearchResult.html',
            controller: 'SearchResultController',
            controllerAs: 'vm',
            resolve: {
              beer: function() { return data; }
            }
          });
          modal.result.finally(function() {
            vm.isSearching = false;
          });
        })
        .error(function(error) {
          var errorType;
          if (error.response) {
              errorType = error.response.body.meta.error_type;
          }

          if (error.code === 404) {
            alert(messages.BA_UNTAPPD_SEARCH_NOT_FOUND);
          } else if (errorType && errorType === 'invalid_token') {
            alert(messages.BA_UNTAPPD_TOKEN_EXPIRED);
            window.location.replace('/nodejs/beer/logout');
          } else {
            alert(messages.BA_UNTAPPD_SEARCH_ERROR);
          }

          vm.isSearching = false;
        });
    }
  }

})();
