/*
ba.shared.appConfig.js
Constant config values used by BeersApp.

Copyright (c) 2015

Patrick Crager

*/
(function() { 'use strict';

  angular.module('beersApp.shared').constant('appConfig', {

    BA_UNTAPPD_APP_SCHEME: 'untappd:///?beer=',
    BA_UNTAPPD_URL_SCHEME: 'http://untappd.com/beer/',
    BA_UNTAPPD_CLIENTID: '212A5A8EA9330E5873C9C057FD5941598A54F1CE',
    BA_UNTAPPD_LOGIN_URL: 'https://untappd.com/oauth/authenticate/?client_id={0}&response_type=token&redirect_url={1}',
    BA_UNTAPPD_CALLBACK_URL: 'http://taplist.lititzcraftbeerfest.com',
    BA_LOGOUT_URL: '/nodejs/beer/logout'

  });

})();
