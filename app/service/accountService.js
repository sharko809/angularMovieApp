'use strict';

angular.module('myApp.accountService', [])

    .factory('accountService', ['$http', function ($http) {

        var factory = {};

        /**
         * Performs GET request to the server, acquiring user account data
         * @returns {*} promise from $http
         */
        factory.getAccountData = function () {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/account'
            })
        };

        /**
         * Performs PUT request to the server, attempting to update user account data
         * @param user - user data (name, login, password from the form)
         * @returns {*} promise from $http
         */
        factory.updateAccountData = function (user) {
            return $http({
                method: 'PUT',
                url: 'http://localhost:8080/account',
                data: user
            })
        };

        return factory;

    }]);