'use strict';

angular.module('myApp.account', [
    'ngRoute',
    'myApp.accountService'
])

    .controller('accountCtrl', ['$scope', 'accountService', function (sc, service) {

        sc.user = {};

        service.getAccountData().then(function success(response) {
            sc.user = response.data;
        }, function error(response) {
            var elem = angular.element(document.querySelector('#upd_result'))
                .removeClass()
                .empty()
                .addClass('alert alert-danger result_block');
            response.data.userMessage.forEach(m => {
                elem.append(m + '</br>');
            });
        });

        sc.updateAccount = function () {
            service.updateAccountData(sc.user).then(function success(response) {
                var elem = angular.element(document.querySelector('#upd_result'))
                    .removeClass()
                    .empty()
                    .addClass('alert alert-success result_block')
                    .html('Account updated');
            }, function error(response) {
                var elem = angular.element(document.querySelector('#upd_result'))
                    .removeClass()
                    .empty()
                    .addClass('alert alert-danger result_block');
                response.data.userMessage.forEach(m => {
                    elem.append(m + '</br>');
                });
            });
        }

    }]);