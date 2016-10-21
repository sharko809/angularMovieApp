'use strict';

angular.module('myApp.newuser', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/newuser', {
            templateUrl: 'admin/newUser/newUser.html',
            controller: 'newuserCtrl'
        });
    }])

    .controller('newuserCtrl', ['$scope', '$http', function (sc, http) {

        sc.user = {};

        sc.createUser = function () {
            http({
                method: 'POST',
                url: 'http://localhost:8080/admin/newuser',
                data: sc.user
            }).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

    }]);