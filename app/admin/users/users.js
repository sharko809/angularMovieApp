'use strict';

angular.module('myApp.users', [
    'ngRoute',
    'myApp.userService'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/users', {
            templateUrl: 'admin/users/users.html',
            controller: 'usersCtrl'
        });
    }])

    .controller('usersCtrl', ['$scope', 'userService', '$location', function (sc, userService, loc) {

        sc.users = {};
        sc.noUsers = false;

        var search = loc.search();
        sc.page = search.page || 0;
        sc.sort = search.sort || 'id';

        userService.getUsers(sc.page, sc.sort).then(function success(response) {
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
            userService.banUser(userId).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

        sc.admin = function (userId) {
            userService.makeAdmin(userId).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

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