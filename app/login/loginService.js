'use strict';

angular.module('myApp.loginService', [])

    .factory('loginService', ['$http', function ($http) {

        var factory = {};

        factory.login = function (user) {

            var encoded = btoa(user.login + ':' + user.password);

            return $http({
                method: 'GET',
                url: 'http://localhost:8080/movies',
                headers: {
                    'Authorization': 'Basic ' + encoded
                }
            })
        };

        return factory;

    }]);