'use strict';

angular.module('myApp.account', [
    'ngRoute',
    'myApp.accountService'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/account', {
            templateUrl: 'account/account.html',
            controller: 'accountCtrl'
        });
    }])

    .controller('accountCtrl', ['$scope', 'accountService', function (sc, service) {

        sc.user = {};

        service.getAccountData().then(function success(response) {
            sc.user = response.data;
        }, function error(response) {
            console.log(response);
            alert(response.data.userMessage);
        });

        sc.updateAccount = function () {
            service.updateAccountData(sc.user).then(function success(response) {
                alert('Account updated');
            }, function error(response) {
                console.log(response);
                alert(response.data.userMessage);
            });
        }

    }]);