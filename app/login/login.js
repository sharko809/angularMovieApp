'use strict';

angular.module('myApp.login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'login/login.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl', ['$scope', '$http', function (sc, http) {

        var user = {};

        // var loginData = {login: 'asd@gmail.com', password: '123'};

        sc.performLogin = function () {
            http({
                method: 'POST',
                url: 'http://localhost:8080/login',
                data: user
            }).then(function successCallback(response) {
                console.log(response.headers);
                // success logic
            }, function errorCallback(response) {
                console.log(response);
                // error logic
            });
        };

    }]);