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

            $http({
                method: 'GET',
                url: 'https://localhost:8443/admin'
            }).then(function success(response) {
                return true;
            }, function error(response) {
                return false;
            })

        };

        return factory;

    }]);