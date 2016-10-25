'use strict';

angular.module('myApp.logoutService', [])

    .service('logoutService', ['$http', function ($http) {
        this.logout = function () {
            $http.defaults.headers.common.Authorization = undefined;
        }
    }]);