'use strict';

angular.module('myApp.newuser', [
    'ngRoute',
    'myApp.userService'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/newuser', {
            templateUrl: 'admin/newUser/newUser.html',
            controller: 'newuserCtrl'
        });
    }])

    .controller('newuserCtrl', ['$scope', 'userService', function (sc, userService) {

        sc.user = {};

        sc.createUser = function () {
            userService.addUser(sc.user).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

    }]);