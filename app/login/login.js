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

        sc.performLogin = function () {
            service.login(sc.user).then(function successCallback(response) {
                service.setAuthHeader(sc.user);
                var elem = angular.element(document.querySelector('#log_result'));
                elem.removeClass()
                    .empty()
                    .addClass('alert alert-success')
                    .html('Login successful');
                setTimeout(function () {
                    elem.fadeOut().empty();
                }, 1500);
                console.log(response); // TODO remove
            }, function errorCallback(response) {
                console.log(response);// TODO remove
                angular.element(document.querySelector('#log_result'))
                    .removeClass()
                    .empty()
                    .addClass('alert alert-danger');
                response.data.userMessage.forEach(m => {
                    elem.append(m + '</br>');
                })
            });
        };

    }]);