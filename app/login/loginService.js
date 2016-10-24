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
                url: 'http://localhost:8080/movies',
                headers: {
                    'Authorization': 'Basic ' + encode(user)
                }
            })
        };

        factory.setAuthHeader = function (user) {
            $http.defaults.headers.common.Authorization = 'Basic ' + encode(user);
        };

        return factory;

    }]);