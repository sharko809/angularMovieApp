'use strict';

angular.module('myApp.accountService', [])

    .factory('accountService', ['$http', function ($http) {

        var factory = {};

        factory.getAccountData = function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/account'
            })
        };

        factory.updateAccountData = function (user) {
            return $http({
                method: 'PUT',
                url: 'http://localhost:8080/account',
                data: user
            })
        };

        return factory;

    }]);