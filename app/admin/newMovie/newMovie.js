'use strict';

angular.module('myApp.newmovie', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/admin/addmovie', {
            templateUrl: 'admin/newMovie/newMovie.html',
            controller: 'newmovieCtrl'
        });
    }])

    .controller('newmovieCtrl', ['$scope','$http', function (sc, http) {

        sc.movie = {};

        sc.addMovie = function () {
            http({
                method: 'POST',
                url: 'http://localhost:8080/admin/addmovie',
                data: sc.movie
            }).then(function success(response) {
                alert(response.data);
            }, function error(response) {
                console.log(response.data);
                alert(response.data.userMessage);
            });
        };

    }]);