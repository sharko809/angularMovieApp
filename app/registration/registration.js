'use strict';

angular.module('registration', [
    'ngRoute',
    'myApp.userService'
])
    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/registration', {
            templateUrl: 'registration/registration.html',
            controller: 'regCtrl'
        })
    }])

    .controller('regCtrl', ['$scope', 'userService', function (sc, userService) {

        sc.user = {};

        sc.performRegistration = function () {
            userService.registerUser(sc.user).then(function success(response) {
                console.log(response);// TODO remove
                var elem = angular.element(document.querySelector('#reg_result'));
                elem.removeClass()
                    .empty()
                    .addClass('alert alert-success')
                    .html(response.data);
            }, function error(response) {
                console.log(response);// TODO remove
                var elem = angular.element(document.querySelector('#reg_result'));
                elem.removeClass()
                    .empty()
                    .addClass('alert alert-danger');
                response.data.userMessage.forEach(m => {
                    elem.append(m + '</br>');
                })
            })
        }

    }]);