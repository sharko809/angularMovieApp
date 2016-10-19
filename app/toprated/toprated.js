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

        http({
            method: 'GET',
            url: 'http://localhost:8080/movies/top'
        }).then(function successCallback(response) {
            // TODO no movies logic
            sc.movies = response.data;
        }, function errorCallback(response) {

        });

    }]);