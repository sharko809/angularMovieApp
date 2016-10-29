'use strict';

angular.module('cookieService', ['ngCookies'])

    .factory('cookieService', ['$cookieStore', function (storage) {

        var factory = {};

        factory.putTokenCookie = function (cookie) {
            storage.put('user_auth_cookie', cookie);
        };

        factory.getCookie = function (cookieName) {
            return storage.get(cookieName);
        };

        factory.removeCookie = function (cookieName) {
            storage.remove(cookieName);
        };

        return factory;

    }]);