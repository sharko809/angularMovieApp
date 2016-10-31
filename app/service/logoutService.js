'use strict';

angular.module('myApp.logoutService', ['cookieService'])

    .service('logoutService', ['$http', 'cookieService', '$location', '$rootScope',
        function ($http, cookieService, $location, $rootScope) {

            this.logout = function () {
            $http.defaults.headers.common.Authorization = undefined;
            cookieService.removeCookie('user_auth_cookie');
            $rootScope.is_user_logged_in = false;
            $rootScope.is_user_admin = false;
            $location.path("/login");
        }

    }]);