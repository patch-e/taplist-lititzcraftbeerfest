/*
ba.data.cookieFactory.js
Provides cookie related services to BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.data').factory('cookieFactory', cookieFactory);

  cookieFactory.$inject = ['$location', '$cookies'];

  function cookieFactory($location, $cookies) {
    var hash = $location.hash();
    if (hash) {
      var hashParts = hash.split('=');
      if (hashParts.length > 1 &&
          hashParts[0] === 'access_token' &&
          hashParts[1]) {
            $cookies.put('untappdToken', hashParts[1]);
            $location.hash('');
      }
    }

    var factory = {
      isAuthenticated: !!(($cookies.get('untappdToken') || '').length)
    };

    return factory;
  }

})();
