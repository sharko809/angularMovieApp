'use strict';

angular.module('registration', ['myApp.userService'])

    .controller('regCtrl', ['$scope', 'userService', function (sc, userService) {

        sc.user = {};

        sc.performRegistration = function () {
            userService.registerUser(sc.user).then(function success(response) {
                var elem = angular.element(document.querySelector('#reg_result'));
                elem.removeClass()
                    .empty()
                    .addClass('alert alert-success')
                    .html(response.data);
            }, function error(response) {
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