'use strict';

angular.module('myApp.login', [
    'ngRoute',
    'myApp.loginService'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl', ['$scope', 'loginService', function (sc, service) {

        var user = {};

        sc.performLogin = function () {
            service.login(sc.user).then(function successCallback(response) {
                alert('OK');
                service.setAuthHeader(sc.user);
            }, function errorCallback(response) {
                console.log(response);
            });
        };

    }]);