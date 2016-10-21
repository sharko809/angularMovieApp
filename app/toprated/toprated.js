'use strict';

angular.module('myApp.toprated', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/top', {
            templateUrl: 'toprated/toprated.html',
            controller: 'topCtrl'
        });
    }])

    .controller('topCtrl', ['$scope', '$http', function (sc, http) {

        sc.movies = {};
        sc.noMovies = false;

        http({
            method: 'GET',
            url: 'http://localhost:8080/movies/top'
        }).then(function successCallback(response) {
            if (!response.data[0]) {
                sc.noMovies = true;
            } else {
                sc.movies = response.data;
            }
        }, function errorCallback(response) {

        });

    }]);