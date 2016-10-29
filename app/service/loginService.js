'use strict';

angular.module('myApp.loginService', [])

    .factory('loginService', ['$http', function ($http) {

        var factory = {};
        var encode = function (user) {
            return btoa(user.login + ':' + user.password);
        };

        factory.login = function (user) {

            return $http({
                method: 'GET',
                url: 'https://localhost:8443/loginPage',
                headers: {
                    'Authorization': 'Basic ' + encode(user)
                }
            })
        };

        factory.setAuthHeader = function (token) {
            $http.defaults.headers.common.Authorization = 'Bearer ' + token;
        };

        factory.isAdmin = function () {

            return $http({
                method: 'GET',
                url: 'https://localhost:8443/admin/check'
            });

        };

        factory.isAuthenticated = function () {
            return $http({
                method: 'GET',
                url: 'https://localhost:8443/account/check'
            });
        };

        return factory;

    }]);