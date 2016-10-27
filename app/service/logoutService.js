'use strict';

angular.module('myApp.logoutService', ['cookieService'])

    .service('logoutService', ['$http', 'cookieService', function ($http, cookieService) {
        this.logout = function () {
            $http.defaults.headers.common.Authorization = undefined;
            cookieService.removeCookie('user_auth_cookie');
        }
    }]);