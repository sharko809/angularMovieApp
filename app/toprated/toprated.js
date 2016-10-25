'use strict';

angular.module('myApp.toprated', [
    'ngRoute',
    'myApp.moviesService'
])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/top', {
            templateUrl: 'toprated/toprated.html',
            controller: 'topCtrl'
        });
    }])

    .controller('topCtrl', ['$scope', 'moviesService', function (sc, service) {

        sc.movies = {};
        sc.noMovies = false;

        service.getTopRated().then(function successCallback(response) {
            if (!response.data[0]) {
                sc.noMovies = true;
            } else {
                sc.movies = response.data;
            }
        }, function errorCallback(response) {

        });

    }]);