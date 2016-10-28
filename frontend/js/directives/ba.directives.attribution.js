/*
ba.directives.Attribution.js
Provides formatted attribution text.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.directives').directive('attribution', attribution);

  function attribution() {
    var directive = {
      scope: {
        isLoading: '@'
      },
      restrict: 'EA',
      template: '<small><em>app created by <a href="http://mccrager.com" target="_blank">Patrick Crager</a>, cheers!</em></small>'
    };

    return directive;
  }

})();
