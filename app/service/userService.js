'use strict';

angular.module('myApp.userService', [])

    .factory('userService', ['$http', function ($http) {

        var factory = {};

        /**
         * Get page from users list
         * @returns {*} promise from $http service
         */
        factory.getUsers = function (page, sortuser) {
            return $http({
                method: 'GET',
                url: 'http://localhost:8080/admin/users',
                params: {page: page, sort: sort}
            })
        };

        /**
         * Ban user
         * @param userId if of user to ban
         * @returns {*} promise from $http service
         */
        factory.banUser = function (userId) {
            return $http({
                method: 'PUT',
                url: 'http://localhost:8080/admin/ban',
                params: {userId: userId}
            })
        };

        /**
         * Grant user admin rights
         * @param userId id of user to make admin
         * @returns {*} promise from $http service
         */
        factory.makeAdmin = function (userId) {
            return $http({
                method: 'PUT',
                url: 'http://localhost:8080/admin/adminize',
                params: {userId: userId}
            })
        };

        /**
         * Creates a new user
         * @param user user data
         * @returns {*} promise from $http service
         */
        factory.addUser = function (user) {
            return $http({
                method: 'POST',
                url: 'http://localhost:8080/admin/newuser',
                data: user
            })
        };

        return factory;

    }]);