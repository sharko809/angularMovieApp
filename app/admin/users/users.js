'use strict';

angular.module('myApp.users', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/users', {
            templateUrl: 'admin/users/users.html',
            controller: 'usersCtrl'
        });
    }])

    .controller('usersCtrl', ['$scope', '$http', '$location', function (sc, http, loc) {

        sc.users = {};
        sc.noUsers = false;

        var search = loc.search();
        sc.page = search.page || 0;
        sc.sort = search.sort || 'id';

        http({
            method: 'GET',
            url: 'http://localhost:8080/admin/users?page=' + sc.page + '&sort=' + sc.sort
        }).then(function success(response) {
            if (!response.data.content[0]) {
                sc.noUsers = true;
            } else {
                sc.users = response.data.content;
                sc.numberOfPages = response.data.totalPages;
                sc.notFirst = !response.data.first;
                sc.notLast = !response.data.last;
            }
        }, function error(response) {
            console.log(response.data);
            alert(response.data.userMessage);
            loc.path('/admin/users').search('page', 0).search('sort', sc.sort);
        });

        sc.ban = function (userId) {
            http({
                method: 'PUT',
                url: 'http://localhost:8080/admin/ban',
                params: {userId: userId},
            }).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

        sc.admin = function (userId) {
            http({
                method: 'PUT',
                url: 'http://localhost:8080/admin/adminize',
                params: {userId: userId}
            }).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

        // sc.ban = function(userId) {
        //     http.put('http://localhost:8080/admin/ban', {}, {params: {userId: userId}});
        // };

        sc.goFirst = function () {
            loc.path('/admin/users').search('page', 0).search('sort', sc.sort);
        };
        sc.prev = function () {
            loc.path('/admin/users').search('page', parseInt(sc.page) - 1).search('sort', sc.sort);
        };
        sc.next = function () {
            loc.path('/admin/users').search('page', parseInt(sc.page) + 1).search('sort', sc.sort);
        };
        sc.goLast = function () {
            loc.path('/admin/users').search('page', sc.numberOfPages - 1).search('sort', sc.sort);
        };
        sc.goToPage = function (pageToGo) {
            loc.path('/admin/users').search('page', pageToGo).search('sort', sc.sort);
        };

    }]);