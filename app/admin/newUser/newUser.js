'use strict';

angular.module('myApp.newuser', ['myApp.userService'])

    .controller('newuserCtrl', ['$scope', 'userService', function (sc, userService) {

        sc.user = {};

        sc.createUser = function () {
            userService.addUser(sc.user).then(function success(response) {
                var elem = angular.element(document.querySelector('#adreg_result'))
                    .removeClass()
                    .empty()
                    .addClass('alert alert-success result_block')
                    .html(response.data);
            }, function error(response) {
                var elem = angular.element(document.querySelector('#adreg_result'))
                    .removeClass()
                    .empty()
                    .addClass('alert alert-danger result_block');
                response.data.userMessage.forEach(m => {
                    elem.append(m + '</br>');
                });
            });
        };

    }]);